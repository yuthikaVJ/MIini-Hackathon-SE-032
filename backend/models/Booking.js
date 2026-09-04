const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProviderProfile',
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requestedDate: {
        type: String, // e.g., "2024-11-20"
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    assignedTimeSlot: {
        type: String, // Set by provider when accepting
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
