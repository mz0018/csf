const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    handler: (req, res, next) => {
        console.log(`Too many login attempts from IP: ${req.ip}`);
        return res.status(429).json({
            success: false,
            message: "Too many login attempts. Please try again later."
        });
    }
});

module.exports = loginLimiter;
