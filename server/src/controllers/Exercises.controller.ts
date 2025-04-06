// -----------------------------------
//          EXERCISES CONTROLLER
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
} from '../models/Exercises.model';


async function httpGetExercises(req: Request, res: Response, next: NextFunction){
    try {
        const requests = await index();
        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        logger.error(error);
        next(error)
    }
};

async function httpGetExercise(req: Request, res: Response, next: NextFunction){
    try {
        const id = parseInt(req.params.id);
        const request = await show(id);

        if(request){
            res.status(200).json({
                success: true,
                data: request
            });
        }else{
            res.status(404).json({
                success: false,
                data: null,
                message: `The Exercise with ID: ${req.params.id} doesn't exist`
            });
        }
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

async function httpPostExercise(req: Request, res: Response, next: NextFunction){
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    const request = req.body;
    try {
        const exercise = await store(request);
        res.status(201).json({
            success: true,
            message: 'Exercise created successfully',
            data: exercise
        })
    } catch (error) {
        logger.error(error);
        next(error)
    }
}

async function httpPatchExercise(req: Request, res: Response, next: NextFunction){
    
    const request = req.body;
    const exerciseId = parseInt(req.params.id);

    if(!show(exerciseId)){
        res.status(404).json({
            success: false, 
            message: `Exercise with ID: ${exerciseId} not found`,
            data: null
        })
    }

    try {
        const result = await update(exerciseId, request);
        res.status(200).json({
            success: true,
            message: "Exercise updated successfully",
            data: result
        })
    } catch (error) {
        logger.error(error);
        next(error)
    }
    return;
}

async function httpDeleteExercise(req: Request, res: Response, next: NextFunction){
    const exerciseId = parseInt(req.params.id);
    if(!show(exerciseId)){
        res.status(404).json({
            success: true,
            message: `Exercise with ID: ${exerciseId} not found`,
            data: null
        })
    }

    try {
        const deletedExercise = await destroy(exerciseId);
        res.status(200).json({
            success: true,
            message: "Exercise deleted successfully",
            data: deletedExercise
        })
    } catch (error) {
        logger.error(error);
        next(error)
    }
}


export {
    httpGetExercises,
    httpGetExercise,
    httpPostExercise,
    httpPatchExercise,
    httpDeleteExercise
}