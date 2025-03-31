require('dotenv').config(); //va importato all'inizio
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'Workout Tracker App APIs Documentation',
            version: '1.0.0',
            description: 'API documentation for the app',
        },
        servers: [
            {
                url: `${process.env.APP_URL}:${process.env.PORT}/${process.env.API_VERSION}`,
            },
        ]
    },
    apis: [
        './src/routes/*.ts'
    ],
};

export default swaggerOptions;