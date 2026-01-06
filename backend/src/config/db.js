const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            //connection pooling
            maxPoolSize: 10, //10 for free tier upgrade when mongodb atlas production
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
        });

        console.log("MongoDB connected successfully");

        mongoose.connection.on("error", err => {
            console.error("MongoDB runtime error:", err);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
