import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    
    // Case 1: Social Login - Check session through Passport 
    if(req.isAuthenticated() && req.user){
        return next();
    }

    // Case 2: If user is not authenticated via Passport, check for JWT token
    const token = req.cookies["wt-jwt-session"];  
    if (token) {
        try {
            // Verify the JWT token using the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            // Optionally, you can attach the decoded user info to the request object
            req.user = decoded;

            // Continue to the next middleware or route handler
            return next();  
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired JWT token'
            });
        }
    }
    
    // If neither Passport session nor JWT token is available, return error
    res.status(401).json({
        success: false,
        message: "Login required"
    });
}

export default checkLoggedIn;