const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    bookParcel,
    viewBookingHistory,
    getParcelTracking,
    deleteBooking,
    updateParcel
} = require('../controllers/parcelController');
const router = express.Router();

// Public route for tracking a parcel
router.route('/:parcelId/track').get(getParcelTracking);

// Protected routes
router.route('/book-parcel').post(protect, bookParcel);
router.route('/all-bookings').get(protect, viewBookingHistory);
router.route('/all-bookings/:parcelId').put(protect, updateParcel);
router.route('/all-bookings/:parcelId').delete(protect, deleteBooking);

module.exports = router;