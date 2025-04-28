# Workout Tracker - In Progress
Solution for the Workout Tracker challenge from [roadmap.sh](https://roadmap.sh/projects/fitness-workout-tracker).

## Description 
This project involves creating a backend system for a workout tracker application where users can sign up, log in, create workout plans, and track their progress. The system will feature JWT authentication, CRUD operations for workouts, and generate reports on past workouts.

The project also include a frontend client based on Vue.js for better user experience.

## Features
- Sign-Up: Allow users to create an account.
- Login: Allow users to log into their account through JWT or Google Social login
- Create Workout: Allow users to create and schedule workouts composed of multiple exercises.
- Update Workout: Allow users to update workouts.
- Delete Workout: Allow users to delete workouts.
- List Workouts: List active or pending workouts sorted by date and time.
- Exercises: After a workout has been created allow the user to add exercises to it
- Set: For each exercise associated to a workout the user could track their progress adding new sets


## Installation
1. Clone the repository
```
git clone
```
2. Intall the dependencies
3. Create your .env file
```
NODE_ENV=development

APP_URL=http://localhost
APP_CLIENT_URL=http://localhost:{YOUR_CLIENT_PORT}
PORT={YOUR_SERVER_PORT}
API_VERSION=v1

DB_USER={YOUR_DB_USER}
DB_HOST={YOUR_DB_HOST}
DB_DATABASE={YOUR_DB_NAME}
DB_PASSWORD={YOUR_DB_PASSWORD}
DB_PORT={YOUR_DB_PORT}


JWT_SECRET={GENERATE_A_RANDOM_STRING_AS_KEY}

GOOGLE_CLIENT_ID={GENERATE_A_CLIENT_ID_IN_GOOGLE_DASHBOARD}
GOOGLE_CLIENT_SECRET={GENERATE_A_CLIENT_SECRET_IN_GOOGLE_DASHBOARD}
GOOGLE_CLIENT_CALLBACK=/auth/google/callback

SESSION_SECRET={GENERATE_A_RANDOM_STRING_AS_KEY}
COOKIE_KEY_1={GENERATE_A_RANDOM_STRING_AS_KEY}
COOKIE_KEY_2={GENERATE_A_RANDOM_STRING_AS_KEY}
```
4. Seed the Exercises table: cd to `/server` and run:
```
npm run seed-exercises
```

5. Setup the Database: [see below DB Setup](##DB-Setup)
6. Start the server: the project use the npm package `concurrently` so you just need to run `npm run watch` in the root folder. Alternativley cd to each folder (client and server) and start them running `npm run dev`


## DB Setup
- Ensure to have PostgreSQL installed and running
- Create a new DB for the application or use your own (just remeber to setup the `.env` file correctly)
- Run the migrations file `db-migrate up`: this command will create all the tables you need

## Technology

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize
- Swagger
- Passport + JWT

## API Endpoints
- All endpoints are versioned under /api/v1.
- The project provide Swagger-doc so after the installation you could navigate to http://localhost:{YOUR_PORT_NUMBER}/api-docs

## Feature pending to be implemented
- [ ] Testing: Write tests for all the backend APIs.
- [ ] Generate Reports: Generate reports on past workouts and progress.