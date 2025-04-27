import axiosInstance from './index'

const API_V = import.meta.env.VITE_API_VERSION;
const API_URL = '/' + API_V + '/sets' 

async function httpPostSet(reqBody) {

    const { set_number, reps, kg, workout_exercise_id} = reqBody

    try {
        const { data } = await axiosInstance.post(
            API_URL, 
            {
                description: `Set added ${set_number}`,
                set_number: set_number,
                reps: reps,
                kg: kg,
                workout_exercise_id: workout_exercise_id
            },
            {
                withCredentials: true
            }
        ); 

        if(data.success) return data.data;
        else return false;

    } catch (error) {
        console.error(error.message);
    }
}

export default { httpPostSet }