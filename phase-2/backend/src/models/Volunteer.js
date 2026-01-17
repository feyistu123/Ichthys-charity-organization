const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: String,
  },
  areaOfInterest: {
    type: String,
    required: true,
    enum: [
      "Education Tutor",
      "Healthcare",
      "Event Coordinator",
      "Mentorship Program",
      "Administrative Support",
      "Food Bank",
    ],
  },
  availability: {
    type: String,
    required: true,
    enum: [
      "Weekday Mornings",
      "Weekday Afternoons",
      "Weekday Evenings",
      "Weekends",
      "Flexible",
    ],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);
