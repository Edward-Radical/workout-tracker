import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";

// Define the User model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
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
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
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
            // Soft-delete logic here
        } catch (error) {
            console.error('Error during beforeDestroy hook for User:', error);
            throw error;  // Propagate the error to ensure the destroy action fails if necessary
        }
        
    },
)

async function getAllUsers(): Promise<User[]> {
    try {
        // Query the database
        const results = await User.findAll();
        // Return the results
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error querying the database: TABLE Users');
    }
}

// Exporting the function as a named export
export default User;
export { getAllUsers };
  