import { api } from './config.js';

export const authAPI = {
    // Hàm đăng nhập
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.access_token) {
                // Tính thời gian hết hạn (1 ngày từ bây giờ)
                const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // 24 giờ
                
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('auth_expiration', expirationTime.toString());
            }
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    },
    
    // Hàm đăng ký
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Register error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
        }
    },

    // Hàm gửi mã xác thực email
    sendVerificationCode: async (email) => {
        try {
            const response = await api.post('/auth/send-verification', { email });
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Send verification error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Gửi mã xác thực thất bại');
        }
    },

    // Hàm gửi lại mã xác thực
    resendVerificationCode: async (email) => {
        try {
            const response = await api.post('/auth/resend-verification', { email });
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Resend verification error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Gửi lại mã xác thực thất bại');
        }
    },

    // Hàm đăng ký với xác thực email
    registerWithVerification: async (userData) => {
        try {
            const response = await api.post('/auth/register-with-verification', userData);
            if (response.data.access_token) {
                // Tính thời gian hết hạn (1 ngày từ bây giờ)
                const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // 24 giờ
                
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('auth_expiration', expirationTime.toString());
            }
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Register with verification error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Đăng ký với xác thực thất bại');
        }
    },
    
    // Hàm đăng xuất
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('auth_expiration');
    },
    
    // Hàm lấy thông tin profile
    getProfile: async () => {
        return await api.get('/auth/profile');
    },
    
    // Hàm kiểm tra xác thực
    isAuthenticated: () => {
        const token = localStorage.getItem('access_token');
        const expiration = localStorage.getItem('auth_expiration');
        
        if (!token || !expiration) {
            return false;
        }
        
        // Kiểm tra xem token đã hết hạn chưa
        const currentTime = Date.now();
        const expirationTime = parseInt(expiration);
        
        if (currentTime > expirationTime) {
            // Token đã hết hạn, xóa hết
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('auth_expiration');
            return false;
        }
        
        return true;
    },
    
    // Hàm lấy user hiện tại
    getCurrentUser: () => {
        // Kiểm tra xác thực trước khi trả về user
        if (!authAPI.isAuthenticated()) {
            return null;
        }
        
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    // Hàm lấy thời gian hết hạn
    getExpirationTime: () => {
        const expiration = localStorage.getItem('auth_expiration');
        return expiration ? parseInt(expiration) : null;
    },
    
    // Hàm kiểm tra còn bao lâu hết hạn (tính bằng phút)
    getTimeUntilExpiration: () => {
        const expiration = authAPI.getExpirationTime();
        if (!expiration) return 0;
        
        const currentTime = Date.now();
        const timeLeft = expiration - currentTime;
        
        return Math.max(0, Math.floor(timeLeft / (1000 * 60))); // Trả về số phút
    }
};
