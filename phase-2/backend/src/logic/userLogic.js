const User = require('../models/User');

// Business logic for registering a new user
exports.registerUser = async (data) => {
    const isAdmin = (data.adminSecret === "ICH-ADMIN-2025");
    
    const newUser = new User({
        fullName: data.fullName,
        email: data.email,
        password: data.password, 
        userType: isAdmin ? 'Staff' : data.userType, 
        role: isAdmin ? 'admin' : 'user'
    });

    return await newUser.save();
};

// Logic for finding a user by email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};