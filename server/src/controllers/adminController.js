const Parcel = require('../models/Parcel');
const User = require('../models/User');
const Parser = require('json2csv').Parser;


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


        //Update the parcel with the new agent ID and status
        parcel.assignedAgentId = agentId;
        parcel.status = 'Picked Up'; // Automatically change status to 'Picked Up' upon assignment confirmation

        await parcel.save();

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
        const users = (await User.find({}).select('-password'))
        // .filter((user) => user.role === "customer");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    const userRole = req.user.role;
    const currentUserId = req.user._id;
    const { userId } = req.params;
    const { newRole } = req.body;

    if (userRole !== "admin") {
        return res.status(403).json({ message: "You're not allowed to change other role" })
    }
    if (currentUserId === userId) {
        return res.status(403).json({ message: "None is allowed to change own role" })
    }
    if (!userId) {
        return res.status(403).json({ message: "Not a valid user id" })
    }
    if (!newRole) {
        return res.status(403).json({ message: "No role provided" })
    }
    try {
        const user = await User.findByIdAndUpdate(userId, {
            role: newRole
        }, { new: true });
        if (!user) {
            return res.status(403).json({ message: "Failed to update user" })
        }
        res.status(200).json({ message: "User role updated", user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(403).json({ message: `Not a valid user id.` })
    }

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(403).json({ message: `No user found with this id ${userId}` })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting users.', error: error.message });
    }
};

const getAllAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: 'agent' }).select('-password');
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
};

const deleteAgent = async (req, res) => {
    const { agentId } = req.params;
    if (!agentId) {
        return res.status(403).json({ message: `Not a valid agent id.` })
    }

    try {
        const agent = await User.findByIdAndDelete(agentId);
        if (!agent) {
            return res.status(403).json({ message: `No agent found with this id ${agentId}` })
        }
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting agent.', error: error.message });
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

const deleteBooking = async (req, res) => {
    try {
        const { parcelId } = req.params;
        if (!parcelId) return res.status(404).json({ message: "No parcel id found!" })

        const parcel = await Parcel.findByIdAndDelete(parcelId)
        if (!parcel) {
            return res.status(403).json({ message: `No item found with this id ${parcelId}` })
        }

        res.status(200).json({ message: `Deleted item with id: ${parcelId}`, parcel });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking.', error: error.message });
    }
};

const getDashboardMetrics = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        // Total Counts
        const totalParcels = await Parcel.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const totalAgents = await User.countDocuments({ role: 'agent' });

        // Daily Bookings
        const dailyBookings = await Parcel.countDocuments({ createdAt: { $gte: today } });

        // Failed Deliveries 
        const failedDeliveries = await Parcel.countDocuments({ status: 'Failed' });

        // COD Amounts 
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
    try {
        const allBookings = await Parcel.find({})
            .populate('senderId', 'name email')
            .populate('assignedAgentId', 'name')
            .lean();

        // Define which fields you want in the CSV and their column headers
        const fields = [
            { label: 'Booking ID', value: '_id' },
            { label: 'Sender Name', value: 'senderId.name' },
            { label: 'Sender Email', value: 'senderId.email' },
            { label: 'Pickup Address', value: 'pickupAddress' },
            { label: 'Delivery Address', value: 'deliveryAddress' },
            { label: 'Parcel Type', value: 'parcelType' },
            { label: 'Weight (kg)', value: 'weight' },
            { label: 'Agent Name', value: (row) => row.assignedAgentId?.name || 'Unassigned' },
            { label: 'Status', value: 'status' },
            { label: 'Paid', value: (row) => row.isPaid ? 'Yes' : 'No' },
            { label: 'Date', value: (row) => new Date(row.createdAt).toLocaleDateString() }
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(allBookings);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=bookings_report.csv');
        console.log(csv);

        return res.status(200).send(csv);

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ message: 'Failed to generate report' });
    }
};

module.exports = {
    assignAgentToParcel,
    getAllUsers,
    getAllAgents,
    getAllBookings,
    getDashboardMetrics,
    exportBookingReport,
    deleteBooking,
    deleteUser,
    deleteAgent,
    updateUserRole
};