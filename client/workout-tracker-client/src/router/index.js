import { createRouter, createWebHashHistory  } from 'vue-router';
import CreateWorkout from '../views/CreateWorkout.vue'
import UpdateWorkout from '../views/UpdateWorkout.vue'
import ListWorkout from '../views/ListWorkout.vue'
import ShowWorkout from '../views/ShowWorkout.vue' 
import ShowExercise from '../views/ShowExercise.vue' 
import HomeView from '../views/HomeView.vue'

import helpers from '@/helpers/global';

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
    component: CreateWorkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/update-workout/:id',
    name: 'workout-update',
    component: UpdateWorkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/list-workout',
    name: 'workout-list',
    component: ListWorkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/workout/:id',
    name: 'workout-show',
    component: ShowWorkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/workouts/:wid/exercise/:id',
    name: 'exercise-show',
    component: ShowExercise,
    meta: { requiresAuth: true }
  }
];

// Crea il router con la modalità di navigazione history
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Middleware (navigation guard)
router.beforeEach((to, from, next) => {

  const token = document.cookie;
  if(token) var tokenExpired = helpers.tokenIsExpired();

  const isLoggedIn = token && !tokenExpired;
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/') // redirect to login if not logged
  } else {
    next() // allow navigation
  }
})


export default router;
