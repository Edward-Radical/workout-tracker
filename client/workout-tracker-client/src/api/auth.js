import axiosInstance from './index'

async function login(userDataObj) {
    const {email, password} = userDataObj;

    try {
        const { data } = await axiosInstance.post('/auth/login', {
            // email: "parisi.arianna@test.it",
            // password: "Arianna14!"
            email: email,
            password: password
            }, {
                withCredentials: true
            }
        );  
        return data;

    } catch (error) {
        return error.response.data;
    } 
}

async function socialLogin() {
    var URL = import.meta.VITE_API_BASE_URL;
    window.location.replace(`${URL}/auth/google`);
}

async function register(userDataObj) {
    const {username, email, password} = userDataObj;

    try {
        const { data } = await axiosInstance.post('/auth/register', {
            // email: "parisi.arianna@test.it",
            // password: "Arianna14!"
            username: username,
            email: email,
            password: password
            }, {
                withCredentials: true
            }
        );  
        return data;

    } catch (error) {
        return error.response.data;
    } 
}

async function logout() {
    const { data } = await axiosInstance.get('/auth/logout');  
    console.log(data);
    
    return data.success;
}

export default { login, socialLogin, register, logout } 