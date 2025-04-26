import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { AppError } from '../utils/AppError'; // Import the custom error class
import logger from '../utils/logger';
import Workouts from './Workouts.model';
import Exercises from './Exercises.model';
import Sets from './Sets.model';

// Define the Workout model class
class Workouts_Exercises extends Model<InferAttributes<Workouts_Exercises>, InferCreationAttributes<Workouts_Exercises>> {
    declare id: CreationOptional<number>;
    declare workout_id: number;
    declare exercise_id: number;
    declare deletedAt: Date | null;
    public Sets?: Sets[];
}

// Initialize the Workout model
Workouts_Exercises.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        workout_id: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: Workouts,
                key: 'id',
            },
        },
        exercise_id: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: Exercises,
                key: 'id',
            },
        },
        deletedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
    },
    {
      sequelize,
      tableName: 'workouts_exercises',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

Workouts_Exercises.addHook(
    'beforeDestroy', async (sets: Workouts_Exercises) => {
        try {
            // Soft-delete logic here - When removing a Workout it should remove all the sets related
            // await Workouts_Exercises.update(
            //     { deletedAt: new Date() },  // Set the deletedAt timestamp to trigger the soft delete
            //     {
            //         where: {
            //             workout_id: sets.id,
            //             deletedAt: null  // Only update sets that are not already soft-deleted
            //         }
            //     }
            // );
            
        } catch (error: unknown) {
            if(error instanceof Error){
                logger.error('Error during beforeDestroy hook for Workout:', error);
                // Propagate the error to ensure the destroy action fails if necessary
                throw new AppError(error.message || 'Soft delete for Workouts_Exercises failed', 500);
            }else{
                logger.error('An unknown error occurred');
            }
        }
    }
)
Workouts_Exercises.addHook(
    // Manual Input Sanitazion
    'beforeCreate', async (sets: Workouts_Exercises) => {},
)

// Exporting the function as a named export
export default Workouts_Exercises;
