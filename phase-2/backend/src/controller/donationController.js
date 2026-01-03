const donationLogic = require('../logic/donationLogic');

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
exports.submitDonation = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            await donationLogic.processDonation(data);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Thank you for your donation!" }));
        } catch (err) {
            // Handle "User not found" or "Database errors"
            const statusCode = err.message.includes("register") ? 404 : 400;
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};