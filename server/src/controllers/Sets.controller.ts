// -----------------------------------
//          SETS CONTROLLER
// -----------------------------------

import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express'; // Import types for request and response
import { validationResult } from 'express-validator';

// Funzioni del Model
import { 
    index,
    show,
    store,
    update,
    destroy
} from '../models/Sets.model';


async function httpGetSets(req: Request, res: Response, next: NextFunction){
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

async function httpGetSet(req: Request, res: Response, next: NextFunction){
    try {
        const requests = await show(parseInt(req.params.id));

        if(requests){
            res.status(200).json({
                success: true,
                data: requests
            });
        }else{
            res.status(404).json({
                success: false,
                data: null,
                message: `The Set with ID: ${req.params.id} doesn't exist`
            });
        }
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

async function httpPostSet(req: Request, res: Response, next: NextFunction){
    //Check for validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
        return;
    }

    const request = req.body;
    try {
        const set = await store(request);
        res.status(200).json({
            success: true,
            message: "Set created successfully",
            data: set
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

async function httpUpdateSet(req: Request, res: Response, next: NextFunction){
    const request = req.body;
    const setId = parseInt(req.params.id);

    // Use the Set Model method to fetch a single set
    if(!show(setId)){
        res.status(404).json({
            success: true,
            message: `Set with ID: ${setId} not found`,
            data: null
        });
    }

    try {
        const updatedWorkout = await update(setId, request);
        res.status(200).json({
            success: true,
            message: "Set upated successfully",
            data: updatedWorkout
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
    return; 
}

async function httpDeleteSet(req: Request, res: Response, next: NextFunction){
    const setId = parseInt(req.params.id);

    // Use the Set Model method to fetch a single workout
    if(!show(setId)){
        res.status(404).json({
            success: true,
            message: `Set with ID: ${setId} not found`,
            data: null
        });
    }

    try {
        const deletedSet = await destroy(setId);
        res.status(200).json({
            success: true,
            message: "Set deleted successfully",
            data: deletedSet
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
};


export {
    httpGetSets,
    httpGetSet,
    httpPostSet,
    httpUpdateSet,
    httpDeleteSet
}