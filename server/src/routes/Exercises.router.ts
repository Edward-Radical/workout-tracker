import express from 'express';
import validateExerciseInput from '../validators/exerciseValidation';

const ExercisesRouter = express.Router();

// Metodi dei Controller
import {
    httpGetExercises,
    httpGetExercise,
    httpPostExercise,
    httpPatchExercise,
    httpDeleteExercise
} from '../controllers/Exercises.controller';

/**
    * @swagger
    * tags:
    *   name: Exercises
    *   description: The Exercises API allows you to manage exercises in the system. It provides endpoints for creating, retrieving, updating, and deleting exercises information.
*/

/**
 * @swagger
 * /exercises:
 *   get:
 *     tags: [Exercises]
 *     summary: Retrieves a list of all exercises in the system
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Error querying the database TABLE Exercises
*/
ExercisesRouter.get('/', httpGetExercises);

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     tags: [Exercises]
 *     summary: Retrieves a single exercises
 *     description: "Fetches a specific exercises by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the exercises to retrieve"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the exercises"
 *       500:
 *         description: "Error querying the database TABLE Exercises"
 */
ExercisesRouter.get('/:id', httpGetExercise);

/**
 * @swagger
 * /exercises:
 *   post:
 *     tags: [Exercises]
 *     summary: Create a new exercise
 *     description: "Creates a new exercise in the database."
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         description: "The exercise details to be created"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               description: "Name of the exercise"
 *             description:
 *               type: "string"
 *               description: "Description of the exercise"
 *             notes:
 *               type: "string"
 *               description: "Notes about the exercise"
 *     responses:
 *       201:
 *         description: "Successfully created the exercise"
 *       400:
 *         description: "Error during exercise input validation"
 *       500:
 *         description: "Error during the creation of the exercise"
 */
ExercisesRouter.post('/', validateExerciseInput, httpPostExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   patch:
 *     tags: [Exercises]
 *     summary: Update an existing exercise
 *     description: "Update an existing exercise in the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the exercise to retrieve"
 *         required: true
 *         type: "string"
 *       - name: "body"
 *         in: "body"
 *         description: "The exercise details to be updated"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               description: "Name of the exercise"
 *             description:
 *               type: "string"
 *               description: "Description of the exercise"
 *             notes:
 *               type: "string"
 *               description: "Notes about the exercise"
 *          
 *     responses:
 *       200:
 *         description: "Successfully updated the exercise"
 *       400:
 *         description: "Error during exercise input validation"
 *       500:
 *         description: "Error during the update of the exercise"
 */
ExercisesRouter.patch('/:id', httpPatchExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     tags: [Exercises]
 *     summary: Delete an exercise by ID
 *     description: "Deletes a specific exercise by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the exercise to delete"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully deleted the exercise"
 *       500:
 *         description: "Error querying the database TABLE Exercises"
 */
ExercisesRouter.delete('/:id', httpDeleteExercise);


export default ExercisesRouter;