const Volunteer = require('../models/Volunteer');
const User = require('../models/User');

// Logic to process a volunteer application
exports.applyAsVolunteer = async (data) => {
    // Check if the user exists
    const existingUser = await User.findOne({ email: data.email });
    
    if (!existingUser) {
        throw new Error("Submission failed: You must register an account first!");
    }

    const newVolunteer = new Volunteer({
        userId: existingUser._id,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        location: data.location,
        areaOfInterest: data.areaOfInterest,
        availability: data.availability,
        description: data.description
    });

    return await newVolunteer.save();
};

// 1. Get the volunteers waiting to be checked
exports.getPendingApplications = async () => {
    return await Volunteer.find({ status: 'pending' });
};

// 2. Logic to approve a volunteer
exports.approveVolunteer = async (volunteerId, status) => {
    return await Volunteer.findByIdAndUpdate(
        volunteerId, 
        { status: status }, 
        { new: true }
    );
};

// 3. Logic for the Dashboard (only shows approved ones)
exports.getDashboardVolunteers = async () => {
    return await Volunteer.find({ status: 'approved' });
};