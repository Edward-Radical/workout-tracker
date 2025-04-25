<template>
    <div class="workout-list-container w-100 h-100">
        <header>
            <IconBack class="icon-back" @click="goBack()"></IconBack>
            <p>WORKOUTS - List</p>
        </header>
        <div class="workout-main">
            <router-link to="/create-workout" class="cta cta-orange">Add workout</router-link>
            <router-link :to="{ name: 'workout-show', params: { id: w.id } }"
                class="workout-card"
                v-for="(w, id) in workoutsList"
                :key="id"
            >
                <div class="date" v-if="w.schedule">{{ helpers.formatToDDMMYYYY(w.schedule) }}</div>
                <div class="title">{{ w.name }}</div>
                <div class="description" v-if="w.description">{{ w.description }}</div>
                <div class="hr"></div>
                <div class="tag">{{ w.Exercises.length }} Exercises</div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import helpers  from '../helpers/global';
import workout from '@/api/workout';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import IconBack from '@/components/icons/IconBack.vue';

const router = useRouter()
function goBack(){
    router.go(-1);
}

let workoutsList = ref([]);
async function getWorkouts(){
    try {
        const workouts = await workout.httpGetWorkouts();
        if(workouts) workoutsList.value = workouts;
    } catch (error) {
        console.log(error.message);
        
    }
}

getWorkouts();
 
</script>