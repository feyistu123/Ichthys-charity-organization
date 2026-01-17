const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
    required: true,
  },
  volunteerName: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["submitted", "reviewed"],
    default: "submitted",
  },
});

module.exports = mongoose.model("Report", ReportSchema);