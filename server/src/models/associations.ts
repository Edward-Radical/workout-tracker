// src/models/associations.ts

import User from "./Users.model";
import Workouts from "./Workouts.model";
import Exercises from "./Exercises.model";
import Workouts_Exercises from "./Workouts_Exercises.model";
import Sets from "./Sets.model";

// Setting up the associations
User.hasMany(Workouts, {
    foreignKey: 'user_id', // The foreign key in the Workouts model
    sourceKey: 'id', // The key in the User model being referenced
});
Workouts.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Workouts model
    targetKey: 'id', // The key in the User model being referenced
});


// Many-to-many relationship between Workouts and Exercises
Workouts.belongsToMany(Exercises, {
    through: 'workouts_exercises',  // Name of the join table
    foreignKey: 'workout_id',
    otherKey: 'exercise_id',
});
Exercises.belongsToMany(Workouts, {
    through: 'workouts_exercises',  // Name of the join table
    foreignKey: 'exercise_id',
    otherKey: 'workout_id',
});

// The best of both worlds: the Super Many-to-Many relationship
// Exercises.hasMany(Sets, {foreignKey: 'workout_exercise_id'});
Exercises.hasMany(Workouts_Exercises, { foreignKey: 'exercise_id'});
Sets.belongsTo(Exercises, {foreignKey: 'workout_exercise_id'});
Workouts_Exercises.belongsTo(Exercises, { foreignKey: 'exercise_id'});

// Associations for Workouts_Exercises
Workouts_Exercises.belongsTo(Workouts, { foreignKey: 'workout_id', targetKey: 'id' });
Workouts_Exercises.belongsTo(Exercises, { foreignKey: 'exercise_id', targetKey: 'id' });

Workouts_Exercises.hasMany(Sets, {
    foreignKey: 'workout_exercise_id', // The foreign key in the Workouts model
    sourceKey: 'id', // The key in the User model being referenced
});
Sets.belongsTo(Workouts_Exercises, {
    foreignKey: 'workout_exercise_id', // The foreign key in the Workouts model
    targetKey: 'id', // The key in the User model being referenced
});


