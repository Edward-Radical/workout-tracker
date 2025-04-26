<template>
    <div class="workout-container w-100 h-100">
        <header>
            <IconBack class="icon-back" @click="goBack()"></IconBack>
            <p>WORKOUT - Update</p>
        </header>
        <div class="workout-main">
            <input type="text" placeholder="Name" v-model="workoutName" required>
            <input type="text" placeholder="Description" v-model="workoutDescription">
            <input type="text" placeholder="Notes" v-model="workoutNotes">
            <input type="date" placeholder="Schedule" v-model="workoutSchedule">

            <p class="label-days">Days</p>
            <div class="days-container">
                <div
                    v-for="day in days" 
                    :key="day.name"
                    :data-attr-day="day.name"  
                    class="day-card" 
                    :class="{ active: selectedDays.find((arrDay) => arrDay == day.name) }" 
                    @click="selectCurrentDay(day.name)"
                >
                    {{ day.label }}
                </div>
            </div>
            <button class="cta cta-orange" @click="getExercisesList()">ADD EXERCISE</button>
            <p class="delete-action">
                Delete Workout? 
                <span>Click Here</span>
            </p>
        </div>
        <footer>
            <button class="cta cta-orange" @click="updateWorkout()">UPDATE</button>
        </footer>
        
        <div v-if="toggleExercisesList" class="exercises-list w-100">
            <div class="search">
                <input type="text" placeholder="Search Exercise" v-model="search">
            </div>
            <div class="ex-item"
                v-for="(exercise, id) in filteredExercises" 
                :key="id"
            >
                <input 
                    type="checkbox" 
                    :name="exercise.name" 
                    :id="exercise.id"
                    :value="exercise.id" 
                    v-model="selectedExercises" 
                >
                <label for="addExercise">{{ exercise.name }}</label>
            </div>

            <footer>
                <button class="cta cta-orange" @click="toggleExercisesList=false">Confirm</button>
            </footer>

        </div>
    </div>

</template>

<script setup>
import helpers  from '../helpers/global';
import workout from '@/api/workout';
import exercises from '@/api/exercises';
import { ref, toRaw, computed, onMounted  } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import IconBack from '@/components/icons/IconBack.vue';

const userObj = JSON.parse(localStorage.getItem("userObj"));
const userId = userObj.id;

const router = useRouter();
const route = useRoute();
function goBack(){
    router.go(-1);
}

const workoutId = route.params.id;
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


let toggleExercisesList = ref(false);
let exercisesReactiveList = ref([]);
async function getExercisesList(){
    toggleExercisesList.value = true;

    //Get list
    try {
        const exercisesList = await exercises.httpGetExercises();
        if(exercisesList) exercisesReactiveList.value = exercisesList;
    } catch (error) {
        console.log(error.message);
        
    }
}

const search = ref(null);
const filteredExercises = computed(() => {
    if(search.value != null){
        return exercisesReactiveList.value.filter(exercise => exercise.name.toLowerCase().includes(search.value.toLowerCase()))
    }else{
        return exercisesReactiveList.value;
    }
})


let selectedExercises = ref([]);

const days = [
  { id: 0, name: 'monday', label: 'M' },
  { id: 1, name: 'tuesday', label: 'T' },
  { id: 2, name: 'wednesday', label: 'W' },
  { id: 3, name: 'thursday', label: 'T' },
  { id: 4, name: 'friday', label: 'F' },
  { id: 5, name: 'saturday', label: 'S' },
  { id: 6, name: 'sunday', label: 'S' },
];
let selectedDays = ref([]);
function selectCurrentDay(day){
    const found = selectedDays.value.find((arrDay) => arrDay == day);
    if(!found) {
        selectedDays.value.push(day);
    }

    if(found) {
        helpers.arrRemove(selectedDays.value, day);
    }
}


let workoutName = ref('');
let workoutDescription = ref('');
let workoutNotes = ref('');
let workoutSchedule = ref('');
async function updateWorkout(){

    if((workoutName.value == null) ){
        alert('Name field required');
        return;
    }
    
    try {
        const res = await workout.httpPatchWorkout({
            name: workoutName.value,
            description: workoutDescription.value,
            notes: workoutNotes.value,
            schedule: workoutSchedule.value,
            rep_days: toRaw(selectedDays.value),
            user_id: userId,
            exercises_list: selectedExercises.value
        }, workoutId);

        console.log(res);
        

        if(res) router.push({ name: 'workout-show', params: { id: workoutId }, replace: true });

    } catch (error) {
       console.log(error.message);
        
    }
}

onMounted(async () => {
    await getWorkout();
    
    workoutName.value = workoutObj.value.name ? workoutObj.value.name : null;
    workoutDescription.value = workoutObj.value.description ? workoutObj.value.description : null;
    workoutNotes.value = workoutObj.value.notes ?  workoutObj.value.notes : null;
    workoutSchedule.value = workoutObj.value.schedule ? workoutObj.value.schedule.split('T')[0] : null;
    selectedDays.value = workoutObj.value.rep_days ? workoutObj.value.rep_days : [];
    selectedExercises.value = workoutObj.value.Exercises ? workoutObj.value.Exercises.map(ex => ex.id) : [];
})
 
</script>