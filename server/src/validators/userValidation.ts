import { check } from 'express-validator';
import User from '../models/Users.model';
import logger from '../utils/logger';  // Import your logger
import { AppError } from '../utils/AppError';

const validateUserInput = [
    check('username')
        .trim()  // Remove any leading/trailing spaces
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 2, max: 100 }).withMessage('Username must be between 2 and 100 characters'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .normalizeEmail()  // Automatically trims and converts to lowercase
        .isEmail().withMessage('Must be a valid email address')
        .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
            logger.error("Email is already in use");
            throw new AppError('Email is already in use', 400);
        }
        return true;
        }),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export default validateUserInput;