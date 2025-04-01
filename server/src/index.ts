import * as dotenv from 'dotenv';
dotenv.config();  // Loads environment variables

import express from 'express';
import api from './routes/api';
import './models/associations';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swaggerOptions';

// Custom Error Handler
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

// Parse any incoming JSON
app.use(express.json());

// Setup Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Versioning delle APIs
app.use('/v1', api);

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);

export default app;