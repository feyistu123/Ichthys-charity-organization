const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    peopleImpacted: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['Active', 'Completed'], 
        default: 'Active' 
    },
    image: { type: String, required: true } // URL for the project thumbnail
});

module.exports = mongoose.model('Project', ProjectSchema);