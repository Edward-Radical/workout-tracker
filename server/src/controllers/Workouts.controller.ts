// -----------------------------------
//          WORKOUTS CONTROLLER
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
} from '../models/Workouts.model';


async function httpGetWorkouts(req: Request, res: Response, next: NextFunction){
    try {
        const requests = await index(req.query);
        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

async function httpGetWorkout(req: Request, res: Response, next: NextFunction){
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
                message: `The Workout with ID: ${req.params.id} doesn't exist`
            });
        }
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

async function httpPostWorkout(req: Request, res: Response, next: NextFunction) {

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
        const workout = await store(request, req.body.exercises_list);
        res.status(201).json({
            success: true,
            message: "Workout created successfully",
            data: workout
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
}

async function httpUpdateWorkout(req: Request, res: Response, next: NextFunction){

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
    const workoutId = parseInt(req.params.id);

    // Use the Workout Model method to fetch a single workout
    if(!show(workoutId)){
        res.status(404).json({
            success: true,
            message: `Workout with ID: ${workoutId} not found`,
            data: null
        });
    }

    try {
        const updatedWorkout = await update(workoutId, request, req.body.exercises_list);
        res.status(200).json({
            success: true,
            message: "Workout upated successfully",
            data: updatedWorkout
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
    return; 
}

async function httpDeleteWorkout(req: Request, res: Response, next: NextFunction){
    const workoutId = parseInt(req.params.id);

    // Use the Workout Model method to fetch a single workout
    if(!show(workoutId)){
        res.status(404).json({
            success: true,
            message: `Workout with ID: ${workoutId} not found`,
            data: null
        });
    }

    try {
        const deletedWorkout = await destroy(workoutId);
        res.status(200).json({
            success: true,
            message: "Workout deleted successfully",
            data: deletedWorkout
        });
    } catch (err) {
        logger.error(err);
        next(err)
    }
};

export {
    httpGetWorkouts,
    httpGetWorkout,
    httpPostWorkout,
    httpUpdateWorkout,
    httpDeleteWorkout
}