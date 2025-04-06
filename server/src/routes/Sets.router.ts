import express from 'express';
import validateSetInput from '../validators/SetValidation';

const SetsRouter = express.Router();

// Metodi dei Controller
import {
    httpGetSets,
    httpGetSet,
    httpPostSet,
    httpUpdateSet,
    httpDeleteSet
} from '../controllers/Sets.controller';

/**
    * @swagger
    * tags:
    *   name: Sets
    *   description: The Sets API allows you to manage sets in the system. It provides endpoints for creating, retrieving, updating, and deleting sets information.
*/

/**
 * @swagger
 * /sets:
 *   get:
 *     tags: [Sets]
 *     summary: Retrieves a list of all sets in the system
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Error querying the database TABLE Sets
*/
SetsRouter.get('/', httpGetSets);

/**
 * @swagger
 * /sets/{id}:
 *   get:
 *     tags: [Sets]
 *     summary: Retrieves a single set
 *     description: "Fetches a specific set by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the set to retrieve"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the set"
 *       500:
 *         description: "Error querying the database TABLE Sets"
 */
SetsRouter.get('/:id', httpGetSet);

/**
 * @swagger
 * /sets:
 *   post:
 *     tags: [Sets]
 *     summary: Create a new set
 *     description: "Creates a new set in the database."
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         description: "The set details to be created"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             description:
 *               type: "string"
 *               description: "Description of the set"
 *             set_number:
 *               type: "number"
 *               description: "The number of the set"
 *             reps:
 *               type: "number"
 *               description: "The number of the repetitions"
 *             kg:
 *               type: "number"
 *               description: "Kg lifted"
 *             rest_time:
 *               type: "number"
 *               description: "The rest time between sets"
 *             workout_exercise_id:
 *               type: "integer"
 *               description: "The Workout_Exercise related to this specific set"
 *          
 *     responses:
 *       201:
 *         description: "Successfully created the set"
 *       400:
 *         description: "Error during set input validation"
 *       500:
 *         description: "Error during the creation of the set"
 */
SetsRouter.post('/', validateSetInput, httpPostSet);

/**
 * @swagger
 * /sets/{id}:
 *   patch:
 *     tags: [Sets]
 *     summary: Update an existing set
 *     description: "Update an existing set in the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the set to retrieve"
 *         required: true
 *         type: "string"
 *       - name: "body"
 *         in: "body"
 *         description: "The set details to be updated"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             description:
 *               type: "string"
 *               description: "Description of the set"
 *             set_number:
 *               type: "number"
 *               description: "The number of the set"
 *             reps:
 *               type: "number"
 *               description: "The number of the repetitions"
 *             kg:
 *               type: "number"
 *               description: "Kg lifted"
 *             rest_time:
 *               type: "number"
 *               description: "The rest time between sets"
 *             workout_exercise_id:
 *               type: "integer"
 *               description: "The Workout_Exercise related to this specific set"
 *          
 *     responses:
 *       200:
 *         description: "Successfully updated the set"
 *       400:
 *         description: "Error during set input validation"
 *       500:
 *         description: "Error during the update of the set"
 */
SetsRouter.patch('/:id', httpUpdateSet);

/**
 * @swagger
 * /sets/{id}:
 *   delete:
 *     tags: [Sets]
 *     summary: Delete a set by ID
 *     description: "Deletes a specific set by ID from the database."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the set to delete"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: "Successfully deleted the set"
 *       500:
 *         description: "Error querying the database TABLE Sets"
 */
SetsRouter.delete('/:id', httpDeleteSet);

export default SetsRouter;