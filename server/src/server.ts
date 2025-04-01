// IMPORT
require('dotenv').config();
import HTTP from 'http';
import app from './index';

// Winston Logger
import logger from './utils/logger';

// ASSIGNEMENT
const PORT = process.env.PORT || 5000;

// SERVER
const SERVER = HTTP.createServer(app);

function startServer(){
    logger.info('Function start server called');

    try {
        SERVER.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(`Error starting the server: ${error}`); 
    }
}

startServer();