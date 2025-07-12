import { api } from './config.js';

export const authAPI = {
    // Hàm đăng nhập
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    },
    
    // Hàm đăng xuất
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    },
    
    // Hàm lấy thông tin profile
    getProfile: async () => {
        return await api.get('/auth/profile');
    },
    
    // Hàm kiểm tra xác thực
    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    },
    
    // Hàm lấy user hiện tại
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
