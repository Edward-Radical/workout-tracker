/* Replace with your SQL commands */
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    notes TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
);