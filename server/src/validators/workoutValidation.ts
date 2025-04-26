import { check } from 'express-validator';

const validateWorkoutInput = [
    check('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 1, max: 100 }).withMessage('Name must be between 2 and 100 characters')
];

export default validateWorkoutInput;