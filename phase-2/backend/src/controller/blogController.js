const blogLogic = require('../logic/blogLogic');

// --- PUBLIC: VIEW ALL ARTICLES ---
exports.fetchBlogs = async (req, res) => {
    try {
        const blogs = await blogLogic.getAllBlogs();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(blogs));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};

// --- ADMIN: PUBLISH POST ---
exports.publishPost = (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            await blogLogic.createBlogPost(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Blog published successfully!" }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// --- ADMIN: EDIT BLOG DETAILS ---
exports.editBlog = (req, res, id) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const updatedBlog = await blogLogic.updateBlogData(id, data);
            
            if (!updatedBlog) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Blog post not found" }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                message: "Blog updated successfully!", 
                blog: updatedBlog 
            }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
};

// --- ADMIN: DELETE POST ---
exports.removePost = async (req, res, id) => {
    try {
        const deleted = await blogLogic.deleteBlogById(id);
        if (!deleted) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Post not found" }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Blog post deleted" }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};