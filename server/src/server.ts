// IMPORT
require('dotenv').config();
import HTTP from 'http';
import app from './index';

// ASSIGNEMENT
const PORT = process.env.PORT || 5000;

// SERVER
const SERVER = HTTP.createServer(app);

function startServer(){
    console.log('Function start server called');
    

    try {
        SERVER.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting the server: ${error}`); 
    }
}

startServer();