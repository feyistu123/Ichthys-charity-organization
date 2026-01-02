const Donation = require('../models/Donation');
const User = require('../models/User');
const Project = require('../models/Project');
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
                const donations = await Donation.find()
                .populate('projectId', 'title category');

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
                let project = null;
                if (data.projectId && data.projectId.length === 24) {
                    project = await Project.findById(data.projectId);
                }

                // 2. Create the donation linked to the User ID
                const newDonation = new Donation({
                    donorId: existingUser._id,
                    donorName: data.donorName,
                    amount: data.amount,
                    email: data.email,
                    projectId: project ? project._id : null,
                    currency: data.currency,
                    paymentMethod: data.paymentMethod,
                    donationType: data.donationType
                });

                await newDonation.save();

                // 2. Conditional Progress Update
                if (project) {
                    await Project.findByIdAndUpdate(project._id, {
                    $inc: { raisedAmount: data.amount }
                    });
                }

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