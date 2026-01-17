const eventController = require('../controller/eventController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const handleEventRoutes = (req, res) => {
    // 1. PUBLIC: GET EVENTS (View upcoming/past)
    if (req.url === '/api/events' && req.method === 'GET') {
        eventController.getPublicEvents(req, res);
        return true;
    }

    // 2. ADMIN: POST NEW EVENT
    if (req.url === '/api/events/add' && req.method === 'POST') {
        verifyAdmin(req, res, () => {
            upload(req, res, (err) => {
                if (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: err.message }));
                }
                eventController.addEvent(req, res);
            });
        });
        return true;
    }
    // Inside your handleEventRoutes function
    if (req.url === '/api/events/upload' && req.method === 'POST') {
        verifyAdmin(req, res, () => {
            // Use multer to process the file
            upload(req, res, (err) => {
                if (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: err.message }));
                }
                // The file path is now available as req.file.path
                eventController.publishWithImage(req, res);
            });
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
    // 4. ADMIN: EDIT EVENT (General Update)
    if (req.url.startsWith('/api/events/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => {
            eventController.editEvent(req, res, id);
        });
        return true;
    }
    // 5. ADMIN: DELETE EVENT
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