const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donorName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        required: true,
        enum: ['ETB', 'USD'],
        default: 'ETB'
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Donation', DonationSchema);