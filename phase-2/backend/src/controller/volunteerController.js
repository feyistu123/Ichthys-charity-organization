const volunteerLogic = require('../logic/volunteerLogic');
const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
// --- PUBLIC: SUBMIT APPLICATION ---
exports.submitApplication = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            await volunteerLogic.registerVolunteerApplication(data); 
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ 
                message: "Application submitted! Please wait for admin approval and your login credentials via email." 
            }));
        } catch (err) {
            const statusCode = err.message.includes("exists") ? 409 : 400; 
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    });
};

exports.handleGetDashboard = async (req, res) => {
    try {
        // 1. Get info from the fresh JWT token
        const { role, email } = req.user;

        // 2. Security Gate: Skip volunteer check if the user is an admin
        if (role !== 'admin') {
            const volunteerRecord = await Volunteer.findOne({ email: email });

            // Safety check: if record is null or not approved, block them
            if (!volunteerRecord || volunteerRecord.status !== 'approved') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ 
                    message: "Access Denied: Your account is not an approved volunteer." 
                }));
            }
        }

        // 3. Admin or Approved Volunteer: Fetch data using your logic file
        // Ensure volunteerLogic is correctly imported at the top of this file
        const approvedData = await volunteerLogic.getDashboardVolunteers();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(approvedData));

    } catch (err) {
        // Check your terminal/console for this specific message to see the exact error
        console.error("DASHBOARD_CRASH_DETAIL:", err.message); 
        
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Server error accessing dashboard" }));
    }
};
// --- 2. HANDLE ADMIN VIEW (Pending Only) ---
exports.handleGetPending = async (req, res) => {
    try {
        // Fetch only pending volunteers from logic
        const pending = await volunteerLogic.getPendingApplications();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pending));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to fetch pending list" }));
    }
};

// --- 3. HANDLE APPROVAL ACTION ---
exports.handleApproveVolunteer = async (req, res) => {
    try {
        // 1. Extract the volunteer ID from the URL (e.g., /api/admin/approve/:id)
        const volunteerId = req.url.split('/').pop();

        // 2. Call the logic to approve and create the User account
        const result = await volunteerLogic.approveAndCreateAccount(volunteerId);

        // 3. Respond with success and the temporary password
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: "Volunteer approved and account created!",
            email: result.email,
            temporaryPassword: result.temporaryPassword, // You will send this to them
            status: "approved"
        }));

    } catch (err) {
        console.error("APPROVAL_ERROR:", err.message);
        
        // Handle cases where volunteer might already have an account or ID is invalid
        const statusCode = err.message === "Volunteer not found" ? 404 : 500;
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};