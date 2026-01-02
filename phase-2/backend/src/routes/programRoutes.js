const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

const handleProgramRoutes = (req, res) => {
    // --- POST NEW PROJECT (Admin Only) ---
    if (req.url === '/api/projects' && req.method === 'POST') {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || decoded.role !== 'admin') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Admin access denied!" }));
            }

            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const newProject = new Project(data);
                    await newProject.save();
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: "New program added!" }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: e.message }));
                }
            });
        });
        return true;
    }

    // --- PATCH STATUS (Admin Only) ---
    if (req.url.startsWith('/api/projects/status/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || decoded.role !== 'admin') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Unauthorized" }));
            }

            const project = await Project.findById(id);
            if (!project) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Project not found" }));
            }

            // Toggle logic: Active -> Completed
            project.status = project.status === 'Active' ? 'Completed' : 'Active';
            await project.save();
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Project is now ${project.status}` }));
        });
        return true;
    }
    return false;
};