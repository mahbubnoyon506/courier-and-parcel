const express = require('express');
const { protect, agent } = require('../middleware/authMiddleware'); // Use 'agent' middleware
const {
    viewAssignedParcels,
    updateParcelStatus
} = require('../controllers/parcelController');
const router = express.Router();

// All Agent routes are protected by JWT and restricted to 'agent' or 'admin' roles
router.use(protect, agent);

// 1. View Assigned Parcels
router.route('/parcels/assigned').get(viewAssignedParcels);

// 2. Update Status
router.route('/parcels/:parcelId/status').put(updateParcelStatus);

module.exports = router;