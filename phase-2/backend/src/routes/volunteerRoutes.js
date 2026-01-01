const jwt = require('jsonwebtoken');
const Volunteer = require('../models/Volunteer');
const User = require('../models/User');

const handleVolunteerRoutes = (req, res) => {
    // --- GET ALL VOLUNTEERS (Admin/Staff Only) ---
    if (req.url === '/api/volunteers' && req.method === 'GET') {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Token missing!" }));
        }

        // Use the EXACT same logic that worked for donations
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log("Volunteer JWT Error:", err.message);
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Invalid or expired token" }));
            }

            // Verify the role
            if (decoded.role !== 'admin') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Access Denied: Admins only." }));
            }

            try {
                const volunteers = await Volunteer.find().populate('userId', 'fullName email');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(volunteers));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: error.message }));
            }
        });
        return true;
    }

    // --- POST VOLUNTEER APPLICATION ---
    if (req.url === '/api/volunteers' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);

            // This line was causing the "User is not defined" crash
            const existingUser = await User.findOne({ email: data.email });

            if (!existingUser) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ 
                    message: "Submission failed: You must register an account first!" 
                }));
            }

            const newVolunteer = new Volunteer({
                userId: existingUser._id, // Links the form to the registered user
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                location: data.location,
                areaOfInterest: data.areaOfInterest,
                availability: data.availability,
                description: data.description
            });

            await newVolunteer.save();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Volunteer application submitted!" }));

        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    });
    return true;
}
    return false; 
};

module.exports = handleVolunteerRoutes;