import { check } from 'express-validator';

const validateWorkoutInput = [
    check('name')
        .notEmpty().withMessage('Name is required')
];

export default validateWorkoutInput;