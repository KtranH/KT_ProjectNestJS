<template>
  <div class="register-page">
    <RegisterLayout>
      <RegisterForm @submit="handleRegister" />
    </RegisterLayout>
    
    <!-- Success Notification -->
    <Notification
      :show="showSuccessMessage"
      type="success"
      title="Đăng ký thành công!"
      message="Chuyển hướng đến trang đăng nhập..."
      @close="showSuccessMessage = false"
    />
    
    <!-- Error Notification -->
    <Notification
      :show="showErrorMessage"
      type="error"
      title="Đăng ký thất bại"
      :message="errorMessage"
      @close="showErrorMessage = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import RegisterLayout from '@/components/layout/RegisterLayout.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
import Notification from '@/components/ui/Notification.vue'

const router = useRouter()
const { register } = useAuth()
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('')

const handleRegister = async (registerData) => {
  try {
    console.log('Register data:', registerData)
    
    const result = await register(registerData)
    
    if (result && result.success) {
      showSuccessMessage.value = true
      
      // Redirect to login after successful registration
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      // Nếu không thành công nhưng không có lỗi
      showErrorMessage.value = true
      errorMessage.value = 'Đăng ký thất bại. Vui lòng thử lại.'
    }
  } catch (error) {
    console.error('Register error:', error)
    showErrorMessage.value = true
    errorMessage.value = error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
  }
}
</script>

<style scoped>
/* Custom styles for the register page */
</style> 