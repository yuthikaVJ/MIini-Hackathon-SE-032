const User = require('../models/User');

// @desc    Get user profile (dashboard)
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');
        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                favorites: user.favorites,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            
            // Allow password update
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add provider to favorites
// @route   POST /api/users/favorites/:providerId
// @access  Private
const addFavoriteProvider = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const providerId = req.params.providerId;

        if (user) {
            if (!user.favorites.includes(providerId)) {
                user.favorites.push(providerId);
                await user.save();
                res.status(200).json({ message: 'Provider added to favorites', favorites: user.favorites });
            } else {
                res.status(400).json({ message: 'Provider already in favorites' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove provider from favorites
// @route   DELETE /api/users/favorites/:providerId
// @access  Private
const removeFavoriteProvider = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const providerId = req.params.providerId;

        if (user) {
            user.favorites = user.favorites.filter((id) => id.toString() !== providerId);
            await user.save();
            res.status(200).json({ message: 'Provider removed from favorites', favorites: user.favorites });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    addFavoriteProvider,
    removeFavoriteProvider
};
