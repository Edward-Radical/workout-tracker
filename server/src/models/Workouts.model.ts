import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { AppError } from '../utils/AppError'; // Import the custom error class
import logger from '../utils/logger';
import User from './Users.model';
import Exercises from './Exercises.model';
import Sets from './Sets.model';

// Define the Workout model class
class Workouts extends Model<InferAttributes<Workouts>, InferCreationAttributes<Workouts>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare schedule: Date;
    declare rep_days: JSON;
    declare user_id: number;
    declare notes: string;
    declare deletedAt: Date | null;
}

// Initialize the Workout model
Workouts.init(
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
        schedule: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
        rep_days: {
            type: new DataTypes.JSON,
            allowNull: true,
        },
        user_id: {
            type: new DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
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
      tableName: 'workouts',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

Workouts.addHook(
    'beforeDestroy', async (workout: Workouts) => {
        try {
            // Soft-delete logic here - When removing a Workout it should remove all the exercies related
            // await Exercises.update(
            //     { deletedAt: new Date() },  // Set the deletedAt timestamp to trigger the soft delete
            //     {
            //         where: {
            //             workout_id: workout.id,
            //             deletedAt: null  // Only update exercises that are not already soft-deleted
            //         }
            //     }
            // );
            
        } catch (error: unknown) {
            if(error instanceof Error){
                logger.error('Error during beforeDestroy hook for Workout:', error);
                // Propagate the error to ensure the destroy action fails if necessary
                throw new AppError(error.message || 'Soft delete for Workouts failed', 500);
            }else{
                logger.error('An unknown error occurred');
            }
        }
    }
)
Workouts.addHook(
    // Manual Input Sanitazion
    'beforeCreate', async (workout: Workouts) => {},
)

/**
    * Display a listing of the resource.
    *
    * @return Response
*/
async function index(): Promise<InferAttributes<Workouts>[] | undefined> {
    try {
        // Query the database
        const workouts = await Workouts.findAll({
            limit: 10,  // Set limit to 10 workouts per page
            offset: 0,   // Set offset based on current page number
            order: [['id', 'ASC']]
        });

        // Convert Sequelize instances to plain objects for easy use
        const results = workouts.map(w => w.get({ plain: true }));

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
        const workout = await Workouts.findOne({
            where: { id: id},
            include: [{
                model: Exercises,
                include: [{
                    model: Sets
                }]
            }]
        });

        if(workout){
            const results = workout.get({ plain: true });
            // Return the results
            return results;
        }

        return null;
    
    } catch (error) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error querying the Workouts with ID: ${id}`,
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
async function store(request: Workouts): Promise<object | undefined> {

    const {name, description, schedule, rep_days, notes, user_id} = request;
    try {
        const newWorkout = await Workouts.create({
            name,
            description,
            schedule,
            rep_days,
            notes,
            user_id
        });

        // Convert Sequelize instances to plain object for easy use
        const results = newWorkout.get({ plain: true });
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

    // Check if the workout exists
    if(!show(id)){
        return {
            success: false,
            message: `Workout with ID ${id} not found`
        };
    }

    const updatedWorkout = await Workouts.update(request, {
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
        // Find the workout by primary key
        const workout = await Workouts.findByPk(id);

        if(!workout){
            return {
                success: false,
                message: `The workout with ID: ${id} doesn't exists`,
            }
        }

        if(workout){
            await workout.destroy();
        }

        const deletedWorkout = await Workouts.findByPk(id, { paranoid: false });
        if(deletedWorkout){
            const results = deletedWorkout.get({ plain: true });
            return results;        
        }

        return null;
        
    } catch (error) {
        if (error instanceof Error) {
            const res: object = {
                success: false,
                message: `Error deleting the Workout with ID: ${id}`,
                error: error.message
            }
            return res;
        }
        return {error}
    }
}

// Exporting the function as a named export
export default Workouts;
export { 
    index,
    show, 
    store,
    update,
    destroy
};
  