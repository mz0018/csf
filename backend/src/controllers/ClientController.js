const OfficeAdmin = require("../models/officeAdmins/OfficeAdminModel");
const Offices = require("../models/offices/OfficesSchema");
const QueueTicket = require("../models/queue/QueueTicket");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { notifyNewQueue } = require("../socket");

class ClientController {

    constructor() {}

    async saveFeedback(req, res) {
        try {
            const feedbackData = req.body;

            console.log("Respondent Name:", feedbackData.respondent?.clientName || "N/A");
            console.log("Respondent Phone:", feedbackData.respondent?.clientPhone || "N/A");            
            console.log("Selected Office:", feedbackData.selectedOffice);

            const servicesInfo = feedbackData.services?.selected?.map(s => `[ID: ${s.id}] ${s.name}`).join(", ") || "None";
            console.log("Selected Services:", servicesInfo);

            console.log("Other Service Text:", feedbackData.services?.otherText || "N/A");
            console.log("Demographics:", feedbackData.demographics?.affiliations);
            console.log("Gender:", feedbackData.demographics?.genders);
            console.log("Age Groups:", feedbackData.demographics?.ageGroups);
            console.log("Employment Status:", feedbackData.demographics?.employmentStatus);
            console.log("Address Details:", feedbackData.demographics?.addresses?.details);
            console.log("Date Submitted:", feedbackData.submittedAt);

            console.log("Service Ratings:");
            if (Array.isArray(feedbackData.ratings)) {
                feedbackData.ratings.forEach(rating => {
                    console.log(`  ${rating.name}: ${rating.value}`);
                });
            } else if (typeof feedbackData.ratings === 'object') {
                Object.entries(feedbackData.ratings).forEach(([key, value]) => {
                    console.log(`  ${key}: ${value}`);
                });
            } else {
                console.log("No ratings found or invalid format");
            }

            console.log("Other Suggestions:", feedbackData.otherSuggestions || "No suggestions provided.");

            res.status(200).json({ 
                success: true, 
                message: "Feedback received successfully",
                data: feedbackData 
            });
        } catch (error) {
            console.error("Error saving feedback:", error);
            res.status(500).json({ 
                success: false,
                message: "Server error", 
                error: error.message 
            });
        }
    }

    async verifyClientAdmin(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Username and password are required."
                });
            }

            const officeAdmin = await OfficeAdmin
                .findOne({ username: username.toLowerCase() })
                .select("+password");

            if (!officeAdmin) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });
            }

            const validPassword = await argon2.verify(officeAdmin.password, password);

            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });
            }

            const token = jwt.sign(
                {
                    id: officeAdmin._id,
                    username: officeAdmin.username,
                    role: officeAdmin.role
                },
                process.env.JWT_SECRET || "supersecretkey",
                { expiresIn: "1h" }
            );


            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 60 * 60 * 1000,
            }).status(200).json({
                success: true,
                message: "Login successfull",
                token: token, // Add token to response
                data: {
                    _id: officeAdmin._id,
                    username: officeAdmin.username,
                    firstname: officeAdmin.firstName,
                    lastname: officeAdmin.lastName,
                    middleName: officeAdmin.middleName,
                    role: officeAdmin.role,
                    officeId: officeAdmin.officeId
                },
            });

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const user = await OfficeAdmin.findById(req.user.id).select(
                "_id username firstName lastName middleName role position officeId"
            );

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                success: true,
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                position: user.position,
                officeId: user.officeId
            });
        } catch (err) {
            res.status(500).json({
                message: "Server error",
            })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("access_token", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            }).status(200).json({ success: true, message: "Logged out "});
        } catch (err) {
            console.error("Backend error: ", error);
            res.status(500).json({
                message: "Server error",
            })
        }
    }

    async generateQueueNumber(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Office ID is required" });
            }

            const office = await Offices.findOneAndUpdate(
                { officeId: Number(id) },
                { $inc: { lastQueueNumber: 1 } },
                { new: true }
            );

            if (!office) {
                return res.status(404).json({ message: "Office not found" });
            }

            const yearSuffix = String(new Date().getFullYear()).slice(-2);

            const queueNumber = `${office.officeCode}${yearSuffix}-${String(
                office.lastQueueNumber
            ).padStart(3, "0")}`;

            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            const ticket = await QueueTicket.create({
                officeId: office.officeId,
                queueNumber,
                status: "WAITING",
                expiresAt,
            });

            notifyNewQueue(ticket);

            return res.status(201).json({
                success: true,
                queueNumber: ticket.queueNumber,
                expiresAt: ticket.expiresAt,
                status: ticket.status,
            });

        } catch (err) {
            console.error("Backend error:", err);
            res.status(500).json({ message: "Server error" });
        }
    }

    async getAllQueue(req, res) {
        try {
            const { id } = req.params;

            const admin = await OfficeAdmin.findById(req.user.id);
            if (!admin) return res.status(404).json({ message: "Admin not found" });

            const officeId = admin.officeId;

            const page = Number(req.query.page) || 1;
            const limit = 15;
            const skip = (page - 1) * limit;

            const filter = { officeId };

            const total = await QueueTicket.countDocuments(filter);

            const queue = await QueueTicket.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            res.status(200).json({
                data: queue,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            });

        } catch (err) {
            console.error("Backend error:", err);
            res.status(500).json({ message: "Server error" });
        }
    }

    async verifyQueueNumber(req, res) {
        try {
            const { queueNumber } = req.body;

            if (!queueNumber) {
                return res.status(400).json({
                    success: false,
                    message: "Queue number is required."
                });
            }

            const ticket = await QueueTicket.findOne({ queueNumber });

            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    valid: false,
                    message: "Invalid queue number."
                });
            }

            if (ticket.status === "EXPIRED") {
                return res.status(400).json({
                    success: false,
                    valid: false,
                    message: "Queue number has expired."
                });
            }

            return res.status(200).json({
                success: true,
                valid: true,
                ticket
            });

        } catch (err) {
            console.error("Backend error:", err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = new ClientController();
