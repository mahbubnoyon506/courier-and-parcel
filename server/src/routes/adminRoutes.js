const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    assignAgentToParcel,
    getAllUsers,
    getAllBookings,
    exportBookingReport,
    getDashboardMetrics,
    getAllAgents,
    deleteBooking,
    deleteUser,
    deleteAgent,
    updateUserRole
} = require('../controllers/adminController');
const router = express.Router();

// All Admin routes are protected by JWT and strictly restricted to the 'admin' role
router.use(protect, admin);

//Assign Agent to Parcel 
router.route('/parcels/:parcelId/assign').put(assignAgentToParcel);

//View All Users 
router.route('/users').get(getAllUsers);
router.route('/users/:userId').put(updateUserRole);
router.route('/users/:userId').delete(deleteUser);

//View All Users 
router.route('/agents').get(getAllAgents);
router.route('/agents/:agentId').delete(deleteAgent);

//View All Bookings 
router.route('/bookings').get(getAllBookings);
router.route('/bookings/:parcelId').delete(deleteBooking);

router.route('/metrics').get(getDashboardMetrics);

//Export Reports
router.route('/reports/bookings').get(exportBookingReport);

module.exports = router;