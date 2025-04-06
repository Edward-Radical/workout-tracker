/* Replace with your SQL commands */
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(100),
    body_part VARCHAR(100),
    equipment VARCHAR(100),
    level VARCHAR(100),
    notes TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
);