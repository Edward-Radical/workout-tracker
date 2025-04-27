<template>
    <div class="exercise-container w-100 h-100" v-if="exerciseObj">
        <header>
            <IconBack class="icon-back" @click="goBack()"></IconBack>
            <p>{{ exerciseObj.name }}</p>
        </header>
        <div class="workout-main">
            <p class="info-small" v-if="exerciseObj.description">{{ exerciseObj.description }}</p>
            <hr v-if="exerciseObj.description">

            <h2>Sets</h2>
            <div
            v-if="!latestDateisToday()"
                class="w-100 sets-container"
            >
                <div class="sets-count">
                    <span class="date">Today</span>
                    <div class="sets-header">
                        <div>SETS</div>
                        <div>REPS</div>
                        <div>KG</div>
                    </div>

                    <div class="sets-info">
                   
                        <div class="set-row set-form">
                            <div>1</div>
                            <div>
                                <input type="text" name="reps" v-model="reps">
                            </div>
                            <div>
                                <input type="text" name="kg" v-model="kg">
                            </div>
                        </div>
                        <button 
                            class="cta cta-secondary"
                            @click=addSet(0)
                        >ADD SET</button>
                    </div>
                </div>

                <hr>
            </div>
            <div
                v-for="(set, j, loop) in exerciseObj.Sets" :key="set.id"
                class="w-100 sets-container"
            >
                <div class="sets-count">
                    <span class="date">{{ 
                        Object.keys(exerciseObj.Sets)[loop] === helpers.getTodayDate() ? 'Today' : Object.keys(exerciseObj.Sets)[loop]
                    }}</span>
                    <div class="sets-header">
                        <div>SETS</div>
                        <div>REPS</div>
                        <div>KG</div>
                    </div>

                    <div class="sets-info">
                        <div 
                            v-for="(s, index) in set" :key="s.id"
                            class="set-row"
                        >
                            <div>{{ index + 1 }}</div>
                            <div>{{ s.reps }}</div>
                            <div>{{ s.kg }}</div>
                        </div>
                   
                        <div class="set-row set-form" v-if="helpers.getTodayDate() === Object.keys(exerciseObj.Sets)[loop]">
                            <div>{{ set.length + 1 }}</div>
                            <div>
                                <input type="text" name="reps" v-model="reps">
                            </div>
                            <div>
                                <input type="text" name="kg" v-model="kg">
                            </div>
                        </div>
                        <button 
                            v-if="helpers.getTodayDate() === Object.keys(exerciseObj.Sets)[loop]"
                            class="cta cta-secondary"
                            @click=addSet(set.length)
                        >ADD SET</button>
                    </div>
                </div>

                <hr>
            </div>
        </div>
    </div>
</template>

<script setup>
import helpers from '@/helpers/global';
import exercises from '@/api/exercises';
import sets from '@/api/sets';
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconBack from '@/components/icons/IconBack.vue';


const router = useRouter();
const route = useRoute();

const exerciseId = route.params.id;
const workoutId = route.params.wid;

function goBack(){
    router.go(-1);
}

let exerciseObj = ref({});
async function getExercise(){
    try {
        const ex = await exercises.httpGetExercise(exerciseId);
        if(ex) exerciseObj.value = ex;
        
        return ex;
    } catch (error) {
        console.log(error.message);
    }
}

let reps = ref(0);
let kg = ref(0);
async function addSet(setNumber){

    // find the right workouts_exercises
    let associationId = exerciseObj.value.Workouts_Exercises.find(we => we.workout_id == workoutId);
    
    let reqObj = {
        set_number: setNumber + 1,
        reps: parseInt(reps.value),
        kg: parseInt(kg.value),
        workout_exercise_id: associationId.id
    }

    try {
        const setAdded = await sets.httpPostSet(reqObj);
        if(setAdded) await getExercise();

        // Clear the form
        reps.value = 0;
        kg.value = 0;
    } catch (error) {
        console.log(error.message);
    }
    
}

function latestDateisToday(){
    if(exerciseObj.value && exerciseObj.value?.Sets && Object.keys(exerciseObj.value?.Sets).length > 0 ){
        for( const key of  Object.keys(exerciseObj.value.Sets) ){
            if(key === helpers.getTodayDate()) return true;
        }
    }else{
        return false;
    }
}

onBeforeMount(async () => {
    await getExercise();
})



 
</script>