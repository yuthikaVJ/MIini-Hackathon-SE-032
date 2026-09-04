const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createBooking);

router.route('/my-requests')
    .get(protect, getMyBookings);

module.exports = router;
