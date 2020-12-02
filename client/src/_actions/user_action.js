import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type : LOGIN_USER,
        payload : request
        // return 시켜서 Reducer로 보낸다.
        // next state를 만들기 위해.
    }
        // 만들어 놓은 백엔드에 보낸다.
        // 백엔드의 index.js에서는 email와 password 맞는지 확인하고
        // 토큰 생성해서 쿠키에 저장하고 클라이언트에 응답을 보낸다.

}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }    
}

export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }    
}



