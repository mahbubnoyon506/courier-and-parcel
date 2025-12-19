const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware to protect routes: verifies token and attaches user ID to request
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

// Middleware for Role-Based Access Control 
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an Admin' });
    }
};

const agent = (req, res, next) => {
    if (req.user && (req.user.role === 'agent' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a Delivery Agent' });
    }
};

module.exports = { protect, admin, agent };