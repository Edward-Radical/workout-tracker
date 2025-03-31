// -----------------------------------
//          USERS CONTROLLER
// -----------------------------------

import { Request, Response } from 'express'; // Import types for request and response
// Funzioni del Model
import { 
    getAllUsers
} from '../models/Users.model';

async function httpGetUsers(req: Request, res: Response){
    try {
        const requests = await getAllUsers();
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};

export {
    httpGetUsers
}