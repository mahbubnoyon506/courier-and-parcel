const Parcel = require('../models/Parcel');
const User = require('../models/User');


const assignAgentToParcel = async (req, res) => {
    const { parcelId } = req.params;
    const { agentId } = req.body;

    try {
        //Verify the Agent exists and has the 'agent' role
        const agent = await User.findById(agentId);
        if (!agent || agent.role !== 'agent') {
            return res.status(404).json({ message: 'Invalid or non-existent Delivery Agent ID.' });
        }

        // Find the parcel
        const parcel = await Parcel.findById(parcelId);
        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found.' });
        }

        //Check if the parcel is already assigned or delivered
        if (parcel.assignedAgentId && parcel.assignedAgentId.toString() === agentId) {
            return res.status(400).json({ message: 'Parcel is already assigned to this agent.' });
        }
        if (parcel.status !== 'Pending') {
            return res.status(400).json({ message: `Cannot re-assign: Parcel status is currently ${parcel.status}.` });
        }


        //Update the parcel with the new agent ID and status
        parcel.assignedAgentId = agentId;
        parcel.status = 'Picked Up'; // Automatically change status to 'Picked Up' upon assignment confirmation

        await parcel.save();

        // In a real application, this is where we would emit a Socket.IO event to the Agent's dashboard
        // and potentially send an Email/SMS notification to the Customer (Bonus feature)[cite: 41].

        res.status(200).json({
            message: `Parcel ${parcelId} successfully assigned to agent ${agent.name}. Status updated to 'Picked Up'.`,
            parcel
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during agent assignment.', error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        // Exclude the password for security
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
};


const getAllBookings = async (req, res) => {
    try {
        // Populate the sender and agent details for easy reporting 
        const parcels = await Parcel.find({})
            .populate('senderId', 'name email phone')
            .populate('assignedAgentId', 'name email');

        res.status(200).json(parcels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all bookings.', error: error.message });
    }
};

const getDashboardMetrics = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        // 1. Total Counts
        const totalParcels = await Parcel.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const totalAgents = await User.countDocuments({ role: 'agent' });

        // 2. Daily Bookings
        const dailyBookings = await Parcel.countDocuments({ createdAt: { $gte: today } });

        // 3. Failed Deliveries 
        const failedDeliveries = await Parcel.countDocuments({ status: 'Failed' });

        // 4. COD Amounts 
        // Calculate total Collect On Delivery (COD) amount that is PENDING collection
        const codAggregation = await Parcel.aggregate([
            {
                $match: {
                    paymentMethod: 'COD',
                    status: { $in: ['Picked Up', 'In Transit'] },
                    isPaid: false
                }
            },
            {
                $group: {
                    _id: null,
                    totalPendingCOD: { $sum: '$cost' }
                }
            }
        ]);
        const totalPendingCOD = codAggregation.length > 0 ? codAggregation[0].totalPendingCOD : 0;

        const deliveredCount = await Parcel.countDocuments({ status: 'Delivered' });
        const successRate = totalParcels > 0 ? ((deliveredCount / totalParcels) * 100).toFixed(2) : 0;

        res.status(200).json({
            totalParcels,
            totalCustomers,
            totalAgents,
            dailyBookings,
            failedDeliveries,
            totalPendingCOD,
            deliveredCount,
            successRate
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving dashboard metrics.', error: error.message });
    }
};


const exportBookingReport = async (req, res) => {
    const allBookings = await Parcel.find({})
        .populate('senderId', 'name email')
        .populate('assignedAgentId', 'name')
        .lean(); // Use .lean() for plain JS objects for faster processing

    // 2. Using a library like 'json2csv' to convert the data into a CSV string.
    // 3. Setting response headers:
    // res.header('Content-Type', 'text/csv');
    // res.attachment('bookings_report.csv');
    // res.send(csvData);

    res.status(200).json({
        message: 'Report generation endpoint successful. Implement CSV/PDF conversion using a library like json2csv or pdfkit.',
        data: allBookings.slice(0, 5)
    });
};

module.exports = {
    assignAgentToParcel,
    getAllUsers,
    getAllBookings,
    getDashboardMetrics,
    exportBookingReport
};