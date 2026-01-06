const rateLimit = require("express-rate-limit");

const adminQueueLimiter = rateLimit({
    windowMs: 10 * 1000,
    max: 5,
    keyGenerator: (req) => req.user.id,
    handler: (req, res, next) => {
        console.log(`Admin ${req.user.id} hit rate limit at ${new Date().toISOString()}`);

        return res.status(429).json({
            success: false,
            message: "Please wait before generating more queue numbers."
        });
    }
});

module.exports = adminQueueLimiter;
