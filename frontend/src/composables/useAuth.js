import { useAuthStore } from '../stores/modules/auth.js'
import { computed } from 'vue'

export function useAuth() {
  const authStore = useAuthStore();

  // Hàm khởi tạo xác thực
  const initializeAuth = async () => {
    await authStore.checkAuth();
  };

  // Hàm trả về các thông tin xác thực
  return {
    user: computed(() => authStore.getUser),
    isAuthenticated: computed(() => authStore.getIsAuthenticated),
    loading: computed(() => authStore.getLoading),
    error: computed(() => authStore.getError),
    expirationTime: computed(() => authStore.getExpirationTime),
    timeUntilExpiration: computed(() => authStore.getTimeUntilExpiration),
    // Hàm đăng nhập
    login: authStore.login,
    // Hàm đăng ký
    register: authStore.register,
    // Hàm đăng xuất
    logout: authStore.logout,
    // Hàm clear error
    clearError: authStore.clearError,
    // Hàm khởi tạo xác thực
    initializeAuth,
  };

}