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
exports.publishPost = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.content || !data.category || !data.author) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }
        
        await blogLogic.createBlogPost(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Blog published successfully!" }));
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};
exports.publishWithImage = async (req, res) => {
    try {
        // With Multer, text fields are in req.body, file is in req.file
        const blogData = {
            ...req.body, // title, category, author, etc.
            imageUrl: `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`
        };

        const newBlog = await blogLogic.createBlogPost(blogData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Upload success!", blog: newBlog }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};

// --- ADMIN: EDIT BLOG DETAILS ---
exports.editBlog = async (req, res, id) => {
    try {
        const data = req.body;
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