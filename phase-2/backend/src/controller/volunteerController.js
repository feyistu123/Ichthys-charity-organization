const volunteerLogic = require('../logic/volunteerLogic');

// --- ADMIN: FETCH ALL ---
exports.fetchAllVolunteers = async (req, res) => {
    try {
        const volunteers = await volunteerLogic.getVolunteersList();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(volunteers));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- PUBLIC: SUBMIT APPLICATION ---
exports.submitApplication = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            await volunteerLogic.applyAsVolunteer(data);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Volunteer application submitted!" }));
        } catch (err) {
            const statusCode = err.message.includes("register") ? 404 : 400;
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};