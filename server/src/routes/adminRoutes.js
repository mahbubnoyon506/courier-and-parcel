const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    assignAgentToParcel,
    getAllUsers,
    getAllBookings,
    exportBookingReport,
    getDashboardMetrics
} = require('../controllers/adminController');
const router = express.Router();

// All Admin routes are protected by JWT and strictly restricted to the 'admin' role
router.use(protect, admin);

//Assign Agent to Parcel 
router.route('/parcels/:parcelId/assign').put(assignAgentToParcel);

//View All Users 
router.route('/users').get(getAllUsers);

//View All Bookings 
router.route('/bookings').get(getAllBookings);

router.route('/metrics').get(getDashboardMetrics);

//Export Reports
router.route('/reports/bookings').get(exportBookingReport);

module.exports = router;