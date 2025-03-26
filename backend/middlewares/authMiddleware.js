const jwt = require("jsonwebtoken");

const SECRET_KEY = "e38c27b9301e8b7d0d9e6b957f1d0a6c354b9a8c1a2f3e5f7c8e1b4d3a9f7b2c"; // Replace with a secure key

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) return res.status(401).json({ error: "Access Denied: No Token" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};
