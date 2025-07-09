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

// Hàm lấy CSRF token từ cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

// Thêm interceptor để tự động gửi CSRF token vào header
api.interceptors.request.use((config) => {
    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    config.withCredentials = true;
    return config;
});

