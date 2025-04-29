import * as dotenv from 'dotenv';
dotenv.config();  // Loads environment variables

import express from 'express';
import validateUserInput from '../validators/userValidation';
import passport from 'passport';

const AuthUserRouter = express.Router();

// Metodi dei Controller
import {
    httpLoginUser,
    httpRegisterUser,
    httpSocialLogin,
    httpLogout
} from '../controllers/Users.controller';

/**
    * @swagger
    * tags:
    *   name: Auth
    *   description: The Auth API allows you to manage user login and registrations in the system. It provides endpoints for creating and retrieving a user.
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
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
AuthUserRouter.post('/register', validateUserInput, httpRegisterUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
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
AuthUserRouter.post('/login', httpLoginUser);

/**
 * When the user click on "Login with Google" passport redirect the user to the Google Login page
 * The scope is asking to access the user profile and email through google
 * This route activate the GoogleStrategy defined in the /utils/passport.ts file
 */
AuthUserRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * After the user accepted the login request, passport very that google correctly authenticated the user
 * If fails redirect the user to the login page
 * If success it call the controller function httpSocialLogin
 */
AuthUserRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: process.env.APP_CLIENT_URL}), httpSocialLogin);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout the current user
 *     description: Logout the current user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: User successfully logged out
 */
AuthUserRouter.get('/logout', httpLogout);

export default AuthUserRouter;