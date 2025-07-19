<template>
  <div class="login-page">
    <LoginLayout>
      <LoginForm @submit="handleLogin" />
    </LoginLayout>
    
    <!-- Success Notification -->
    <Notification
      :show="showSuccessMessage"
      type="success"
      title="Đăng nhập thành công!"
      message="Chuyển hướng đến trang chủ..."
      @close="showSuccessMessage = false"
    />
    
    <!-- Error Notification -->
    <Notification
      :show="showErrorMessage"
      type="error"
      title="Đăng nhập thất bại"
      :message="errorMessage"
      @close="showErrorMessage = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import LoginLayout from '@/components/layout/LoginLayout.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import Notification from '@/components/ui/Notification.vue'

const { login } = useAuth()
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('')

const handleLogin = async (loginData) => {
  try {
    console.log('Login data:', loginData)
    
    const result = await login(loginData)
    
    if (result && result.success) {
      showSuccessMessage.value = true
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
    } else {
      // Nếu không thành công nhưng không có lỗi
      showErrorMessage.value = true
      errorMessage.value = 'Đăng nhập thất bại. Vui lòng thử lại.'
    }
  } catch (error) {
    console.error('Login error:', error)
    showErrorMessage.value = true
    errorMessage.value = error.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
  }
}
</script>

<style scoped>
/* Custom styles for the login page */
</style> 