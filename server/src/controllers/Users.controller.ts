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

async function httpLoginUser(req: Request, res: Response, next: NextFunction): Promise<any>{
    
    const password = req.body.password;

    try {
        // Find user by email
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        if(user){
            const JWT_TOKEN = await login(user, password);
            res.cookie("wt-jwt-session", JWT_TOKEN, {
                    httpOnly: false,                                 // Impedisce l'accesso da JS (XSS protection)
                    secure: process.env.NODE_ENV === 'production',  // Solo via HTTPS (in prod)
                    sameSite: 'lax',                             // Protegge da CSRF cross-site
                    maxAge: 60 * 60 * 1000                          // 1 ora
                })

            res.status(201).json({
                success: true,
                token: JWT_TOKEN,
                data: user
            });
        }
    } catch (error) {
        logger.error(error);
        next(error);
        
    }
}

async function httpSocialLogin(req: Request, res: Response, next: NextFunction): Promise<void>{
    
    const { user } = req;

    try {
        if(user){
            // Return user details
            res.status(200).json({
                success: true,
                message: 'User authenticated successfully',
                user: user,
            });

            //In questo punto si potrebbe eseguire un redirect a pagine di frontend poichè l'autenticazione è andata a buon fine
        }
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

async function httpLogout(req: Request, res: Response, next: NextFunction): Promise<any>{

    try {
        const token = req.cookies["wt-jwt-session"];
        if(token){
            // JWT Logout
            res.clearCookie('wt-jwt-session');
            res.status(200).json({
                success: true,
                message: 'Successfully logged out'
            });
        }else{

            res.clearCookie('wt-social-session', {
                path: '/', // default path
                httpOnly: false,
                secure: false, // deve combaciare con quello usato all’inizio
                sameSite: 'lax', // o 'lax' se usato così nella sessione
            });
            res.clearCookie('wt-social-session.sig', {
                path: '/', // default path
                httpOnly: false,
                secure: false, // deve combaciare con quello usato all’inizio
                sameSite: 'lax', // o 'lax' se usato così nella sessione
            });

            // TO-DO ancora i cookie non vengono puliti

            (req.logout as any)();

            return res.status(200).json({
                success: true,
                message: 'Successfully logged out'
            });
        }


    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred during logout'
        });
    }
}

export {
    httpGetUsers,
    httpLoginUser,
    httpRegisterUser,
    httpSocialLogin,
    httpLogout
}