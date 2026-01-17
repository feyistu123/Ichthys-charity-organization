const Donation = require('../models/Donation');
const User = require('../models/User');
const Project = require('../models/Project');
const bcrypt = require('bcryptjs');

// Logic to fetch all donations and join with project details
exports.getDonationsList = async () => {
    return await Donation.find().populate('projectId', 'title category').populate('donorId', 'fullName email');
};

exports.processDonation = async (data) => {
    // Find or create user based on email
    let user = await User.findOne({ email: data.email });
    
    // If user doesn't exist, create a donor user
    if (!user) {
        const tempPassword = 'temp_password_' + Date.now();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        
        user = new User({
            fullName: data.fullName || data.donorName,
            email: data.email,
            password: hashedPassword,
            userType: 'Donor',
            role: 'user',
            secretCode: 'DONOR_' + Date.now()
        });
        await user.save();
    }

    let project = null;
    if (data.projectId && data.projectId.length === 24) {
        project = await Project.findById(data.projectId);
    }

    const newDonation = new Donation({
        donorId: user._id,
        donorName: data.fullName || data.donorName,
        amount: data.amount,
        email: data.email,
        projectId: project ? project._id : null,
        currency: data.currency || 'USD',
        paymentMethod: data.paymentMethod || 'Credit Card',
        donationType: data.donationType === 'one-time' ? 'One-Time' : 'monthly'
    });

    await newDonation.save();

    if (project) {
        await Project.findByIdAndUpdate(project._id, {
            $inc: { raisedAmount: data.amount } // Increases the progress bar
        });
    }

    return newDonation;
};