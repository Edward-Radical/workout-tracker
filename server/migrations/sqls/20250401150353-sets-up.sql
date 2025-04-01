/* Replace with your SQL commands */
CREATE TABLE sets (
    id SERIAL PRIMARY KEY, 
    description VARCHAR(500),
    set_number INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    kg INTEGER NOT NULL,
    rest_time INTEGER,
    workout_exercise_id INTEGER REFERENCES workouts_exercises(id) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
);