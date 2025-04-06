import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { AppError } from '../utils/AppError'; // Import the custom error class
import logger from '../utils/logger';
import Workouts from './Workouts.model';

// Define the Workout model class
class Exercises extends Model<InferAttributes<Exercises>, InferCreationAttributes<Exercises>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare notes: string;
    declare deletedAt: Date | null;
}

// Initialize the Workout model
Exercises.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Name cannot be empty' },
            },
        },
        description: {
            type: new DataTypes.STRING(500),
            allowNull: true,
        },
        notes: {
            type: new DataTypes.STRING,
            allowNull: true,
        },
        deletedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
    },
    {
      sequelize,
      tableName: 'exercises',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

Exercises.addHook(
    'beforeDestroy', async (exercises: Exercises) => {
        try {
            // Soft-delete logic here - When removing a Workout it should remove all the exercises related
            // await Exercises.update(
            //     { deletedAt: new Date() },  // Set the deletedAt timestamp to trigger the soft delete
            //     {
            //         where: {
            //             workout_id: exercises.id,
            //             deletedAt: null  // Only update exercises that are not already soft-deleted
            //         }
            //     }
            // );
            
        } catch (error: unknown) {
            if(error instanceof Error){
                logger.error('Error during beforeDestroy hook for Workout:', error);
                // Propagate the error to ensure the destroy action fails if necessary
                throw new AppError(error.message || 'Soft delete for Exercises failed', 500);
            }else{
                logger.error('An unknown error occurred');
            }
        }
    }
)
Exercises.addHook(
    // Manual Input Sanitazion
    'beforeCreate', async (workout: Exercises) => {},
)

/**
    * Display a listing of the resource.
    *
    * @return Response
*/
async function index(): Promise<InferAttributes<Exercises>[] | undefined> {
    try {
        // Query the database
        const exercises = await Exercises.findAll({
            limit: 10,  // Set limit to 10 exercises per page
            offset: 0,   // Set offset based on current page number
            order: [['id', 'ASC']]
        });

        // Convert Sequelize instances to plain objects for easy use
        const results = exercises.map(w => w.get({ plain: true }));

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

/**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return Response
*/
async function show(id: number): Promise<object | null> {
    try {
        const exercise = await Exercises.findByPk(id);
        if(exercise){
            const result = exercise.get({plain:true});
            return result;
        }
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error querying the Exercise with ID: ${id}`,
                error: error.message
            }
            return res;
        }

        return {error}
    }
}

/**
    * Store a newly created resource in storage.
    *
    * @return Response
*/
async function store(request: Exercises): Promise<object | undefined> {

    const {name, description, notes} = request;
    try {
        const newExercise = await Exercises.create({
            name,
            description,
            notes
        });

        // Convert Sequelize instances to plain object for easy use
        const results = newExercise.get({ plain: true });
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

/**
    * Update the specified resource in storage.
    *
    * @param  int  $id
    * @return Response
*/
async function update(id: number, request: Object): Promise<object | undefined>{

    if(!show(id)){
        return {
            success: false,
            message: `Exercise with ID ${id} not found`
        };
    }

    const updatedExercise = await Exercises.update(request,{
        where: {id: id}
    });

    return;
}

/**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return Response
*/
async function destroy(id: number): Promise<object | null>{

    try {
        const exercie = await Exercises.findByPk(id);
    
        if(!exercie){
            return{
                success: false,
                message: `Exercise with ID ${id} not found`
            }
        }

        if(exercie) await exercie.destroy();

        const deletedExercise = await Exercises.findByPk(id, { paranoid: false });
        if(deletedExercise){
            const results = deletedExercise.get({plain: true});
            return results;
        }

        return null;

    } catch (error) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error deleting the Exercise with ID: ${id}`,
                error: error.message
            }
            return res;
        }
        return {error}
    }
    
    
    
}

// Exporting the function as a named export
export default Exercises;
export { 
    index, 
    show,
    store,
    update,
    destroy 
};
  