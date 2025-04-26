import axiosInstance from './index'

const API_V = import.meta.env.VITE_API_VERSION;
const API_URL = '/' + API_V + '/workouts' 

async function httpGetWorkouts(dateFilter) {

    let url = dateFilter ? API_URL + '?date=' + dateFilter : API_URL;
    try {
        const { data } = await axiosInstance.get(
            url,
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
async function httpGetWorkout(id) {

    try {
        const { data } = await axiosInstance.get(
            API_URL + '/' + id,
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
async function httpPostWorkout(reqBody) {

    const { name, description, schedule, rep_days, user_id, notes, exercises_list} = reqBody
    try {
        const { data } = await axiosInstance.post(
            API_URL,
            {
                name: name,
                description: description,
                schedule: schedule,
                rep_days: rep_days,
                user_id: user_id,
                notes: notes,
                exercises_list: exercises_list
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

async function httpPatchWorkout(reqBody, id) {

    const { name, description, schedule, rep_days, user_id, notes, exercises_list} = reqBody;
    
    try {
        const { data } = await axiosInstance.patch(
            API_URL + '/' + id,
            {
                name: name,
                description: description,
                schedule: schedule,
                rep_days: rep_days,
                user_id: user_id,
                notes: notes,
                exercises_list: exercises_list
            },
            {
                withCredentials: true
            }
        ); 

        if(data.success) return data;
        else return false;

    } catch (error) {
        console.error(error.message);
    }
}

export default { httpPostWorkout, httpGetWorkouts, httpGetWorkout, httpPatchWorkout }