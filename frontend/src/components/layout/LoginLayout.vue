<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Background Image/Pattern -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div class="absolute bottom-20 left-20 w-28 h-28 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-40 right-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse-slow"></div>
      </div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 flex flex-col justify-center px-12 text-white">
        <div class="max-w-md">
          <h1 class="text-4xl font-bold mb-6">
            Chào mừng trở lại
          </h1>
          <p class="text-xl text-blue-100 mb-8 leading-relaxed">
            Đăng nhập để truy cập vào hệ thống quản lý tác vụ hiện đại của chúng tôi. 
            Trải nghiệm giao diện đẹp mắt và tính năng mạnh mẽ.
          </p>
          
          <!-- Feature List -->
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-blue-100">Quản lý tác vụ hiệu quả</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-blue-100">Giao diện responsive</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-blue-100">Bảo mật cao cấp</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-blue-100">Đồng bộ real-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">
            Đăng nhập
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Hoặc
            <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              đăng ký tài khoản mới
            </router-link>
          </p>
        </div>

        <!-- Login Form -->
        <slot></slot>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-xs text-gray-500">
            Bằng cách đăng nhập, bạn đồng ý với
            <a href="#" class="text-blue-600 hover:text-blue-500">Điều khoản sử dụng</a>
            và
            <a href="#" class="text-blue-600 hover:text-blue-500">Chính sách bảo mật</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style> 