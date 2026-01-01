const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleUserRoutes = (req, res) => {
    // --- REGISTER ROUTE ---
    if (req.url === '/api/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
            
            // Check the Secret Key
            const isAdmin = (data.adminSecret === "ICH-ADMIN-2025");

            const newUser = new User({
                fullName: data.fullName,
                email: data.email,
                password: data.password, 
                // If it's an admin, force type to 'Staff'. Otherwise, use form value.
                userType: isAdmin ? 'Staff' : data.userType, 
                role: isAdmin ? 'admin' : 'user'
            });

                await newUser.save();
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    message: role === 'admin' ? "Admin account created!" : "Account created successfully!" 
                }));
            } catch (err) {
                if (!res.writableEnded) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: err.message }));
                }
            }
        });
        return true;
    }

    // --- LOGIN ROUTE ---
    if (req.url === '/api/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const user = await User.findOne({ email: data.email });

                if (!user || user.password !== data.password) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: "Invalid email or password" }));
                }

                if (data.loginAs === 'Admin' && user.role !== 'admin') {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: "Access Denied: You are not an admin!" }));
                }
                // CREATE THE TOKEN
                // We use the User ID and Role inside the token
                const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET, // Use the variable from .env
    { expiresIn: '1h' }
);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    message: "Login successful!", 
                    token: token,
                    user: { id: user._id, fullName: user.fullName, role: user.role } 
                }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
        });
        return true;
    }

    return false;
};

module.exports = handleUserRoutes;