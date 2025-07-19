<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Background Image/Pattern -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden">
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
            Tham gia cùng chúng tôi
          </h1>
          <p class="text-xl text-green-100 mb-8 leading-relaxed">
            Tạo tài khoản để trải nghiệm hệ thống quản lý tác vụ hiện đại. 
            Bắt đầu hành trình tổ chức công việc hiệu quả của bạn ngay hôm nay.
          </p>
          
          <!-- Feature List -->
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <span class="text-green-100">Tạo và quản lý nhóm</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <span class="text-green-100">Tổ chức tác vụ thông minh</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span class="text-green-100">Tăng năng suất</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <span class="text-green-100">An toàn & bảo mật</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Register Form -->
    <div class="flex-1 mt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Đã có tài khoản?
            <router-link to="/login" class="font-medium text-green-600 hover:text-green-500 transition-colors">
              đăng nhập ngay
            </router-link>
          </p>
        </div>

        <!-- Register Form -->
        <slot></slot>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-xs text-gray-500">
            Bằng cách đăng ký, bạn đồng ý với
            <a href="#" class="text-green-600 hover:text-green-500">Điều khoản sử dụng</a>
            và
            <a href="#" class="text-green-600 hover:text-green-500">Chính sách bảo mật</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component này chỉ là layout, không cần logic phức tạp
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