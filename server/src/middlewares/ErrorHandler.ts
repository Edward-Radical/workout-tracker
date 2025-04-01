// ErrorHandler.js
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler;