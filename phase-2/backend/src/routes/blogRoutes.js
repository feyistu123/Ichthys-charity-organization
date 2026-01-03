const blogController = require('../controller/blogController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const handleBlogRoutes = (req, res) => {
    // 1. PUBLIC: GET ARTICLES
    if (req.url === '/api/blogs' && req.method === 'GET') {
        blogController.fetchBlogs(req, res);
        return true;
    }

    // 2. ADMIN: POST NEW ARTICLE
    if (req.url === '/api/blogs/add' && req.method === 'POST') {
        verifyAdmin(req, res, () => blogController.publishPost(req, res));
        return true;
    }

    // 3. ADMIN: DELETE ARTICLE
    if (req.url.startsWith('/api/blogs/') && req.method === 'DELETE') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => blogController.removePost(req, res, id));
        return true;
    }

    return false;
};

module.exports = handleBlogRoutes;