import { createRouter, createWebHashHistory  } from 'vue-router';
import CreateWorkout from '../views/CreateWorkout.vue'
import ListWorkout from '../views/ListWorkout.vue'
import ShowWorkout from '../views/ShowWorkout.vue' 
import ShowExercise from '../views/ShowExercise.vue' 
import HomeView from '../views/HomeView.vue'

// Definisci le tue rotte
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create-workout',
    name: 'workout',
    component: CreateWorkout
  },
  {
    path: '/list-workout',
    name: 'workout-list',
    component: ListWorkout
  },
  {
    path: '/workout/:id',
    name: 'workout-show',
    component: ShowWorkout
  },
  {
    path: '/exercise/:id',
    name: 'exercise-show',
    component: ShowExercise
  }
];

// Crea il router con la modalità di navigazione history
const router = createRouter({
  history: createWebHashHistory(),
  routes
});



export default router;
