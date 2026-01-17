const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["Donor", "Volunteer", "Staff"],
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "Volunteer"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetCode: { type: String, default: null },
  resetCodeExpires: { type: Date, default: null }
});

module.exports = mongoose.model("User", UserSchema);
