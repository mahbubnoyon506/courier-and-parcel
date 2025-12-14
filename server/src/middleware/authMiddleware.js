const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Middleware to protect routes: verifies token and attaches user ID to request
const protect = async (req, res, next) => {
    let token;

    //Check if token exists in the 'Authorization' header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //Verify token and decode payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Attach user to the request object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
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