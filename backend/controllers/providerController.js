const ProviderProfile = require('../models/ProviderProfile');

// @desc    Get all providers (with filtering)
// @route   GET /api/providers
// @access  Public
const getProviders = async (req, res) => {
    try {
        const { service, location, minPrice, maxPrice, date } = req.query;

        // Build query object
        let query = {};

        if (service) {
            query.serviceCategory = { $regex: service, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (minPrice || maxPrice) {
            query.minPrice = {};
            if (minPrice) query.minPrice.$gte = Number(minPrice);
            // Assuming we check if minPrice of provider is less than maxPrice requested
            if (maxPrice) query.minPrice.$lte = Number(maxPrice);
        }
        if (date) {
            // A simple implementation: check if the date string is in the availableDays array
            query.availableDays = { $in: [date] };
        }

        const providers = await ProviderProfile.find(query).populate('user', 'name email phone');
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get provider by ID
// @route   GET /api/providers/:id
// @access  Public
const getProviderById = async (req, res) => {
    try {
        const provider = await ProviderProfile.findById(req.params.id).populate('user', 'name email phone');

        if (provider) {
            res.json(provider);
        } else {
            res.status(404).json({ message: 'Provider not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create or update provider profile
// @route   POST /api/providers/profile
// @access  Private/Provider
const createOrUpdateProfile = async (req, res) => {
    try {
        const {
            serviceCategory,
            location,
            experience,
            minPrice,
            maxPrice,
            description,
            availableDays
        } = req.body;

        const profileFields = {
            user: req.user._id,
            serviceCategory,
            location,
            experience,
            minPrice,
            maxPrice,
            description,
            availableDays
        };

        // Check if profile exists
        let profile = await ProviderProfile.findOne({ user: req.user._id });

        if (profile) {
            // Update
            profile = await ProviderProfile.findOneAndUpdate(
                { user: req.user._id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new ProviderProfile(profileFields);
        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current provider's profile
// @route   GET /api/providers/profile/me
// @access  Private/Provider
const getMyProviderProfile = async (req, res) => {
    try {
        const profile = await ProviderProfile.findOne({ user: req.user._id }).populate('user', 'name email phone');

        if (!profile) {
            return res.status(404).json({ message: 'There is no profile for this provider' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProviders,
    getProviderById,
    createOrUpdateProfile,
    getMyProviderProfile
};
