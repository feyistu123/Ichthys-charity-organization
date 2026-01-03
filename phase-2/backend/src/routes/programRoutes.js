const projectController = require('../controller/projectController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleProgramRoutes = (req, res) => {
    // 1. GET ALL PROJECTS (Public)
    if (req.url === '/api/projects' && req.method === 'GET') {
        projectController.getProjects(req, res);
        return true;
    }

    // 2. POST NEW PROJECT (Admin Only)
    if (req.url === '/api/projects/add' && req.method === 'POST') {
        verifyAdmin(req, res, () => projectController.addProject(req, res));
        return true;
    }

    // 3. PATCH STATUS (Admin Only)
    if (req.url.startsWith('/api/projects/status/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => projectController.changeStatus(req, res, id));
        return true;
    }

    // 4. PATCH IMPACT (Admin Only)
    if (req.url.startsWith('/api/projects/impact/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => projectController.editImpact(req, res, id));
        return true;
    }

    return false;
};

module.exports = handleProgramRoutes;