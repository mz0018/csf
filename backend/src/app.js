const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const clientRoutes = require("./routes/clientRoutes");
const superAdminRoutes = require("./routes/SuperAdminRoutes");
const expireQueueTickets = require("./jobs/expireQueueTickets");

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174", "http://192.168.110.16", "http://139.135.180.134"],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(compression({
    threshold: 1024,
    level: 6,
}));

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.get("/", (req, res) => {
    res.send("Backend 201");
});

app.use((req, res, next) => {
    if (!req.cookies.clientId) {
        const { randomUUID } = require('crypto');
        const clientId = randomUUID();

        res.cookie('clientId', clientId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: 'Strict',
        });

        req.cookies.clientId = clientId;
    }
    next();
});

app.use("/client", clientRoutes);

app.use("/it", superAdminRoutes);

expireQueueTickets();   

module.exports = app;
