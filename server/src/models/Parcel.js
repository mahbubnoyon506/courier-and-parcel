const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedAgentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    pickupAddress: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    parcelType: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Prepaid'],
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
        default: 'Pending'
    },
    currentLocation: {
        lat: Number,
        lng: Number
    },
    deliveryDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Parcel', parcelSchema);