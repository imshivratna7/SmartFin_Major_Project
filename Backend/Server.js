const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./Routes/Auth');
const transactionRoutes = require('./Routes/Transaction');

// Other code

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
