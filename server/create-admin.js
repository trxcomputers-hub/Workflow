require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');

        const email = 'admin@company.com'; // Change this if you want
        const password = 'admin123'; // Change this to a strong password

        let user = await User.findOne({ email });
        if (user) {
            console.log('Admin already exists!');
            process.exit();
        }

        user = new User({
            name: 'Main Admin',
            email,
            password,
            role: 'Admin'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Admin created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

createAdmin();
