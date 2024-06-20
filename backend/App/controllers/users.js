const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const usersCltr = {};

usersCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { body } = req;
        const user = new User(body);
        const salt = await bcryptjs.genSalt();
        const encryptedPassword = await bcryptjs.hash(user.password, salt);
        user.password = encryptedPassword;
        await user.save(); // Save user to database
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
};

usersCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { body } = req;
    try {
        const user = await User.findOne({ username: body.username });
        if (!user) {
            return res.status(401).json({ errors: 'Invalid username/password' });
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password); // Corrected username.password to user.password
        if (!checkPassword) {
            return res.status(401).json({ errors: 'Invalid username/password' });
        }
        const tokenData = {
            id: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
};

module.exports = usersCltr;
