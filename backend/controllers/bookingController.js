const Booking = require('../models/Booking');

// @desc    Create new booking request
// @route   POST /api/bookings
// @access  Private (Customer)
const createBooking = async (req, res) => {
    try {
        const { providerId, service, description, requestedDate } = req.body;

        if (!providerId || !service || !description || !requestedDate) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const booking = new Booking({
            customer: req.user._id,
            provider: providerId,
            service,
            description,
            requestedDate,
            status: 'pending'
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in customer's bookings
// @route   GET /api/bookings/my-requests
// @access  Private (Customer)
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user._id })
            .populate({
                path: 'provider',
                populate: { path: 'user', select: 'name email phone' }
            });
            
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings
};
