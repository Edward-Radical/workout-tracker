import axiosInstance from './index'

async function httpGetExercises() {

    try {
        const { data } = await axiosInstance.get('/v1/exercises', {
                withCredentials: true
            }
        ); 

        if(data.success) return data.data;
        else return false;

    } catch (error) {
        console.error(error.message);
    }
    

}

export default { httpGetExercises }