const mongoose = require("mongoose");

const TaskAnnouncementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["announcement", "task"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
    default: null, // null for announcements to all
  },
  volunteerName: {
    type: String,
    default: null, // volunteer name for easier display
  },
  projectTitle: {
    type: String,
    default: null, // only for task assignments
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TaskAnnouncement", TaskAnnouncementSchema);
