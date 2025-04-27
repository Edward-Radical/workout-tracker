<template>
    <div class="workout-exercises-list-container w-100 h-100" v-if="workoutObj">
        <header>
            <IconBack class="icon-back" @click="goBack()"></IconBack>
            <p>{{ workoutObj.name }}</p>
        </header>
        <div class="w-100 schedule-info-container" v-if="workoutObj.description || workoutObj.schedule">
            <div class="schedule-info">
                <IconCalendar v-if="workoutObj.schedule"></IconCalendar>
                <p class="info-small" v-if="workoutObj.schedule">{{ helpers.formatToDDMMYYYY(workoutObj.schedule) }}</p>
            </div>
            <p class="info-small" v-if="workoutObj.description">{{ workoutObj.description }}</p>
            <hr>
        </div>
        <div class="workout-main">
            <h2>Exercises</h2>
            <router-link :to="{ name: 'exercise-show', params: { wid: workoutObj.id, id: ex.id } }"
                v-for="(ex, id) in workoutObj.Exercises"
                :key="id"
                class="w-100 sets-container"
            >
                <div class="exercise-name">
                    <p>{{ ex.name }} </p>
                    <IconBack style="rotate: 180deg;"></IconBack>
                </div>
                <hr>
            </router-link>

        </div>

        <footer>
            <router-link class="cta cta-orange" :to="{ name: 'workout-update', params: { id: workoutObj.id } }">
                UPDATE WORKOUT
            </router-link>
        </footer>
    </div>
</template>

<script setup>
import helpers from '@/helpers/global';
import workout from '@/api/workout';
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconBack from '@/components/icons/IconBack.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';


const router = useRouter();
const route = useRoute();

const workoutId = route.params.id;

function goBack(){
    router.go(-1);
}

let workoutObj = ref({});
async function getWorkout(){
    try {
        const w = await workout.httpGetWorkout(workoutId);
        if(w) workoutObj.value = w;
        return w;
        
    } catch (error) {
        console.log(error.message);
    }
}
onBeforeMount(async () => {
    await getWorkout();
})

</script>