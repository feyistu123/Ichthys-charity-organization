const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Logic to process a volunteer application
exports.registerVolunteerApplication = async (data) => {
    const newVolunteer = new Volunteer({
        ...data,
        status: "pending",
        joinedDate: new Date()
    });
    return await newVolunteer.save();
};
// Logic for Admin Approval
exports.approveAndCreateAccount = async (volunteerId) => {
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) throw new Error("Volunteer not found");

    const temporaryPassword = "Vol" + Math.floor(1000 + Math.random() * 9000);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // FIX: Match the required fields and valid enum values
    const newUser = new User({
        email: volunteer.email,
        password: hashedPassword,
        fullName: volunteer.fullName, 
        userType: "Volunteer",        
        role: "user"             
    });

    await newUser.save(); 

    volunteer.status = "approved";
    await volunteer.save();

    return { email: volunteer.email, temporaryPassword };
};

// Get the volunteers waiting to be checked
exports.getPendingApplications = async () => {
    return await Volunteer.find({ status: 'pending' });
};

// Logic to approve a volunteer
exports.approveVolunteer = async (volunteerId, status) => {
    return await Volunteer.findByIdAndUpdate(
        volunteerId, 
        { status: status },
        { new: true }
    );
};

// Logic for the Dashboard (only shows approved ones)
exports.getDashboardVolunteers = async () => {
    return await Volunteer.find({ status: 'approved' });
};