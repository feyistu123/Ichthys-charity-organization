require('dotenv').config();
const http = require('http');
const connectDB = require('./config/db');
const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');
const programRoutes = require('./routes/programRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 1. Set CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // 2. Static Files (Uploads)
    if (req.url.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end();
            }
            res.end(data);
        });
        return;
    }

    // 3. Sequential Route Handling
    // If any route handler returns 'true', we 'return' to stop execution.
    if (req.url.startsWith('/api/users') && userRoutes(req, res)) return;
    if (req.url.startsWith('/api/volunteers') && volunteerRoutes(req, res)) return;
    if (req.url.startsWith('/api/donations') && donationRoutes(req, res)) return;
    if (req.url.startsWith('/api/programs') && programRoutes(req, res)) return;
    if (req.url.startsWith('/api/events') && eventRoutes(req, res)) return;
    if (req.url.startsWith('/api/blogs') && blogRoutes(req, res)) return;
    if (req.url.startsWith('/api/contact') && contactRoutes(req, res)) return;

    // 4. Final 404 Handler (Only runs if NO route above matched)
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Route not found" }));
});

// const server = http.createServer((req, res) => {
//     // 1. Set CORS Headers - Vital for React to talk to this backend
//     res.setHeader('Access-Control-Allow-Origin', '*'); 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     /**
//      * Handle Pre-flight (OPTIONS) requests. 
//      * Browsers send this automatically before a POST request.
//      */
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }
//     if (req.url.startsWith('/uploads/')) {
//         const filePath = path.join(__dirname, '..', req.url);
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 res.writeHead(404);
//                 return res.end();
//             }
//             res.end(data);
//         });
//         return;
//     }

//     if (req.url.startsWith('/api/users')) {
//         return userRoutes(req, res); 
//     }

//     // 2. Handle Volunteer Routes (Approve/Dashboard)
//     if (req.url.startsWith('/api/volunteers')) {
//         return volunteerRoutes(req, res);
//     }
//     // If NO routes matched above, this code runs:
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: "Route not found" })); 

//     // 2. Route Handling Logic
//     // This checks if the request matches any of our defined routes
//     const handledUser = userRoutes(req, res);
//     const handledVolunteer = volunteerRoutes(req, res);
//     const handledDonation = donationRoutes(req, res);
//     const handledProgram = programRoutes(req, res);
//     const handledEvent = eventRoutes(req, res);
//     const handledBlog = blogRoutes(req, res);
//     const handledContact = contactRoutes(req, res);

//     /**
//      * 3. 404 Handler
//      * If neither route handler returned 'true', the page doesn't exist.
//      */
//     if (!handledUser && !handledVolunteer && !handledDonation && !handledProgram && !handledEvent && !handledBlog && !handledContact) {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ 
//             message: "Route not found. Try /api/volunteers, /api/donations, /api/projects, /api/events, /api/blogs, /api/contact" 
//         }));
//     }
// });

server.listen(5000, async () => {await connectDB();
  console.log("🚀 Server running on http://localhost:5000")
});
