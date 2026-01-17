const Donation = require('../models/Donation');
const User = require('../models/User');
const Project = require('../models/Project');

// Logic to fetch all donations and join with project details
exports.getDonationsList = async () => {
    return await Donation.find().populate('projectId', 'title category');
};

exports.processDonation = async (data) => {
    let project = null;
    if (data.projectId && data.projectId.length === 24) {
        project = await Project.findById(data.projectId);
    }

    const newDonation = new Donation({
        donorId: existingUser._id,
        donorName: data.donorName,
        amount: data.amount,
        email: data.email,
        projectId: project ? project._id : null,
        currency: data.currency,
        paymentMethod: data.paymentMethod,
        donationType: data.donationType
    });

    await newDonation.save();

    if (project) {
        await Project.findByIdAndUpdate(project._id, {
            $inc: { raisedAmount: data.amount } // Increases the progress bar
        });
    }

    return newDonation;
};