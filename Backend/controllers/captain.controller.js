const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    
    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain
        });
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await captain.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({
            message: 'Captain logged in successfully',
            token,
            captain
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id).select('-password');
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        res.status(200).json({
            message: 'Captain profile retrieved successfully',
            captain
        });
    } catch (error) {
        next(error);
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            await blacklistTokenModel.create({ token });
        }
        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        next(error);
    }
}