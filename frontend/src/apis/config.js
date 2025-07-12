import axios from 'axios';

export const API_URL = 'http://localhost:3000/api';

// RESTfull API
export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Hàm lấy token từ localStorage
function getToken() {
    return localStorage.getItem('access_token');
}

// Hàm lấy CSRF token từ cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

// Thêm interceptor để tự động gửi JWT token vào header
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    config.withCredentials = true;
    return config;
});

// Thêm interceptor để xử lý response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token hết hạn hoặc không hợp lệ
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


