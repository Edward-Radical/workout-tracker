import * as dotenv from 'dotenv';
dotenv.config();  // Loads environment variables
import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { AppError } from '../utils/AppError'; // Import the custom error class
import logger from '../utils/logger';
import Workouts from './Workouts.model';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define the User model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare username: string;
    declare deletedAt: Date | null;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Must be a valid email' },
            },
        },
        password: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: { args: [8, 100], msg: 'Password must be at least 8 characters long' },
            },
        },
        username: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Username cannot be empty' },
                len: { args: [1, 100], msg: 'Userame should be between 1 and 100 characters' },
            },
        },
        deletedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
    },
    {
      sequelize,
      tableName: 'users',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

User.addHook(
    'beforeDestroy', async (user: User) => {
        try {
            // Soft-delete logic here - When removing a User it should remove all the workouts related
        } catch (error: unknown) {
            if(error instanceof Error){
                logger.error('Error during beforeDestroy hook for User:', error);
                // Propagate the error to ensure the destroy action fails if necessary
                throw new AppError(error.message || 'Database query failed', 500);
            }else{
                logger.error('An unknown error occurred');
            }
        }
    }
)
User.addHook(
    // Manual Input Sanitazion
    'beforeCreate', async (user: User) => {
        if(user.username) user.username = user.username.trim();
        if(user.email) user.email = user.email.trim().toLowerCase();
    },
)

/**
 * Query the DB to extract all the Users
 * @param void
 * @returns an object with a data array containing plain objects of users
 */
async function index(): Promise<InferAttributes<User>[] | undefined> {
    try {
        // Query the database
        const users = await User.findAll({
            limit: 10,  // Set limit to 10 users per page
            offset: 0,   // Set offset based on current page number
            include:[
                {
                    model: Workouts,
                    required: false
                }
            ]
        });

        // Convert Sequelize instances to plain objects for easy use
        const results = users.map(user => user.get({ plain: true }));

        // Return the results
        return results;
    } catch (error: unknown) {
        // Safely handle the error
        if (error instanceof Error) {
            logger.error(error);
            throw new AppError(error.message || 'Database query failed', 500);
        } else {
            // If error is not an instance of Error, handle accordingly
            logger.error('An unknown error occurred');
        }
    }
}

async function register(request: User): Promise<object | undefined>{

    const { username, email, password } = request;
        
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email, 
            password: hashedPassword,
            username
        });

        // Convert Sequelize instances to plain object for easy use
        const results = newUser.get({ plain: true });
        return results;

    } catch (error) {
        // Safely handle the error
        if (error instanceof Error) {
            logger.error(error);
            throw new AppError(error.message || 'Error gcreating the User', 500);
        } else {
            // If error is not an instance of Error, handle accordingly
            logger.error('An unknown error occurred');
        }
    }
}

async function login(request: User, enteredPassword: any): Promise<string | undefined>{

    const { email, password } = request;
        
    try {

        // Find user by email
        const user = request;
        if(user){
            // Compare the entered password with the hashed password
            const isMatch = await bcrypt.compare(enteredPassword, user.password);
            if (!isMatch) {
                logger.error('Invalid credentials');
                throw new AppError('Invalid credentials', 400);
            }

            // Generate JWT token
            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }else{
                const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: '1h' });
                return token;
            }
        }
    } catch (error) {
        // Safely handle the error
        if (error instanceof Error) {
            logger.error(error);
            throw new AppError(error.message || 'Error gcreating the User', 500);
        } else {
            // If error is not an instance of Error, handle accordingly
            logger.error('An unknown error occurred');
        }
    }
}

// Exporting the function as a named export
export default User;
export { index, register, login };
  