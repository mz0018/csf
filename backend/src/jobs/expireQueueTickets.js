const cron = require("node-cron");
const QueueTicket = require("../models/queue/QueueTicket");

const expireQueueTickets = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();

            const result = await QueueTicket.updateMany(
                {
                    status: "WAITING",
                    expiresAt: { $lte: now }
                },
                {
                    $set: { status: "EXPIRED" }
                }
            );

            if (result.modifiedCount > 0) {
                console.log(
                    `[CRON] Expired ${result.modifiedCount} queue ticket(s)`
                );
            }
        } catch (err) {
            console.error("[CRON] Error expiring tickets:", err);
        }
    });
};

module.exports = expireQueueTickets;
