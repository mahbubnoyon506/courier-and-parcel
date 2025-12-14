const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    bookParcel,
    viewBookingHistory,
    getParcelTracking
} = require('../controllers/parcelController');
const router = express.Router();

// Public route for tracking a parcel
router.route('/:parcelId/track').get(getParcelTracking);

// Protected routes
router.route('/book-parcel').post(protect, bookParcel);
router.route('/history').get(protect, viewBookingHistory);

module.exports = router;