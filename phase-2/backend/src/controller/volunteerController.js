const volunteerLogic = require('../logic/volunteerLogic');
const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
// --- PUBLIC: SUBMIT APPLICATION ---
exports.submitApplication = async (req, res) => {
    try {
        console.log('Volunteer signup request received:', req.body);
        await volunteerLogic.registerVolunteerApplication(req.body); 
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ 
            message: "Application submitted! Please wait for admin approval and your login credentials via email." 
        }));
    } catch (err) {
        console.error('Volunteer signup error:', err.message);
        const statusCode = err.message.includes("exists") ? 409 : 400; 
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
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
        // 1. Extract ID from URL (Assumes URL like: /api/admin/approve/65a123...)
        const urlParts = req.url.split('/');
        const volunteerId = urlParts[urlParts.length - 1];

        if (!volunteerId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Volunteer ID is required" }));
        }

        // 2. Run Approval Logic
        const result = await volunteerLogic.approveAndCreateAccount(volunteerId);

        // 3. Success Response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: "Volunteer approved successfully and notification sent.",
            data: {
                email: result.email,
                status: "approved"
            }
        }));

    } catch (err) {
        console.error("CONTROLLER_ERROR:", err.message);

        // 4. Error Handling
        let statusCode = 500;
        if (err.message === "Volunteer not found") statusCode = 404;
        if (err.message.includes("already been approved")) statusCode = 400;

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Send announcement to all approved volunteers
exports.sendAnnouncement = async (req, res) => {
    try {
        const { message } = req.body;
        await volunteerLogic.sendAnnouncementToAll(message);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Announcement sent successfully" }));
    } catch (err) {
        console.error('Announcement error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Send message to specific volunteer
exports.sendMessage = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const volunteerId = urlParts[urlParts.length - 1];
        const { message } = req.body;
        
        await volunteerLogic.sendMessageToVolunteer(volunteerId, message);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Message sent successfully" }));
    } catch (err) {
        console.error('Message error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Get all volunteers for admin
exports.handleGetAllVolunteers = async (req, res) => {
    try {
        const allVolunteers = await volunteerLogic.getAllVolunteers();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allVolunteers));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to fetch volunteers" }));
    }
};

// Assign project to volunteer
exports.assignProject = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const volunteerId = urlParts[urlParts.length - 1];
        const { projectTitle } = req.body;
        
        await volunteerLogic.assignProjectToVolunteer(volunteerId, projectTitle);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Project assigned successfully" }));
    } catch (err) {
        console.error('Assignment error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Get volunteer dashboard data
exports.getVolunteerDashboard = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const userId = urlParts[urlParts.length - 1];
        
        console.log('Dashboard request for user ID:', userId);
        
        const data = await volunteerLogic.getVolunteerTasksAnnouncements(userId);
        
        console.log('Returning dashboard data:', data.length, 'items');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data));
    } catch (err) {
        console.error('Dashboard error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};
// Submit volunteer report
exports.submitReport = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const userId = urlParts[urlParts.length - 1];
        const { report } = req.body;
        
        await volunteerLogic.submitVolunteerReport(userId, report);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Report submitted successfully" }));
    } catch (err) {
        console.error('Report submission error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Get all reports for admin
exports.getAllReports = async (req, res) => {
    try {
        const reports = await volunteerLogic.getAllReports();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(reports));
    } catch (err) {
        console.error('Get reports error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Get all announcements and assignments for admin
exports.getAllAnnouncementsAssignments = async (req, res) => {
    try {
        const data = await volunteerLogic.getAllAnnouncementsAssignments();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data));
    } catch (err) {
        console.error('Get announcements error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Edit announcement or assignment
exports.editAnnouncementAssignment = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const itemId = urlParts[urlParts.length - 1];
        const { message, projectTitle } = req.body;
        
        await volunteerLogic.editAnnouncementAssignment(itemId, message, projectTitle);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Updated successfully" }));
    } catch (err) {
        console.error('Edit error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};

// Delete announcement or assignment
exports.deleteAnnouncementAssignment = async (req, res) => {
    try {
        const urlParts = req.url.split('/');
        const itemId = urlParts[urlParts.length - 1];
        
        await volunteerLogic.deleteAnnouncementAssignment(itemId);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Deleted successfully" }));
    } catch (err) {
        console.error('Delete error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};