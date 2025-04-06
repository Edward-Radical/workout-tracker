import { check } from 'express-validator';

const validateExerciseInput = [
    check('name')
        .notEmpty().withMessage('Name is required')
];

export default validateExerciseInput;