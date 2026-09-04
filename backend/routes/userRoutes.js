const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    addFavoriteProvider,
    removeFavoriteProvider,
    getUsers,
    updateUserRole
} = require('../controllers/userController');
const { protect, adminAuth } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminAuth, getUsers);

router.route('/:id/role')
    .put(protect, adminAuth, updateUserRole);

router.route('/me')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/favorites/:providerId')
    .post(protect, addFavoriteProvider)
    .delete(protect, removeFavoriteProvider);

module.exports = router;
