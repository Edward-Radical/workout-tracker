import express from 'express';
import UsersRouter from './Users.router'

const api = express.Router();
api.use('/users', UsersRouter);

export default api;