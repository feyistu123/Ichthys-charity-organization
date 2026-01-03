const userController = require('../controller/userController');

const handleUserRoutes = (req, res) => {
    // POST /api/register
    if (req.url === '/api/register' && req.method === 'POST') {
        userController.handleRegister(req, res);
        return true;
    }

    // POST /api/login
    if (req.url === '/api/login' && req.method === 'POST') {
        userController.handleLogin(req, res);
        return true;
    }

    return false;
};

module.exports = handleUserRoutes;