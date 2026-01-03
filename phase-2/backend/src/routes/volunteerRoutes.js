const volunteerController = require('../controller/volunteerController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleVolunteerRoutes = (req, res) => {
    // 1. GET ALL VOLUNTEERS (Admin Only)
    if (req.url === '/api/volunteers' && req.method === 'GET') {
        verifyAdmin(req, res, () => {
            volunteerController.fetchAllVolunteers(req, res);
        });
        return true;
    }

    // 2. POST VOLUNTEER APPLICATION (Public)
    if (req.url === '/api/volunteers' && req.method === 'POST') {
        volunteerController.submitApplication(req, res);
        return true;
    }

    return false;
};

module.exports = handleVolunteerRoutes;