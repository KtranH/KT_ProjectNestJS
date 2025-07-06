import axios from 'axios';

export const API_URL = 'http://localhost:3000/api';

//RESTfull API
export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

