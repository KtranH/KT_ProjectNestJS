<template>
  <div class="register-page">
    <RegisterLayout 
      :current-step="currentStep"
      :loading="loading"
      :errors="errors"
      :countdown="countdown"
      @register="handleRegister"
      @verification="handleVerification"
      @resend-code="handleResendCode"
      @go-back="handleGoBack"
      @update-form-data="handleUpdateFormData"
    />
    
    <!-- Thông báo thành công -->
    <Notification
      :show="showSuccessMessage"
      type="success"
      title="Đăng ký thành công!"
      message="Chuyển hướng đến dashboard..."
      @close="closeSuccessMessage"
    />
    
    <!-- Thông báo lỗi -->
    <Notification
      :show="showErrorMessage"
      type="error"
      title="Đăng ký thất bại"
      :message="errorMessage"
      @close="closeErrorMessage"
    />
  </div>
</template>

<script setup>
import RegisterLayout from '@/components/layout/RegisterLayout.vue'
import Notification from '@/components/ui/Notification.vue'
import { useRegister } from '@/composables/useRegister'

// Sử dụng useRegister composable
const {
  currentStep,
  loading,
  countdown,
  errors,
  showSuccessMessage,
  showErrorMessage,
  errorMessage,
  handleRegister,
  handleVerification,
  handleResendCode,
  handleGoBack,
  handleUpdateFormData,
  closeSuccessMessage,
  closeErrorMessage
} = useRegister()
</script>

<style scoped>
.register-page {
  min-height: 100vh;
}
</style> 