import { jwtDecode } from 'jwt-decode';

function arrRemove(array, item) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }

    return array;
}

function formatToDDMMYYYY(isoString){
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');       // dd
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mm
    const year = date.getFullYear();                            // yyyy

    return `${day}/${month}/${year}`;
}

function getTodayDate(){
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');       // dd
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mm
    const year = date.getFullYear();                            // yyyy

    return `${year}-${month}-${day}`;
}

function tokenIsExpired(){

    const token = document.cookie;
    if(token){
        const decoded = jwtDecode(token);
        const exp = new Date(decoded.exp * 1000);
        const now = new Date();
    
        if(exp <  now) return true;
        return false;
    }
    return true;
}


export default { arrRemove, formatToDDMMYYYY, getTodayDate, tokenIsExpired } 