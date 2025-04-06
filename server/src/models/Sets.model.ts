import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { AppError } from '../utils/AppError'; // Import the custom error class
import logger from '../utils/logger';
import Workouts_Exercises from '../models/Workouts_Exercises.model'

// Define the Workout model class
class Sets extends Model<InferAttributes<Sets>, InferCreationAttributes<Sets>> {
    declare id: CreationOptional<number>;
    declare description: string;
    declare set_number: number;
    declare reps: number;
    declare kg: number;
    declare rest_time: number;
    declare workout_exercise_id: number;
    declare deletedAt: Date | null;
}

// Initialize the Workout model
Sets.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Description cannot be empty' },
            },
        },
        set_number: {
            type: new DataTypes.NUMBER,
            allowNull: false
        },
        reps: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Reps number cannot be empty' },
            },
        },
        kg: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Kg value cannot be empty' },
            },
        },
        rest_time: {
            type: new DataTypes.NUMBER,
            allowNull: true,
        },
        workout_exercise_id: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: Workouts_Exercises,
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
      tableName: 'sets',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

Sets.addHook(
    'beforeDestroy', async (sets: Sets) => {
        try {
            // Soft-delete logic here - When removing a Workout it should remove all the sets related
            // await Sets.update(
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
                throw new AppError(error.message || 'Soft delete for Sets failed', 500);
            }else{
                logger.error('An unknown error occurred');
            }
        }
    }
)
Sets.addHook(
    // Manual Input Sanitazion
    'beforeCreate', async (sets: Sets) => {},
)

/**
    * Display a listing of the resource.
    *
    * @return Response
*/
async function index(): Promise<InferAttributes<Sets>[] | undefined> {
    try {
        // Query the database
        const sets = await Sets.findAll({
            limit: 10,  // Set limit to 10 sets per page
            offset: 0,   // Set offset based on current page number
            order: [['id', 'ASC']]
        });

        // Convert Sequelize instances to plain objects for easy use
        const results = sets.map(w => w.get({ plain: true }));

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
        // Query the database
        const sets = await Sets.findByPk(id);

        if(sets){
            const results = sets.get({ plain: true });
            // Return the results
            return results;
        }

        return null;
    
    } catch (error) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error querying the Sets with ID: ${id}`,
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
async function store(request: Sets): Promise<object | undefined> {

    const {description, set_number, reps, kg, rest_time, workout_exercise_id} = request;
    try {
        const newSet = await Sets.create({
            description,
            set_number,
            reps,
            kg,
            rest_time,
            workout_exercise_id
        });

        // Convert Sequelize instances to plain object for easy use
        const results = newSet.get({ plain: true });
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
async function update(id: number, request: Object): Promise<object | undefined> {

    // Check if the set exists
    if(!show(id)){
        return {
            success: false,
            message: `Set with ID ${id} not found`
        };
    }

    const updatedSet = await Sets.update(request, {
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
async function destroy(id: number): Promise<object | null> {
    try {
        // Find the set by primary key
        const set = await Sets.findByPk(id);
        if(!set){
            return {
                success: false,
                message: `The set with ID: ${id} doesn't exists`,
            }
        }

        if(set){
            await set.destroy();
        }

        const deletedSet = await Sets.findByPk(id, { paranoid: false });
        if(deletedSet){
            const results = deletedSet.get({ plain: true });
            return results;        
        }

        return null;
        
    } catch (error) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error deleting the Set with ID: ${id}`,
                error: error.message
            }
            return res;
        }
        return {error}
    }
}

// Exporting the function as a named export
export default Sets;
export { 
    index, 
    show,
    store,
    update,
    destroy 
};
  