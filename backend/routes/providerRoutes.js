const express = require('express');
const router = express.Router();
const { 
    getProviders, 
    getProviderById, 
    createOrUpdateProfile, 
    getMyProviderProfile 
} = require('../controllers/providerController');
const { protect, providerAuth } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProviders);

router.route('/profile')
    .post(protect, providerAuth, createOrUpdateProfile);

router.route('/profile/me')
    .get(protect, providerAuth, getMyProviderProfile);

router.route('/:id')
    .get(getProviderById);

module.exports = router;
