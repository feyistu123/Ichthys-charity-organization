const eventController = require('../controller/eventController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleEventRoutes = (req, res) => {
    // 1. PUBLIC: GET EVENTS (View upcoming/past)
    if (req.url === '/api/events' && req.method === 'GET') {
        eventController.getPublicEvents(req, res);
        return true;
    }

    // 2. ADMIN: POST NEW EVENT
    if (req.url === '/api/events/add' && req.method === 'POST') {
        verifyAdmin(req, res, () => {
            eventController.addEvent(req, res);
        });
        return true;
    }

    // 3. ADMIN: PATCH MOVE TO PAST
    if (req.url.startsWith('/api/events/archive/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => {
            eventController.archiveEvent(req, res, id);
        });
        return true;
    }

    // 4. ADMIN: DELETE EVENT
    if (req.url.startsWith('/api/events/') && req.method === 'DELETE') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => {
            eventController.removeEvent(req, res, id);
        });
        return true;
    }

    return false;
};

module.exports = handleEventRoutes;