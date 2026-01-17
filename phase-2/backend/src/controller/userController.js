const userLogic = require('../logic/userLogic');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const emailLogic = require('../logic/emailLogic');
const bcrypt = require('bcrypt');
// --- REGISTER CONTROLLER ---
exports.handleRegister = async (req, res) => {
    console.log('Registration request received');
    try {
        const user = await userLogic.registerUser(req.body);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: user.role === 'admin' ? "Admin account created!" : "Account created successfully!" 
        }));
    } catch (err) {
        console.error('Registration error:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};

// --- LOGIN CONTROLLER ---
// src/controller/userController.js

exports.handleLogin = async (req, res) => {
    try {
        const user = await userLogic.loginUser(req.body);

        if (!user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Invalid email or password" }));
        }

        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role, 
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: "Login successful!", 
            token: token,
            user: { 
                fullName: user.fullName, 
                role: user.role, 
                userType: user.userType,
                email: user.email 
            } 
        }));

    } catch (err) {
        if (err.message === "UNAPPROVED_VOLUNTEER") {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Wait until the admin accepts you." }));
        }
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Server Error" }));
    }
};

// --- STEP 1: FORGOT PASSWORD (Send Code) ---
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "User not found" }));
        }

        // Generate 4-digit code
        const code = Math.floor(1000 + Math.random() * 9000).toString();

        // Update User Document with code and 10-minute expiry
        user.reset_code = code; 
        user.reset_expiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        // Trigger the email logic
        await emailLogic.sendVerificationCode(email, code);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Code sent successfully!" }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- STEP 2: VERIFY CODE ---
exports.verifyResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email, reset_code: code });

        // Validate code and check if it hasn't expired
        if (!user || user.reset_expiry < Date.now()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Invalid or expired code." }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Code verified. You may now reset your password." }));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- STEP 3: RESET PASSWORD ---
exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, reset_code: code });

        if (!user || user.reset_expiry < Date.now()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Unauthorized or code expired." }));
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);

        // Update fields and clear the reset data for security
        user.password = hashed;
        user.reset_code = null;
        user.reset_expiry = null;
        await user.save();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Password has been reset successfully. You can now login." }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};