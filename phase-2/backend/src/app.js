require('dotenv').config();
const http = require('http');
const connectDB = require('./config/db');
const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');
const programRoutes = require('./routes/programRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const server = http.createServer((req, res) => {
    // 1. Set CORS Headers - Vital for React to talk to this backend
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    /**
     * Handle Pre-flight (OPTIONS) requests. 
     * Browsers send this automatically before a POST request.
     */
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. Route Handling Logic
    // This checks if the request matches any of our defined routes
    const handledUser = userRoutes(req, res);
    const handledVolunteer = volunteerRoutes(req, res);
    const handledDonation = donationRoutes(req, res);
    const handledProgram = programRoutes(req, res);
    const handledEvent = eventRoutes(req, res);

    /**
     * 3. 404 Handler
     * If neither route handler returned 'true', the page doesn't exist.
     */
    if (!handledUser && !handledVolunteer && !handledDonation && !handledProgram && !handledEvent) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: "Route not found. Try /api/volunteers, /api/donations, /api/register, /api/projects, or /api/events" 
        }));
    }
});

server.listen(5000, async () => {await connectDB();
  console.log("🚀 Server running on http://localhost:5000")
});
