import axios from 'axios';
// import jwt_decode from 'jwt-decode';

import {jwtDecode} from 'jwt-decode';
// axios.defaults.baseURL = 'https://mernloginbackend.azurewebsites.net:443';


// let isLocal = window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
// let isSlow = window.location.href.includes('profilepro-slow')
// let isFast = window.location.href.includes('profilepro-fast')

// if(isLocal){
//     console.log('running on local')
//     axios.defaults.baseURL = 'http://localhost:4589'
// }
// else if(isSlow){
//     console.log('running on slow ring')
//     axios.defaults.baseURL = 'https://profileprobackend-slow.azurewebsites.net:443'
// }
// else if(isFast){
//     console.log('running on fast ring')
//     axios.defaults.baseURL = 'https://profileprobackend-fast.azurewebsites.net:443'
// }
// else{
//     console.log('running on production')
//     axios.defaults.baseURL = 'https://profileprobackend.azurewebsites.net:443'
// }


let isLocal = window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
let isSlow = window.location.href.includes('crowdhawk')
// let isFast = window.location.href.includes('accespassweb-primary')

if(isLocal){
    console.log('running on local')
    axios.defaults.baseURL = 'http://localhost:5173'
}
else if(isSlow){
    console.log('running on slow ring')
    axios.defaults.baseURL = 'https://accespasswebbackend-canary.azurewebsites.net:443'
}
// else if(isFast){
//     console.log('running on fast ring')
//     axios.defaults.baseURL = 'https://accespasswebbackend-primary.azurewebsites.net:443'
// }
// else{
//     console.log('running on production')
//     axios.defaults.baseURL = 'https://accespasswebbackend-prod.azurewebsites.net:443'
// }


//axios.defaults.baseURL = 'http://locahost:4589';



/** Make API Requests */


/** To get username from Token */




export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        console.log(response)
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function saveVideo(response){
    try {
        console.log(response)
        const token = await localStorage.getItem('token');
        const data = await axios.post('/api/savevideo', response,{headers: {"Authorization" : `Bearer ${token}`}});
        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function getAllVideos(){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.get('/api/returnallvideos',{headers: {"Authorization" : `Bearer ${token}`}});
        return Promise.resolve({ data})
    } catch (error) {
        return Promise.reject({error})
    }
}


