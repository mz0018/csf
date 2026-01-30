const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const ITRS_MONGO_URI = process.env.ITRS_MONGO_URI;

let itrsConn;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    itrsConn = await mongoose.createConnection(ITRS_MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
    console.log("ITRS connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

module.exports.itrsConn = () => itrsConn;
