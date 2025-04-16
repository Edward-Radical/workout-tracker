<script setup>
import HomeView from './components/HomeView.vue'

import auth from "./api/auth.js";
import ex from "./api/exercises.js";
import { ref } from 'vue';

let user = ref(JSON.parse(localStorage.getItem('userObj')));
let userLogged = ref(localStorage.getItem('userLogged'));
// let userLogged = ref(false);
let exercises = ref([]);

let starterIsVisible = ref(true); // localStorage.getItem('userLogged')
let logSectionVisible = ref(false); // localStorage.getItem('userLogged')
let signupSectionVisible = ref(false); // localStorage.getItem('userLogged')

function showLogSection(){
  logSectionVisible.value = true;
  signupSectionVisible.value = false;
  starterIsVisible.value = false;
}
function showSignupSection(){
  signupSectionVisible.value = true;
  logSectionVisible.value = false;
  starterIsVisible.value = false;
}


async function getExercises(){
  const exList = await ex.httpGetExercises();
  if(exList && exList.length > 0) exercises.value = exList;
}

// LOGIN FORM SECTION
let email = ref('');
let password = ref('');
// JWT
async function logUser(){
  // Client Validation
  if((email.value == '') || (password.value == '') ) alert('Compilare tutti i campi');
  // Axios Call
  if(email.value && password.value){
    const res = await auth.login({email: email.value, password: password.value});
    if(res.success){
      localStorage.setItem('userLogged', true);
      localStorage.setItem('userObj', JSON.stringify(res.data));
      userLogged.value = true;

      logSectionVisible.value = false;
      signupSectionVisible.value = false;
      starterIsVisible.value = false;
    } else alert(res.message)
  }
}

// SOCIAL
let cookie = document.cookie;
if(cookie) userLogged.value = true;
async function socialLogin(){
  const success = await auth.socialLogin();
}

// SIGNUP SECTION
let username = ref('');
async function registerUser(){
  // Client Validation
  if((email.value == '') || (password.value == '') ) alert('I campi email e password sono obbligatori');
  if(email.value && password.value){
    const res = await auth.register(
      {
        username: username.value, 
        email: email.value, 
        password: password.value,
      }
    );

    if(res.success){
      logSectionVisible.value = true;
      signupSectionVisible.value = false;
      starterIsVisible.value = false;
    } else alert(res.message)
    
  }
}

// LOGOUT
async function logout(){
  const success = await auth.logout();
  if(success){
    localStorage.removeItem("userLogged");
    userLogged.value = false;
    cookie = null;
  }
}


</script>

<template >
  <main>

    <!-- SLOTS -->
    <HomeView>
      <!-- STARTER VIEW -->
      <template #starter v-if="starterIsVisible && !userLogged">
        <div class="starter-container">
          <div class="greet">LOREM IPSUM DOLOR SIT AMET</div>
          <div class="btns-action">
            <button class="cta cta-white" @click="showLogSection()">Login</button>
            <button class="cta cta-transparent" @click=showSignupSection()>Signup</button>
          </div>
        </div>
      </template>

      <!-- LOGIN SECTION VIEW -->
      <template #login v-if="logSectionVisible">
        <div class="login-container">
          <div class="login-greet">
            <span>Welcome,</span><br>Glad to see you!
          </div>

          <div class="login-form">
            <input type="text" placeholder="Email" v-model="email" required>
            <input type="password" placeholder="Password" v-model="password" required>
            <span class="forgot-psw">Forgot password ?</span>
            <button class="cta cta-white" @click=logUser()>login</button>
          </div>

          <div class="social-login">
            <p class="hr-lines">Or login with</p>
            <div class="btns-social">
              <button @click=socialLogin()>google</button>
              <button>facebook</button>
            </div>
          </div>

          <div class="footer">
            <p>
              Don’t have an account? <span class="cursor-pointer" @click="showSignupSection()">Sign Up Now</span>
            </p>
          </div>
        </div>
      </template>

      <!-- SIGNUP SECTION VIEW -->
      <template #signup v-if="signupSectionVisible">

        <div class="signup-container">
          <div class="signup-greet">
            <span>Create an account,</span><br>And get started!
          </div>

          <div class="signup-form">
            <input type="text" placeholder="Username" v-model="username">
            <input type="text" placeholder="Email" v-model="email" required>
            <input type="password" placeholder="Password" v-model="password" required>
            <button class="cta cta-white" @click="registerUser()">signup</button>
          </div>

          <div class="footer">
            <p>
              Already have an account? <span class="cursor-pointer" @click="showLogSection()">Login Now</span>
            </p>
          </div>
        </div>
      </template>


      <!-- RESULTS SECTION VIEW -->
      <template #results v-if="userLogged">
        <div class="main-view">

          <div class="logout">
            <button class="cta cta-orange small" @click=logout()>Logout</button>
          </div>

          <div class="greet">
            Welcome back,<br><span>{{ user?.username }}!</span>
          </div>

          <div class="latest-workout">
            <div class="header">
              <span>Today's Workouts</span>
              <p>View all</p>
            </div>
            <div class="workout-card">
              <div class="title">Day 1: Upper Body</div>
              <div class="description">Lorem Ipsum dolor sit amet, lista di tutti gli esercizi Squats, Leg extension, Lorem Ipsum dolor sit amet, lista di tutti gli esercizi Squats, Leg extension,</div>
              <div class="hr"></div>
              <div class="tag">12 Exercises</div>
            </div>
            <div class="btn">
              <button class="cta cta-orange" @click="addWorkout()">Add workout</button>
            </div>
          </div>

          <!-- <button @click=getExercises()>Get exercises</button>
          <ul>
              <li v-for="(ex, id) in exercises" :key="id">{{ ex.id }} | {{ ex.name }}</li>
          </ul> -->
        </div>
      </template>
    </HomeView>


  </main>
</template>


