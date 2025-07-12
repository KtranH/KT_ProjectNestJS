import { useAuthStore } from '../../stores/modules/auth.js'

export function requireAuth(to, from, next) {
  // Kiểm tra token trong localStorage trực tiếp
  const token = localStorage.getItem('access_token')
  const user = localStorage.getItem('user')
  
  if (!token || !user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    next('/login')
  } else {
    // Nếu đã đăng nhập, cho phép truy cập
    next()
  }
}

export function requireGuest(to, from, next) {
  // Kiểm tra token trong localStorage trực tiếp
  const token = localStorage.getItem('access_token')
  const user = localStorage.getItem('user')
  
  if (token && user) {
    // Nếu đã đăng nhập, chuyển hướng đến dashboard
    next('/dashboard')
  } else {
    // Nếu chưa đăng nhập, cho phép truy cập
    next()
  }
} 