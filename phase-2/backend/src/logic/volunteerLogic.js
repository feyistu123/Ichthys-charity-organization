const Volunteer = require('../models/Volunteer');
const User = require('../models/User');

// Logic to fetch all volunteers and populate user info
exports.getVolunteersList = async () => {
    return await Volunteer.find();
};

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