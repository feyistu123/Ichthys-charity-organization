const userLogic = require('../logic/userLogic');
const jwt = require('jsonwebtoken');

// --- REGISTER CONTROLLER ---
exports.handleRegister = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const user = await userLogic.registerUser(data);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: user.role === 'admin' ? "Admin account created!" : "Account created successfully!" 
            }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// --- LOGIN CONTROLLER ---
// src/controller/userController.js

exports.handleLogin = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const user = await userLogic.loginUser(data);

            if (!user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Invalid email or password" }));
            }

            // In your Login Controller
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
                user: { fullName: user.fullName, role: user.role } 
            }));

        } catch (err) {
            if (err.message === "UNAPPROVED_VOLUNTEER") {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Wait until the admin accepts you." }));
            }
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Server Error" }));
        }
    });
};