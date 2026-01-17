const projectLogic = require('../logic/projectLogic');

// --- PUBLIC VIEW ---
exports.getProjects = async (req, res) => {
    const projects = await projectLogic.getAllProjects();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projects));
};

// --- ADMIN: CREATE ---
exports.addProject = async (req, res) => {
    try {
        const data = req.body;
        
        // Handle image if uploaded
        if (req.file) {
            data.image = `http://localhost:5000/uploads/${req.file.filename}`;
        }
        
        if (!data.title || !data.description || !data.category) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }
        
        await projectLogic.createProject(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "New program added!" }));
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
    }
};

exports.createProjectWithImage = async (req, res) => {
    try {
        // Construct the full URL for the frontend
        const image = `http://localhost:5000/uploads/${req.file.filename}`;
        
        // req.body contains text fields like title and goalAmount
        const projectData = {
            ...req.body,
            image: image
        };

        const newProject = await projectLogic.saveProject(projectData);
        
        res.writeHead(201, { 'Content-Type': 'application/jso n' });
        res.end(JSON.stringify({ message: "Project created with image!", project: newProject }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
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

// Handles general project updates
exports.updateProject = async (req, res, id) => {
    try {
        const data = req.body;
        const updatedProject = await projectLogic.modifyProject(id, data);
        
        if (!updatedProject) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Project not found" }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: "Project updated successfully!", 
            project: updatedProject 
        }));
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid data format" }));
    }
};
// --- ADMIN: DELETE PROJECT ---
exports.removeProject = async (req, res, id) => {
    try {
        const deleted = await projectLogic.deleteProjectById(id);
        
        if (!deleted) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Project not found" }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Project deleted successfully!" }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};