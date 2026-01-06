const mongoose = require("mongoose");

const queueTicketSchema = new mongoose.Schema(
  {
    officeId: Number,
    queueNumber: String,
    status: {
      type: String,
      enum: ["WAITING", "SERVING", "COMPLETED", "EXPIRED"],
      default: "WAITING",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("QueueTicket", queueTicketSchema);
