import * as dotenv from 'dotenv';
dotenv.config();  // Loads environment variables

import express from 'express';
import AuthUserRouter from './routes/Auth.router';
import api from './routes/api';
import './models/associations';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swaggerOptions';

// Custom Error Handler
import ErrorHandler from './middlewares/ErrorHandler';

// Social Login
import passport from 'passport';
import './utils/passport';
import checkLoggedIn from './middlewares/checkLoggedIn';
import cookieSession from 'cookie-session';
import cookieParser from "cookie-parser";

// CORS
import cors from 'cors';

import * as fs from 'fs';


const app = express();

// Parse any incoming JSON
app.use(express.json());

// Save the JWT token in the cookie session
app.use(cookieParser());

const COOKIE_KEY_1 = process.env.COOKIE_KEY_1 as string;
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2 as string;

// The cookie is saved in the session for the social login
app.use(cookieSession({
    name: "wt-social-session",
    maxAge: 60 * 60 * 1000,
    keys: [ COOKIE_KEY_1, COOKIE_KEY_2 ],
    path: '/', // default path
    httpOnly: false,
    secure: false, // deve combaciare con quello usato all’inizio
    sameSite: 'lax', // o 'lax' se usato così nella sessione
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());


// CORS
const corsOptions = {
    origin: process.env.APP_CLIENT_URL,
    credentials: true // permette l'invio del cookie
}

app.use(cors(corsOptions));


// Setup Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', AuthUserRouter);

// Versioning delle APIs
app.use('/v1', checkLoggedIn, api);

app.get('/', ((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('../client/index.html', null, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
}))

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);

export default app;