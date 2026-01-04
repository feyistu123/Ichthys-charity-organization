const taskLogic = require('../logic/taskAnnouncementLogic');

exports.handleGetMyDashboard = async (req, res) => {
    try {
        const result = await taskLogic.getFilteredTasksForVolunteer(req.user.email);
        
        if (result.error) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: result.error }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result.data));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};
exports.handleGetAdminDashboard = async (req, res) => {
    try {
        const categorizedData = await taskLogic.getAdminCategorizedTasks();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(categorizedData));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to fetch admin tasks" }));
    }
};

exports.handleCreatePost = async (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            // Pass data to logic file
            const newPost = await taskLogic.createNewPost(data, req.user.id);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `${data.type} created successfully` }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data" }));
        }
    });
};

exports.handleUpdatePost = async (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
        try {
            const postId = req.url.split('/').pop();
            const updateData = JSON.parse(body);

            const updatedPost = await taskLogic.updatePost(postId, updateData);

            if (!updatedPost) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "Post not found" }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Post updated", data: updatedPost }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Failed to update: " + err.message }));
        }
    });
};

exports.handleDeletePost = async (req, res) => {
    try {
        const postId = req.url.split('/').pop();
        const deleted = await taskLogic.deletePost(postId);

        if (!deleted) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Post not found" }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Post deleted successfully" }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
    }
};