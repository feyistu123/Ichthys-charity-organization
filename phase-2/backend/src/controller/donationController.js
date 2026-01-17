const donationLogic = require('../logic/donationLogic');
const bcrypt = require('bcryptjs');

// --- ADMIN: VIEW ALL DONATIONS ---
exports.fetchAllDonations = async (req, res) => {
    try {
        const donations = await donationLogic.getDonationsList();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(donations));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- PUBLIC: SUBMIT DONATION ---
exports.submitDonation = async (req, res) => {
    try {
        // Body is already parsed in app.js
        const data = req.body;
        
        if (!data.fullName || !data.email || !data.amount) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields: fullName, email, amount' }));
            return;
        }
        
        await donationLogic.processDonation(data);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Thank you for your donation!" }));
    } catch (err) {
        console.error('Donation error:', err);
        const statusCode = err.message.includes("register") ? 404 : 400;
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};