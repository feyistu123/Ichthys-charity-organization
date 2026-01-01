const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    phoneNumber: { 
        type: String 
    },
    location: { 
        type: String 
    },
    areaOfInterest: { 
        type: String, 
        required: true,
        enum: [
            'Education Tutor',
            'Healthcare', 
            'Event Coordinator', 
            'Mentorship Program', 
            'Administrative Support',
            'Food Bank'
        ]
    },
    availability: { 
        type: String, 
        required: true,
        enum: [
            'Weekday Mornings',
            'Weekday Afternoons', 
            'Weekend Evenings', 
            'Weekends', 
            'Flexible'
        ]
    },
    description: { 
        type: String
    },
    joinedDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);