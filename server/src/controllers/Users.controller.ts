// -----------------------------------
//          USERS CONTROLLER
// -----------------------------------

import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express'; // Import types for request and response
import { validationResult } from 'express-validator';

// Funzioni del Model
import { 
    index, store
} from '../models/Users.model';


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

async function httpPostUser(req: Request, res: Response, next: NextFunction): Promise<void> {

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
        const user = await store(request);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
}

export {
    httpGetUsers,
    httpPostUser
}