const jwt = require('jsonwebtoken');

// Ensure you use 'exports.' for both functions
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "No token provided" }));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: "Invalid token" }));
        }
        req.user = decoded; // This fixes the 'undefined' error you had earlier
        next();
    });
};

exports.verifyAdmin = (req, res, next) => {
    // We call verifyToken first to get the user data
    this.verifyToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Access Denied: Admins Only" }));
        }
    });
};