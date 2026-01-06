const mongoose = require("mongoose");

const officeAdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true, default: "" },
  lastName: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  officeId: { type: Number, required: true },
  officeName: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ["hr-admin", "office-admin"], required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("OfficeAdmin", officeAdminSchema);
