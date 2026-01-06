const Admin = require("../models/it/AdminModel");
const OfficeAdmin = require("../models/officeAdmins/OfficeAdminModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class SuperAdminController {

    constructor() {}

    async registerSuperAdmin(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || typeof name !== "string" || name.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Name is required and must be a non-empty string."
                });
            }

            const emailPattern = /^[^\s@]+@solano\.it\.lgu$/;
            if (!email || typeof email !== "string" || !emailPattern.test(email.toLowerCase())) {
                return res.status(400).json({
                    success: false,
                    message: "Email must be a valid solano.it.lgu address."
                });
            }

            if (!password || typeof password !== "string" || password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password is required and must be at least 6 characters."
                });
            }

            const hashedPassword = await argon2.hash(password);

            const newAdmin = new Admin({
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashedPassword
            });

            const savedAdmin = await newAdmin.save();

            console.log("SuperAdmin saved successfully:", {
                _id: savedAdmin._id,
                email: savedAdmin.email
            });

            res.status(201).json({
                success: true,
                message: "SuperAdmin created successfully",
            });

        } catch (err) {
            console.error("Error saving SuperAdmin:", err);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: err.message
            });
        }
    }

    async verifySuperAdmin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required."
                });
            }

            const admin = await Admin.findOne({ email: email.toLowerCase() });
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials."
                });
            }

            const validPassword = await argon2.verify(admin.password, password);
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials."
                });
            }

            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                process.env.JWT_SECRET || "supersecretkey",
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                data: {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
            });

        } catch (err) {
            console.error("Error trying to login:", err);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: err.message
            });
        }
    }

    async registerUser(req, res) {
        try {
            const {
            firstName,
            middleName,
            lastName,
            position,
            username,
            officeId,
            officeName,
            password,
            role,
            } = req.body;

            if (
            !firstName ||
            !lastName ||
            !position ||
            !username ||
            !officeId ||
            !officeName ||
            !password ||
            !role
            ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
            }

            if (!["hr-admin", "office-admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role value.",
            });
            }

            if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });
            }

            if (await OfficeAdmin.findOne({ username })) {
            return res.status(409).json({
                success: false,
                message: "Username already exists.",
            });
            }

            const hashedPassword = await argon2.hash(password);

            await new OfficeAdmin({
            firstName: firstName.trim(),
            middleName: middleName?.trim() || "",
            lastName: lastName.trim(),
            position: position.trim(),
            username: username.trim(),
            officeId,
            officeName: officeName.trim(),
            password: hashedPassword,
            role,
            }).save();

            res.status(201).json({
            success: true,
            message: "Office Admin registered successfully.",
            });

        } catch (err) {
            console.error("Error registering Office Admin:", err);
            res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
            });
        }
    }
}

module.exports = new SuperAdminController();
