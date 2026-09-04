const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    addFavoriteProvider,
    removeFavoriteProvider
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/me')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/favorites/:providerId')
    .post(protect, addFavoriteProvider)
    .delete(protect, removeFavoriteProvider);

module.exports = router;
