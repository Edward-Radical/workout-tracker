<template>
    <main>
        <!-- SLOTS -->
        <Auth>
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
                            <googleCta @click=socialLogin()></googleCta>
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
                            <div class="pointer">
                                <router-link class="filter-all" to="/list-workout">View all</router-link>
                                <IconArrowRight></IconArrowRight>
                            </div>
                        </div>
                        <router-link :to="{ name: 'workout-show', params: { id: w.id } }"
                            class="workout-card"
                            v-for="(w, id) in workoutsList"
                            :key="id"
                        >
                            <div class="title">{{ w.name }}</div>
                            <div class="description">{{ w.description }}</div>
                            <div class="hr"></div>
                            <div class="tag">{{ w.Exercises.length }} Exercises</div>
                        </router-link>
                    </div>

                    <footer>
                        <div class="btn">
                            <router-link to="/create-workout" class="cta cta-orange">Add workout</router-link>
                        </div>
                    </footer>
                </div>
            </template>
        </Auth>
    </main>
</template>


<script setup>

import Auth from '../components/Auth.vue'
import auth from "../api/auth.js";
import workout from '@/api/workout';
import helpers from '@/helpers/global'

import googleCta from '@/components/googleCta.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

import { onBeforeRouteUpdate  } from 'vue-router'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

let user = ref(JSON.parse(localStorage.getItem('userObj')));
let userLogged = ref(localStorage.getItem('userLogged'));

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

// LOGIN FORM SECTION
let email = ref('');
let password = ref('');
// JWT
async function logUser(){
    // Client Validation
    if((email.value == '') || (password.value == '') ) alert('All fields are required');
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
    await auth.socialLogin();
}

// SIGNUP SECTION
let username = ref('');
async function registerUser(){
    // Client Validation
    if((email.value == '') || (password.value == '') ) alert('All fields are required');
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

// GET WORKOUTS
let workoutsList = ref([]);
async function getWorkouts(){

    const today = helpers.getTodayDate();
    try {
        const workouts = await workout.httpGetWorkouts(today);
        if(workouts) workoutsList.value = workouts;
    } catch (error) {
        console.log(error.message);
    }
}

if(userLogged.value && user.value){
    getWorkouts();
}

onBeforeRouteUpdate (async (to, from) => {

    let tokenExpired = helpers.tokenIsExpired();
    if(userLogged.value && user.value && !tokenExpired){
        getWorkouts();
    }
})

let tokenExpired = helpers.tokenIsExpired();
console.log(tokenExpired);

if(tokenExpired){
    // If the cookie or the JWT is expired
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userObj");
    userLogged.value = false;
    cookie = null;
    showLogSection();
    router.push({ path: '/', replace: true });
}

</script>



 


