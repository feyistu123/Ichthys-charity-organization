// src/routes/contactRoutes.js
const contactController = require('../controller/contactController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleContactRoutes = (req, res) => {
    if (req.url === '/api/contact' && req.method === 'POST') {
        contactController.submitContactForm(req, res);
        return true;
    }

    if (req.url === '/api/contact/all' && req.method === 'GET') {
        verifyAdmin(req, res, () => {
            contactController.handleGetFeedbacks(req, res);
        });
        return true;
    }

    return false;
};

module.exports = handleContactRoutes;