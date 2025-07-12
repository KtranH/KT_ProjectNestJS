import { useAuthStore } from '../stores/modules/auth.js'

export function useAuth() {
  const authStore = useAuthStore();

  // Hàm khởi tạo xác thực
  const initializeAuth = async () => {
    await authStore.checkAuth();
  };

  // Hàm trả về các thông tin xác thực
  return {
    user: authStore.getUser,
    isAuthenticated: authStore.getIsAuthenticated,
    loading: authStore.getLoading,
    error: authStore.getError,
    // Hàm đăng nhập
    login: authStore.login,
    // Hàm đăng xuất
    logout: authStore.logout,
    // Hàm clear error
    clearError: authStore.clearError,
    // Hàm khởi tạo xác thực
    initializeAuth,
  };
}