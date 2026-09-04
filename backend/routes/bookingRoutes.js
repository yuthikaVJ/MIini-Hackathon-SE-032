const express = require('express');
const router = express.Router();
const { 
    createBooking, 
    getMyBookings, 
    getProviderBookings, 
    updateBookingStatus 
} = require('../controllers/bookingController');
const { protect, providerAuth } = require('../middleware/authMiddleware');

// Customer Routes
router.route('/')
    .post(protect, createBooking);

router.route('/my-requests')
    .get(protect, getMyBookings);

// Provider Routes
router.route('/provider-requests')
    .get(protect, providerAuth, getProviderBookings);

router.route('/:id/status')
    .put(protect, providerAuth, updateBookingStatus);

module.exports = router;
