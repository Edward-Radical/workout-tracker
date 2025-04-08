// -----------------------------------
//          USERS CONTROLLER
// -----------------------------------

import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express'; // Import types for request and response
import { validationResult } from 'express-validator';

// Funzioni del Model
import { 
    index, register, login
} from '../models/Users.model';

import User from '../models/Users.model';

async function httpGetUsers(req: Request, res: Response, next: NextFunction){
    try {
        const requests = await index();
        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

async function httpRegisterUser(req: Request, res: Response, next: NextFunction): Promise<void>{
    
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.debug("Error during validation in httpPostUser");
        res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
        return;
    }

    const request = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // Register the user
        const newUser = await register(request);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        })
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

async function httpLoginUser(req: Request, res: Response, next: NextFunction): Promise<void>{
    
    const password = req.body.password;

    try {
        // Find user by email
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            res.status(400).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        if(user){
            const JWT_TOKEN = await login(user, password);
            res.status(201).json({
                success: true,
                message: 'User logged successfully',
                data: JWT_TOKEN
            })
        }
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

export {
    httpGetUsers,
    httpLoginUser,
    httpRegisterUser
}