// src/models/TaskAnnouncement.js
const mongoose = require('mongoose');

const taskAnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['Task', 'Announcement'], 
        required: true 
    },
    areaOfInterest: { 
        type: String, 
        required: true,
        enum: ['Education Tutor', 'Health Support', 'Environment', 'Social Work', 'Other'] 
    }, // Matches registration categories
    deadline: { type: Date },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaskAnnouncement', taskAnnouncementSchema);