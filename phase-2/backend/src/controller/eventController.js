const eventLogic = require('../logic/eventLogic');

// --- PUBLIC: VIEW EVENTS ---
exports.getPublicEvents = async (req, res) => {
    try {
        const upcoming = await eventLogic.getEventsByStatus(false);
        const past = await eventLogic.getEventsByStatus(true);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ upcoming, past }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- ADMIN: CREATE EVENT ---
exports.addEvent = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const event = await eventLogic.createEvent(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Event created!", event }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid event data" }));
        }
    });
};

// --- ADMIN: MOVE TO PAST ---
exports.archiveEvent = async (req, res, id) => {
    try {
        const archived = await eventLogic.moveToPast(id);
        if (!archived) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Event not found" }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Event moved to past!" }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

// --- ADMIN: EDIT EVENT DETAILS ---
exports.editEvent = (req, res, id) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const updatedEvent = await eventLogic.updateEventData(id, data);
            
            if (!updatedEvent) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Event not found" }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: "Event updated successfully!", 
                event: updatedEvent 
            }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
};

// --- ADMIN: DELETE EVENT ---
exports.removeEvent = async (req, res, id) => {
    try {
        const deleted = await eventLogic.deleteEventById(id);
        
        if (!deleted) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Event not found" }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Event deleted successfully!" }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};