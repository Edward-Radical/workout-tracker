import express from 'express';
import validateWorkoutInput from '../validators/workoutValidation';

const WorkoutsRouter = express.Router();

// Metodi dei Controller
import {
    httpGetWorkouts,
    httpGetWorkout,
    httpPostWorkout,
    httpUpdateWorkout,
    httpDeleteWorkout
} from '../controllers/Workouts.controller';

/**
    * @swagger
    * tags:
    *   name: Workouts
    *   description: The Workouts API allows you to manage user's workouts in the system. It provides endpoints for creating, retrieving, updating, and deleting workouts information.
*/

/**
 * @swagger
 * /workouts:
 *   get:
 *     tags: [Workouts]
 *     summary: Retrieves a list of all workouts in the system
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Error querying the database TABLE Workouts
*/
WorkoutsRouter.get('/', httpGetWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     tags: [Workouts]
 *     summary: Retrieves a single workout
 *     description: "Fetches a specific workout by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the workout to retrieve"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the workout"
 *       500:
 *         description: "Error querying the database TABLE Workouts"
 */
WorkoutsRouter.get('/:id', httpGetWorkout);

/**
 * @swagger
 * /workouts:
 *   post:
 *     tags: [Workouts]
 *     summary: Create a new workout
 *     description: "Creates a new workout in the database."
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         description: "The workout details to be created"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               description: "Name of the workout"
 *             description:
 *               type: "string"
 *               description: "Description of the workout"
 *             schedule:
 *               type: "timestamp"
 *               description: "The date on which to schedule the workout"
 *             rep_days:
 *               type: "json"
 *               description: "The list of days you'd like to schedule the workout"
 *             notes:
 *               type: "string"
 *               description: "Notes about the workout"
 *             user_id:
 *               type: "integer"
 *               description: "The User related to this specific workout"
 *          
 *     responses:
 *       201:
 *         description: "Successfully created the workout"
 *       400:
 *         description: "Error during workout input validation"
 *       500:
 *         description: "Error during the creation of the workout"
 */
WorkoutsRouter.post('/', validateWorkoutInput, httpPostWorkout);

/**
 * @swagger
 * /workouts:
 *   patch:
 *     tags: [Workouts]
 *     summary: Update an existing workout
 *     description: "Update an existing workout in the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the workout to retrieve"
 *         required: true
 *         type: "string"
 *       - name: "body"
 *         in: "body"
 *         description: "The workout details to be created"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               description: "Name of the workout"
 *             description:
 *               type: "string"
 *               description: "Description of the workout"
 *             schedule:
 *               type: "timestamp"
 *               description: "The date on which to schedule the workout"
 *             rep_days:
 *               type: "json"
 *               description: "The list of days you'd like to schedule the workout"
 *             notes:
 *               type: "string"
 *               description: "Notes about the workout"
 *             user_id:
 *               type: "integer"
 *               description: "The User related to this specific workout"
 *          
 *     responses:
 *       201:
 *         description: "Successfully updated the workout"
 *       400:
 *         description: "Error during workout input validation"
 *       500:
 *         description: "Error during the update of the workout"
 */
WorkoutsRouter.patch('/:id', validateWorkoutInput, httpUpdateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     tags: [Workouts]
 *     summary: Delete a workout by ID
 *     description: "Deletes a specific workout by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the workout to delete"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully deleted the workout"
 *       500:
 *         description: "Error querying the database TABLE Workouts"
 */
WorkoutsRouter.delete('/:id', httpDeleteWorkout);

export default WorkoutsRouter;