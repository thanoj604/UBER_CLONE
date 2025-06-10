const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname')
        .isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters long'),
    body('fullname.lastname')
        .optional()
        .isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters long'),
    body('email')
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color')
        .isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate')
        .isLength({ min: 3 }).withMessage('Plate number must be at least 3 character long'),
    body('vehicle.capacity')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
        .isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of: car, bike, auto')
],

captainController.registerCaptain

);


router.post('/login', [
    body('email')
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;