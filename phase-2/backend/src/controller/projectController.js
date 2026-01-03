const projectLogic = require('../logic/projectLogic');

// --- PUBLIC VIEW ---
exports.getProjects = async (req, res) => {
    const projects = await projectLogic.getAllProjects();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projects));
};

// --- ADMIN: CREATE ---
exports.addProject = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            await projectLogic.createProject(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "New program added!" }));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
    });
};

// --- ADMIN: TOGGLE STATUS ---
exports.changeStatus = async (req, res, id) => {
    const project = await projectLogic.toggleStatus(id);
    if (!project) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Project not found" }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Project is now ${project.status}` }));
};

// --- ADMIN: UPDATE IMPACT ---
exports.editImpact = (req, res, id) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const updated = await projectLogic.updateImpact(id, data.peopleImpacted);
            if (!updated) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Project not found" }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Impact updated successfully!", updatedCount: updated.peopleImpacted }));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
};