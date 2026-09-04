const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceCategory: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    experience: {
        type: String, // e.g., "5 years"
    },
    minPrice: {
        type: Number,
    },
    maxPrice: {
        type: Number,
    },
    description: {
        type: String,
    },
    availableDays: {
        type: [String], // e.g., ["Monday", "Tuesday"] or specific dates
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);
module.exports = ProviderProfile;
