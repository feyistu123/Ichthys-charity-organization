const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String, 
        required: true 
    }, 
    description: { type: String },
    image: { type: String},
    date: { type: String, required: true },
    time: { type: String },
    location: { type: String },
    totalSpots: { type: Number },
    isPast: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);