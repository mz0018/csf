const rateLimit = require('express-rate-limit');

const globalQueueLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,            

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => req.cookies.clientId,

  handler: (req, res) => {
    console.log(`IP ${req.cookies.clientId} hit global rate limit at ${new Date().toISOString()}`);

    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.'
    });
  }
});

module.exports = globalQueueLimiter;
