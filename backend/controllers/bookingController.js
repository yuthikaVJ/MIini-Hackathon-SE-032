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

// @desc    Get logged in provider's incoming bookings
// @route   GET /api/bookings/provider-requests
// @access  Private (Provider)
const getProviderBookings = async (req, res) => {
    try {
        // First find the provider profile belonging to this user
        const providerProfile = await require('../models/ProviderProfile').findOne({ user: req.user._id });

        if (!providerProfile) {
            return res.status(404).json({ message: 'Provider profile not found' });
        }

        const bookings = await Booking.find({ provider: providerProfile._id })
            .populate('customer', 'name email phone');
            
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status (Accept/Reject and assign time)
// @route   PUT /api/bookings/:id/status
// @access  Private (Provider)
const updateBookingStatus = async (req, res) => {
    try {
        const { status, assignedTimeSlot } = req.body;
        
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Verify that the logged-in user is the provider for this booking
        const providerProfile = await require('../models/ProviderProfile').findOne({ user: req.user._id });
        if (!providerProfile || booking.provider.toString() !== providerProfile._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this booking' });
        }

        if (status) booking.status = status;
        if (assignedTimeSlot && status === 'accepted') {
            booking.assignedTimeSlot = assignedTimeSlot;
        }

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus
};
