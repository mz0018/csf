require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { initSocket } = require("./src/socket");

connectDB();

const PORT = process.env.PORT || 5001;
const http = require("http");
const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB: ", err);
  }

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
