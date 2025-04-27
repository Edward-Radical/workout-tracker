import axiosInstance from './index'

const API_V = import.meta.env.VITE_API_VERSION;
const API_URL = '/' + API_V + '/exercises' 

async function httpGetExercises() {

    try {
        const { data } = await axiosInstance.get(
            API_URL, 
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
async function httpGetExercise(id) {

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

export default { httpGetExercises, httpGetExercise }