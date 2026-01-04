const Donation = require('../models/Donation');
const User = require('../models/User');
const Project = require('../models/Project');

// Logic to fetch all donations and join with project details
exports.getDonationsList = async () => {
    return await Donation.find().populate('projectId', 'title category');
};

// Logic to process a donation and update project raisedAmount
exports.processDonation = async (data) => {
    // 1. Search for user by email
    const existingUser = await User.findOne({ email: data.email });
    if (!existingUser) throw new Error("Donation failed: You must register an account first!");

    // 2. Validate Project ID
    let project = null;
    if (data.projectId && data.projectId.length === 24) {
        project = await Project.findById(data.projectId);
    }

    // 3. Create donation
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

    // 4. Update Project Progress automatically
    if (project) {
        await Project.findByIdAndUpdate(project._id, {
            $inc: { raisedAmount: data.amount } // Increases the progress bar
        });
    }

    return newDonation;
};