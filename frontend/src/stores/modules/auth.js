import { defineStore } from 'pinia'
import { authAPI } from '../../apis/auth.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getExpirationTime: () => authAPI.getExpirationTime(),
    getTimeUntilExpiration: () => authAPI.getTimeUntilExpiration()
  },
  
  actions: {
    // Hàm đăng nhập
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const result = await authAPI.login(credentials);
        if (result.success) {
          this.user = result.data.user;
          this.token = result.data.access_token;
          this.isAuthenticated = true;
          return { success: true, data: result.data };
        }
        return result;
      } catch (error) {
        this.error = error.message || 'Đăng nhập thất bại';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Hàm đăng ký với xác thực
    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        const result = await authAPI.registerWithVerification(userData);
        if (result.success && result.data.access_token) {
          this.user = result.data.user;
          this.token = result.data.access_token;
          this.isAuthenticated = true;
          return { success: true, data: result.data };
        }
        return result;
      } catch (error) {
        this.error = error.message || 'Đăng ký thất bại';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Hàm đăng xuất
    async logout() {
      authAPI.logout();
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      this.error = null;
    },
    
    // Hàm kiểm tra xác thực
    async checkAuth() {
      if (authAPI.isAuthenticated()) {
        try {
          const user = authAPI.getCurrentUser();
          if (user) {
            this.user = user;
            this.isAuthenticated = true;
            this.token = localStorage.getItem('access_token');
          } else {
            // User không tồn tại hoặc token đã hết hạn
            this.logout();
          }
        } catch (error) {
          this.logout();
        }
      } else {
        // Token đã hết hạn hoặc không tồn tại
        this.logout();
      }
    },
    
    // Hàm set user
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    
    // Hàm set token
    setToken(token) {
      this.token = token;
    },
    
    // Hàm clear error
    clearError() {
      this.error = null;
    }
  }
}) 