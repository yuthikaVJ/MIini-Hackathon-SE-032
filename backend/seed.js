const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const ProviderProfile = require('./models/ProviderProfile');

dotenv.config();

const seedProviders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Clear existing providers to avoid duplicates
        await ProviderProfile.deleteMany();
        await User.deleteMany({ role: 'provider' });

        // Create provider users
        const providerUser1 = await User.create({
            name: 'Kasun Motor Works',
            email: 'kasun@test.com',
            phone: '0771234567',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'provider'
        });

        const providerUser2 = await User.create({
            name: 'Nuwan Plumbing',
            email: 'nuwan@test.com',
            phone: '0719876543',
            password: 'password123',
            role: 'provider'
        });

        const providerUser3 = await User.create({
            name: 'Saman Carpentry',
            email: 'saman@test.com',
            phone: '0755555555',
            password: 'password123',
            role: 'provider'
        });

        // Create provider profiles
        await ProviderProfile.create([
            {
                user: providerUser1._id,
                serviceCategory: 'Bike Mechanic',
                location: 'Nugegoda',
                experience: '8 years',
                minPrice: 1500,
                maxPrice: 6000,
                description: 'Motorcycle servicing and repairs',
                availableDays: ['2026-09-05', '2026-09-06'],
                rating: 4.8,
                reviewCount: 48
            },
            {
                user: providerUser2._id,
                serviceCategory: 'Plumber',
                location: 'Colombo',
                experience: '12 years',
                minPrice: 2000,
                maxPrice: 5000,
                description: 'Expert in leak repairs and pipe fittings',
                availableDays: ['2026-09-05', '2026-09-07'],
                rating: 4.5,
                reviewCount: 30
            },
            {
                user: providerUser3._id,
                serviceCategory: 'Carpenter',
                location: 'Maharagama',
                experience: '5 years',
                minPrice: 3000,
                maxPrice: 10000,
                description: 'Custom furniture and wood repair',
                availableDays: ['2026-09-06', '2026-09-08'],
                rating: 4.9,
                reviewCount: 15
            }
        ]);

        console.log('Dummy provider data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedProviders();
