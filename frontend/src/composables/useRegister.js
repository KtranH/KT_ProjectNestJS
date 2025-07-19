import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { authAPI } from '@/apis/auth.js'

export const useRegister = () => {
  const router = useRouter()
  const { register } = useAuth()

  // Reactive data
  const currentStep = ref('register') // 'register' | 'verification'
  const loading = ref(false)
  const countdown = ref(0)
  const errors = ref({})
  const showSuccessMessage = ref(false)
  const showErrorMessage = ref(false)
  const errorMessage = ref('')

  const formData = reactive({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Validation
  const validateRegisterForm = () => {
    errors.value = {}
    
    if (!formData.fullName.trim()) {
      errors.value.fullName = 'Họ tên không được để trống'
    }
    
    if (!formData.username.trim()) {
      errors.value.username = 'Tên đăng nhập không được để trống'
    } else if (formData.username.length < 3) {
      errors.value.username = 'Tên đăng nhập phải có ít nhất 3 ký tự'
    }
    
    if (!formData.email) {
      errors.value.email = 'Email không được để trống'
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(formData.email)) {
        errors.value.email = 'Email không hợp lệ'
      }
    }
    
    if (!formData.password) {
      errors.value.password = 'Mật khẩu không được để trống'
    } else if (formData.password.length < 6) {
      errors.value.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    if (!formData.confirmPassword) {
      errors.value.confirmPassword = 'Xác nhận mật khẩu không được để trống'
    } else if (formData.password !== formData.confirmPassword) {
      errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }
    
    return Object.keys(errors.value).length === 0
  }

  const validateVerificationCode = (verificationCode) => {
    errors.value = {}
    
    if (!verificationCode) {
      errors.value.verificationCode = 'Mã xác thực không được để trống'
      return false
    }
    
    if (!/^\d{6}$/.test(verificationCode)) {
      errors.value.verificationCode = 'Mã xác thực phải là 6 số'
      return false
    }
    
    return true
  }

  // Event handlers
  const handleRegister = async (data) => {
    // Update formData from child component
    Object.assign(formData, data)
    
    if (!validateRegisterForm()) return
    
    loading.value = true
    try {
      // Gửi mã xác thực email
      await authAPI.sendVerificationCode(formData.email)
      
      // Chuyển sang bước xác thực
      currentStep.value = 'verification'
      startCountdown()
      
    } catch (error) {
      errors.value.email = error.message
    } finally {
      loading.value = false
    }
  }

  const handleVerification = async (data) => {
    if (!validateVerificationCode(data.verificationCode)) return
    
    loading.value = true
    try {
      // Gọi API đăng ký với xác thực
      const userData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email,
        password: formData.password,
        verificationCode: data.verificationCode
      }
      
      // Debug log
      console.log('Sending registration data:', userData)
      
      const result = await register(userData)
      
      if (result && result.success) {
        showSuccessMessage.value = true
        // Chuyển hướng đến dashboard sau 2 giây
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
      
    } catch (error) {
      console.error('Registration error details:', error)
      
      if (error.message.includes('Mã xác thực')) {
        errors.value.verificationCode = error.message
      } else if (error.message.includes('Tên đăng nhập')) {
        errors.value.username = error.message
        currentStep.value = 'register' // Quay lại form đăng ký
      } else {
        errors.value.verificationCode = error.message
      }
      
      // Hiển thị thông báo lỗi
      errorMessage.value = error.message
      showErrorMessage.value = true
    } finally {
      loading.value = false
    }
  }

  const handleResendCode = async (email) => {
    loading.value = true
    try {
      await authAPI.resendVerificationCode(email)
      startCountdown()
    } catch (error) {
      errors.value.verificationCode = error.message
      errorMessage.value = error.message
      showErrorMessage.value = true
    } finally {
      loading.value = false
    }
  }

  const handleGoBack = () => {
    currentStep.value = 'register'
    errors.value = {}
  }

  const handleUpdateFormData = (data) => {
    Object.assign(formData, data)
  }

  const startCountdown = () => {
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const closeSuccessMessage = () => {
    showSuccessMessage.value = false
  }

  const closeErrorMessage = () => {
    showErrorMessage.value = false
  }

  return {
    // State
    currentStep,
    loading,
    countdown,
    errors,
    formData,
    showSuccessMessage,
    showErrorMessage,
    errorMessage,
    
    // Methods
    handleRegister,
    handleVerification,
    handleResendCode,
    handleGoBack,
    handleUpdateFormData,
    closeSuccessMessage,
    closeErrorMessage
  }
}