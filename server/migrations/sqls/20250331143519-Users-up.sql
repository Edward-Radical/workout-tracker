/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
);