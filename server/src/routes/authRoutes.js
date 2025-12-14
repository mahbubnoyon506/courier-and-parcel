const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Public routes for user authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;