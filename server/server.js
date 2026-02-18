require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // In production, replace with your Vercel URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Schema for Users and Tasks (Temporary inline for simplicity, or separate files)
// For scalable structure, I will use separate files for routes and models, but to get started,
// I'll create the schema files first.

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Automated Daily Digest (Run daily at 8:30 AM via cron or interval)
// For simplicity, using setInterval (every 24h) or a basic logic. 
// A real app would use node-cron.
const cron = require('node-cron');
// Schedule tasks to be run on the server.
// cron.schedule('30 8 * * *', () => {
//   console.log('Sending daily digest emails...');
//   // Logic to fetch tasks for each user due today and send email
// });

app.get('/', (req, res) => {
    res.send('TaskFlow API is running');
});

app.get('/health', (req, res) => {
    res.json({
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        readyState: mongoose.connection.readyState
    });
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
