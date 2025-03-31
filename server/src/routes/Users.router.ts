import express from 'express';
const UsersRouter = express.Router();

// Metodi dei Controller
import {
    httpGetUsers
} from '../controllers/Users.controller';

 /**
* @swagger
* tags:
*   name: User
*   description: The Users API allows you to manage user accounts in the system. It provides endpoints for creating, retrieving, updating, and deleting user information.
*/

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Retrieves a list of all users in the system
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Error querying the database TABLE Users
 */
UsersRouter.get('/', httpGetUsers);

export default UsersRouter;