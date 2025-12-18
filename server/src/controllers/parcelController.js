const Parcel = require('../models/Parcel');
const User = require('../models/User');

const bookParcel = async (req, res) => {
    const senderId = req.user._id;

    const {
        pickupAddress,
        deliveryAddress,
        parcelType,
        weight,
        paymentMethod,
    } = req.body;

    // Basic validation
    if (!pickupAddress || !deliveryAddress || !parcelType || !weight || !paymentMethod) {
        return res.status(400).json({ message: 'Please include all required fields for booking' });
    }

    let isPaid = false;
    if (paymentMethod === 'Prepaid') {
        isPaid = true;
    }

    try {
        const parcel = await Parcel.create({
            senderId,
            pickupAddress,
            deliveryAddress,
            parcelType,
            weight,
            paymentMethod,
            isPaid,
            status: 'Pending',
        });

        res.status(201).json({
            message: 'Parcel successfully booked for pickup.',
            parcel
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during booking.', error: error.message });
    }
};

const updateParcel = async (req, res) => {
    const userId = req.user._id;
    const userRole = req.user.role;
    const { parcelId } = req.params;

    const {
        pickupAddress,
        deliveryAddress,
        parcelType,
        weight,
        paymentMethod,
    } = req.body;

    //Basic validation
    if (!pickupAddress || !deliveryAddress || !parcelType || !weight || !paymentMethod) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        //Find the parcel first to check ownership and status
        const parcel = await Parcel.findById(parcelId);

        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found' });
        }

        //Authorization: Only the owner or an Admin can edit
        if (parcel.senderId.toString() !== userId.toString() && userRole !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to edit this parcel' });
        }

        //Prevent editing if already processed
        if (parcel.status !== 'Pending') {
            return res.status(400).json({
                message: `Cannot edit a parcel that is already ${parcel.status}`
            });
        }

        const updateData = {
            pickupAddress,
            deliveryAddress,
            parcelType,
            weight,
            paymentMethod,
            isPaid: paymentMethod === 'Prepaid'
        };
        console.log("Updated data...", updateData);

        const updatedParcel = await Parcel.findByIdAndUpdate(
            parcelId,
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: 'Parcel successfully updated.',
            parcel: updatedParcel
        });

    } catch (error) {
        res.status(500).json({ message: 'Error updating parcel.', error: error.message });
    }
};


const viewBookingHistory = async (req, res) => {
    try {
        const parcels = await Parcel.find({ senderId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(parcels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking history.', error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { parcelId } = req.params;
        if (!parcelId) return res.status(403).json({ message: `No parcel found with this id ${parcelId}` })
        const parcel = await Parcel.findById(parcelId);
        if (parcel.status !== 'Pending') {
            return res.status(500).json({ message: `You delete a parcel which already in ${parcel.status}` })
        }
        const deleteParcel = await Parcel.findByIdAndDelete(parcelId)
        res.status(200).json({ message: "Parcel deleted", deleteParcel });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting parcel.', error: error.message });
    }
};

const viewAssignedParcels = async (req, res) => {
    const agentId = req.user._id;

    try {
        const assignedParcels = await Parcel.find({
            assignedAgentId: agentId,
            status: { $in: ['Picked Up', 'In Transit'] }
        })
            .populate('senderId', 'name phone')
            .sort({ createdAt: 1 });

        res.status(200).json(assignedParcels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assigned parcels.', error: error.message });
    }
};


const updateParcelStatus = async (req, res) => {
    const { parcelId } = req.params;
    const { status, lat, lng } = req.body;
    const agentId = req.user._id;

    // Validate the status change against the allowed
    const validStatuses = ['Picked Up', 'In Transit', 'Delivered', 'Failed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status provided. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        const parcel = await Parcel.findById(parcelId);

        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found.' });
        }

        // Security check: Ensure the agent updating the status is the one assigned to the parcel
        if (parcel.assignedAgentId.toString() !== agentId.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this parcel.' });
        }

        // Update status and current location (if coordinates are provided)
        parcel.status = status;
        if (lat && lng) {
            parcel.currentLocation = { lat, lng };
        }

        // Set delivery date if status is 'Delivered' or 'Failed'
        if (status === 'Delivered' || status === 'Failed') {
            parcel.deliveryDate = new Date();
        }

        await parcel.save();

        res.status(200).json({
            message: `Parcel ${parcelId} status updated to ${status}.`,
            parcel
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during status update.', error: error.message });
    }
};

const getParcelTracking = async (req, res) => {
    const { parcelId } = req.params;

    try {
        const parcel = await Parcel.findById(parcelId)
            .populate('assignedAgentId', 'name phone');

        if (!parcel) {
            return res.status(404).json({ message: 'Tracking number not found.' });
        }

        const trackingData = {
            trackingId: parcel._id,
            status: parcel.status,
            currentLocation: parcel.currentLocation,
            pickupAddress: parcel.pickupAddress,
            deliveryAddress: parcel.deliveryAddress,
            lastUpdate: parcel.updatedAt,
            agent: parcel.assignedAgentId ? {
                name: parcel.assignedAgentId.name,
                phone: parcel.assignedAgentId.phone
            } : null,
            qrCode: parcel.qrCode || null
        };

        res.status(200).json(trackingData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tracking details.', error: error.message });
    }
};

module.exports = {
    bookParcel,
    viewBookingHistory,
    viewAssignedParcels,
    updateParcelStatus,
    getParcelTracking,
    deleteBooking,
    updateParcel
};