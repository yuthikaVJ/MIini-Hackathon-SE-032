const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('ServiceLink API is running...');
});

// Import Routes (To be implemented)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api/providers', providerRoutes);
// app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
