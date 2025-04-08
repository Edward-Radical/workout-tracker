import express from 'express';
import validateUserInput from '../validators/userValidation';

const UsersRouter = express.Router();

// Metodi dei Controller
import {
    httpGetUsers,
    httpLoginUser,
    httpRegisterUser
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

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Registers a new user with a username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: User already exists
 */
UsersRouter.post('/register', validateUserInput, httpRegisterUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User]
 *     summary: Login an existing user
 *     description: Login an existing user using email and password to get a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: JWT token generated successfully
 *       400:
 *         description: Invalid credentials
 */
UsersRouter.post('/login', httpLoginUser);

export default UsersRouter;