const Donation = require('../models/Donation');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleDonationRoutes = (req, res) => {
    // --- GET ALL DONATIONS (Admin Only) ---
    if (req.url === '/api/donations' && req.method === 'GET') {
        // 1. Get the token from the request header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Token missing! Please login." }));
        }

        // 2. Verify the token using your secret
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log("JWT Error:", err.message);
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Invalid or expired token" }));
            }

            // 3. Check if the user role is 'admin'
            if (decoded.role !== 'admin') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Access Denied: Admins only." }));
            }

            try {
                // Fetch donations and populate donor details
                const donations = await Donation.find().populate('donorId', 'fullName email');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(donations));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: error.message }));
            }
        });
        return true;
    }

    if (req.url === '/api/donations' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);

                // 1. Search for the user by email
                const existingUser = await User.findOne({ email: data.email });

                if (!existingUser) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ 
                        message: "Donation failed: You must register an account first!" 
                    }));
                }

                // 2. Create the donation linked to the User ID
                const newDonation = new Donation({
                    donorId: existingUser._id,
                    donorName: data.donorName,
                    amount: data.amount,
                    email: data.email,
                    paymentMethod: data.paymentMethod
                });

                await newDonation.save();
                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Thank you for your donation!" }));

            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
        });
        return true;
    }
    return false;
};

module.exports = handleDonationRoutes;