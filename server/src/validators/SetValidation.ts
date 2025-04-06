import { check } from 'express-validator';

const validateSetInput = [
    check('reps')
        .notEmpty().withMessage('Reps number is required'),
    check('kg')
        .notEmpty().withMessage('Kg number is required')
];

export default validateSetInput;