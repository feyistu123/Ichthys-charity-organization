// src/routes/taskAnnouncementRoutes.js
const controller = require('../controller/taskAnnouncementController');
const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');

const handleTaskRoutes = (req, res) => {
    // VOLUNTEER: Get their specific dashboard content
    if (req.url === '/api/volunteers/dashboard/my-updates' && req.method === 'GET') {
        verifyToken(req, res, () => controller.handleGetMyDashboard(req, res));
        return true;
    }

    // ADMIN: Get categorized overview
    if (req.url === '/api/admin/posts/all' && req.method === 'GET') {
        verifyAdmin(req, res, () => controller.handleGetAdminDashboard(req, res));
        return true;
    }

    // ADMIN: Create a post
    if (req.url === '/api/admin/posts' && req.method === 'POST') {
        verifyAdmin(req, res, () => controller.handleCreatePost(req, res));
        return true;
    }

    // ADMIN: Update a post (Task or Announcement)
    if (req.url.startsWith('/api/admin/posts/update/') && req.method === 'PATCH') {
        verifyAdmin(req, res, () => controller.handleUpdatePost(req, res));
        return true;
    }

    // ADMIN: Delete a post
    if (req.url.startsWith('/api/admin/posts/delete/') && req.method === 'DELETE') {
        verifyAdmin(req, res, () => controller.handleDeletePost(req, res));
        return true;
    }
    
    return false;
};

module.exports = handleTaskRoutes;