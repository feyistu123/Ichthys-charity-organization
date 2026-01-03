const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Business logic for registering a new user
exports.registerUser = async (data) => {
    // 1. Compare the secret from the user with the one in .env
    const isAdmin = (data.adminSecret === process.env.ADMIN_REGISTRATION_SECRET);
    
    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = new User({
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        userType: isAdmin ? 'Staff' : data.userType, 
        role: isAdmin ? 'admin' : 'user'
    });

    return await newUser.save();
};

// userLogic.js
exports.loginUser = async (data) => {
    console.log("Login Attempt for:", data.email);
    const user = await User.findOne({ email: data.email });
    
    if (!user) {
        console.log("User not found in DB");
        return null;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    console.log("Password Match Result:", isMatch); // Should be true

    if (!isMatch) return null;
    return user;
};

// Logic for finding a user by email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};