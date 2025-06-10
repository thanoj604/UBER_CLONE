const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname, 
        email, 
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        },
        token
    });


}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        },
        token
    });


}


module.exports.getUserProfile = async (req, res, next) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const user = await userModel.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
        message: 'User profile retrieved successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    });
}


module.exports.logoutUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get token from cookie or Authorization header
    // If token is not provided in either place, return an error

    await blacklistTokenModel.create({token});

    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}