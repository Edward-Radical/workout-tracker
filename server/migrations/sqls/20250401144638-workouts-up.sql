/* Replace with your SQL commands */
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    schedule TIMESTAMP,
    rep_days JSON,
    notes TEXT,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
);