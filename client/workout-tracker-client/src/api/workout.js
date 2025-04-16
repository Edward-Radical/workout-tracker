import axiosInstance from './index'

async function httpPostWorkout(reqBody) {

    try {
        const { data } = await axiosInstance.post(
            '/v1/workouts',
            {reqBody},
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

export default { httpPostWorkout }