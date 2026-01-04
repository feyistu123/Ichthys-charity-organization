const donationController = require('../controller/donationController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleDonationRoutes = (req, res) => {
    // 1. GET ALL DONATIONS (Admin Only)
    if (req.url === '/api/donations' && req.method === 'GET') {
        verifyAdmin(req, res, () => {
            donationController.fetchAllDonations(req, res);
        });
        return true;
    }

    // 2. SUBMIT DONATION (Public)
    if (req.url === '/api/donations' && req.method === 'POST') {
        donationController.submitDonation(req, res);
        return true;
    }

    return false;
};

module.exports = handleDonationRoutes;