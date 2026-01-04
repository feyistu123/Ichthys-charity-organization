const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
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
    const { email, password } = data;
    
    // 1. Find user in the Users table
    const user = await User.findOne({ email });
    if (!user) return null;

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // 3. ONLY check Volunteer status if they are NOT an admin
    if (user.role !== 'admin') {
        const volunteerRecord = await Volunteer.findOne({ email: email });
        
        // If no record exists or they aren't approved, block them
        if (!volunteerRecord || volunteerRecord.status !== 'approved') {
            throw new Error("UNAPPROVED_VOLUNTEER");
        }
    }

    // Admins (role: 'admin') bypass the check above and return here
    return user; 
};

// Logic for finding a user by email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};