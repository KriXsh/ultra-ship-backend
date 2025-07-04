const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../utils/password.js');
const { createNanoUserId } = require('../utils/helper.js');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        console.log('User found:', user);
        if (!user) {
            return res.status(401).json({ code: 401, message: 'User Not found' });
        }
        const isnotMatch = await comparePassword(password, user.password);
        console.log('Password match:', isnotMatch);
        if (isnotMatch) {
            return res.status(401).json({ code: 401, message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ code: 200, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ code: 500, message: 'Server error' });
    }
};



// Controller to handle admin sign-up
const signupAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        console.log('Existing user:', existingUser);
        if (existingUser) {
            return res.status(400).json({ code: 400, message: 'Username already exists' });
        }
        const hashedPassword = await encryptPassword(password);
        const newAdmin = new User({
            userId: await createNanoUserId(),
            username,
            password: hashedPassword,
            role: 'admin',
        });
        await newAdmin.save();
        const token = jwt.sign(
            { id: newAdmin.userId, role: newAdmin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(201).json({
            code: 201,
            message: 'Admin created successfully',
            token: token,
        });
    } catch (error) {
        console.error('Sign up error:', error);
        return res.status(500).json({ code: 500, message: 'Server error' });
    }
};



module.exports = {
    login,
    signupAdmin
};
