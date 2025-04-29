# Workout Tracker - In Progress

Solution for the **Workout Tracker** challenge from [roadmap.sh](https://roadmap.sh/projects/fitness-workout-tracker).

## 📌 Description

This project involves building a complete workout tracker application with both a backend and a Vue.js frontend. Users can sign up, log in, create and schedule workouts, track their progress with sets, and view workout history. The system features JWT authentication, full CRUD functionality, and the potential for social login via Google.

## ✨ Features

- **Sign-Up:** Allow users to create an account.
- **Login:** Support for JWT-based authentication and optional Google social login.
- **Create Workout:** Users can create and schedule workouts composed of multiple exercises.
- **Update/Delete Workout:** Users can update or remove their workouts.
- **List Workouts:** Display active or upcoming workouts sorted by date and time.
- **Exercises Management:** Users can add exercises to workouts.
- **Sets Tracking:** For each exercise, users can track their progress by adding sets.

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Edward-Radical/workout-tracker.git
   ```

2. **Install root dependencies**
    ```bash
    npm install
    ```

3. **Install client dependencies**
    ```bash
    # In client/workout-tracker-client
    npm install
    ```

4. **Install server dependencies**
    ```bash
    # In ../../server
    npm install
    ```

5. **Create the .env file in the `server/` folder**
    (You can skip social login variables if you just want to use JWT        authentication)
    ```
    NODE_ENV=development

    APP_URL=http://localhost
    APP_CLIENT_URL=http://localhost:{YOUR_CLIENT_PORT}
    PORT=5000
    API_VERSION=v1

    DB_USER={YOUR_DB_USER}
    DB_HOST={YOUR_DB_HOST}
    DB_DATABASE={YOUR_DB_NAME}
    DB_PASSWORD={YOUR_DB_PASSWORD}
    DB_PORT={YOUR_DB_PORT}

    JWT_SECRET={RANDOM_STRING}

    GOOGLE_CLIENT_ID={OPTIONAL}
    GOOGLE_CLIENT_SECRET={OPTIONAL}
    GOOGLE_CLIENT_CALLBACK=/auth/google/callback

    SESSION_SECRET={RANDOM_STRING}
    COOKIE_KEY_1={RANDOM_STRING}
    COOKIE_KEY_2={RANDOM_STRING}
    ```

6. **Create the .env file in the `client/workout-tracker-client/` folder**
    ```
    VITE_API_BASE_URL=http://localhost:{YOUR_SERVER_PORT}
    VITE_API_VERSION=v1
    ```
    
7. **Set up the database – [see below DB Setup](##DB-Setup)**

8. **Seed the Exercises table**
    ```
    # In server/
    npm run seed-exercises
    ```
   
9. **Run the app**
You can either:
- Run both servers using `concurrently` from the root:
    ```
    npm run watch
    ```

- Or run frontend and backend separately:
    ```
    # In /client
    npm run dev
    # In /server
    npm run dev
    ```

## 🛠️ DB Setup
- Ensure PostgreSQL is installed and running.
- Create a new database for the project (or use an existing one — just configure .env accordingly).
- From the `server/` directory, run the migrations:
    ```
    db-migrate up
    ```
*If you get any error, make sure db-migrate is installed globally:*
    ```
    npm install -g db-migrate
    ```

## 🧰 Tech Stack
**Backend:**
- Node.js, 
- Express, 
- TypeScript, 
- Sequelize, 
- Passport, 
- JWT

**Frontend:** 
- Vue.js (Vite)

**Database:** 
- PostgreSQL

**Documentation:** 
- Swagger

## 📡 API Endpoints
All routes are prefixed with `/api/v1`.

**Swagger UI available at:**
    ```
    http://localhost:{YOUR_PORT}/api-docs
    ```

## 🚧 Features in Progress
- [ ] Testing: Write unit/integration tests for backend APIs.
- [ ] Reports: Generate user-specific workout progress reports.
- [ ] Client Improvements: Enhance the frontend experience.

---
*Feel free to contribute or report issues!* 🙌