const blogController = require('../controller/blogController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

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

// Inside your handleBlogRoutes function
if (req.url === '/api/blogs/upload' && req.method === 'POST') {
    verifyAdmin(req, res, () => {
        // Use multer to process the file
        upload(req, res, (err) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
            
            // The file path is now available as req.file.path
            blogController.publishWithImage(req, res);
        });
    });
    return true;
}

    // --- ADMIN: EDIT BLOG POST ---
    if (req.url.startsWith('/api/blogs/') && req.method === 'PATCH') {
        const id = req.url.split('/').pop();
        verifyAdmin(req, res, () => {
            blogController.editBlog(req, res, id);
        });
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