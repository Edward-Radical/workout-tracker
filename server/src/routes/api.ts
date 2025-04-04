import express from 'express';
import UsersRouter from './Users.router'
import WorkoutsRouter from './Workouts.router';
import ExercisesRouter from './Exercises.router';
import SetsRouter from './Sets.router';

const api = express.Router();

api.use('/users', UsersRouter);
api.use('/workouts', WorkoutsRouter);
api.use('/exercises', ExercisesRouter);
api.use('/sets', SetsRouter);

export default api;