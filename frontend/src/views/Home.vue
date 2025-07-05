<template>
  <div class="w-full font-sans">
    <!-- Hero Section -->
    <section class="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-700 to-purple-800">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-700 to-purple-800"></div>
      </div>

      <!-- Animated Background Elements -->
      <div class="absolute top-10 left-20 w-24 h-24 bg-blue-400/20 rounded-full animate-pulse-slow"></div>
      <div class="absolute top-60 right-16 w-20 h-20 bg-purple-400/20 rounded-full animate-bounce-slow"></div>
      <div class="absolute bottom-16 left-40 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse-slow"></div>
      <div class="absolute bottom-40 right-24 w-28 h-28 bg-indigo-400/20 rounded-full animate-bounce-slow"></div>

      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="flex flex-col items-center text-center space-y-12">
          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight animate-fade-in">
            Xây dựng ứng dụng
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
              Full-Stack
            </span>
          </h1>
          <!-- Subtitle -->
          <p class="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl leading-relaxed animate-fade-in-up">
            Kết hợp NestJS mạnh mẽ ở backend và Vue.js mượt mà ở frontend, cùng TailwindCSS để tạo ra giao diện đẹp mắt và hiện đại.
          </p>
          <!-- CTA Buttons -->
          <div class="flex items-center justify-center">
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <router-link 
                to="/test-api"
                class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[200px] overflow-hidden"
              >
                <span class="relative text-white z-10 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Bắt đầu ngay
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </router-link>
              
              <router-link 
                to="/about"
                class="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[200px] overflow-hidden"
              >
                <span class="relative text-white z-10 flex items-center justify-center gap-2">
                  Tìm hiểu thêm
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </router-link>
            </div>
          </div>
          <!-- Tech Stack Icons -->
          <div class="flex flex-wrap justify-center items-center gap-6 lg:gap-10 mt-12">
            <div class="flex flex-col items-center group">
              <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 16.171c-.063.106-.134.207-.21.302-.076.095-.158.185-.242.268-.084.083-.173.16-.267.232-.094.071-.193.136-.297.194-.104.058-.212.109-.325.152-.113.043-.23.078-.35.105-.12.027-.243.046-.368.057-.125.011-.252.016-.381.016-.129 0-.256-.005-.381-.016-.125-.011-.248-.03-.368-.057-.12-.027-.237-.062-.35-.105-.113-.043-.221-.094-.325-.152-.104-.058-.203-.123-.297-.194-.094-.072-.183-.149-.267-.232-.084-.083-.166-.173-.242-.268-.076-.095-.147-.196-.21-.302-.063-.106-.119-.217-.167-.332-.048-.115-.088-.234-.12-.357-.032-.123-.056-.249-.072-.378-.016-.129-.024-.26-.024-.393s.008-.264.024-.393c.016-.129.04-.255.072-.378.032-.123.072-.242.12-.357.048-.115.104-.226.167-.332.063-.106.134-.207.21-.302.076-.095.158-.185.242-.268.084-.083.173-.16.267-.232.094-.071.193-.136.297-.194.104-.058.212-.109.325-.152.113-.043.23-.078.35-.105.12-.027.243-.046.368-.057.125-.011.252-.016.381-.016.129 0 .256.005.381.016.125.011.248.03.368.057.12.027.237.062.35.105.113.043.221.094.325.152.104.058.203.123.297.194.094.072.183.149.267.232.084.083.166.173.242.268.076.095.147.196.21.302.063.106.119.217.167.332.048.115.088.234.12.357.032.123.056.249.072.378.016.129.024.26.024.393s-.008.264-.024.393c-.016-.129-.04-.255-.072-.378-.032-.123-.072-.242-.12-.357-.048-.115-.104-.226-.167-.332z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-white/90">NestJS</span>
            </div>
            
            <div class="flex flex-col items-center group">
              <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l12 7-12 7-12-7 12-7zm0 14l-12-7 12-7 12 7-12 7z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-white/90">Vue.js 3</span>
            </div>
            
            <div class="flex flex-col items-center group">
              <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-white/90">TailwindCSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center flex flex-col justify-center items-center mb-12">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight animate-fade-in">
            Tại sao chọn stack công nghệ này?
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 max-w-full mx-auto leading-relaxed animate-fade-in-up">
            Sự kết hợp hoàn hảo giữa hiệu suất, khả năng mở rộng và trải nghiệm phát triển mượt mà.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Hiệu suất cao</h3>
            <p class="text-gray-600 leading-relaxed">
              NestJS cung cấp kiến trúc modular và TypeScript mạnh mẽ, trong khi Vue.js đảm bảo giao diện phản hồi nhanh và mượt mà.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Dễ phát triển</h3>
            <p class="text-gray-600 leading-relaxed">
              Cú pháp rõ ràng, tài liệu chi tiết và hệ sinh thái phong phú giúp phát triển nhanh chóng và thú vị.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Bảo mật cao</h3>
            <p class="text-gray-600 leading-relaxed">
              Tính năng bảo mật tích hợp như authentication, authorization và validation giúp bảo vệ ứng dụng toàn diện.
            </p>
          </div>
          
          <!-- Feature 4 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Khả năng mở rộng</h3>
            <p class="text-gray-600 leading-relaxed">
              Kiến trúc microservices của NestJS và component-based của Vue.js cho phép mở rộng linh hoạt.
            </p>
          </div>
          
          <!-- Feature 5 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Responsive Design</h3>
            <p class="text-gray-600 leading-relaxed">
              TailwindCSS cung cấp utility classes mạnh mẽ để tạo giao diện responsive hoàn hảo trên mọi thiết bị.
            </p>
          </div>
          
          <!-- Feature 6 -->
          <div class="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Testing & DevOps</h3>
            <p class="text-gray-600 leading-relaxed">
              Hỗ trợ testing tích hợp, CI/CD pipeline và deployment dễ dàng lên các platform cloud.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="w-full py-20 bg-gradient-to-br from-indigo-800 to-purple-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight animate-fade-in">
            Sẵn sàng bắt đầu dự án của bạn?
          </h2>
          <p class="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed animate-fade-in-up">
            Khám phá sức mạnh của stack công nghệ hiện đại này và tạo nên những ứng dụng đỉnh cao.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <router-link 
              to="/test-api"
              class="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
            >
              Test API ngay
            </router-link>
            
            <router-link 
              to="/about"
              class="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
            >
              Tìm hiểu thêm
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'NestJS + Vue - Full-Stack Application'
})
</script>

<style scoped>
/* Custom animations */
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.3); opacity: 0.4; }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-bounce-slow {
  animation: bounce-slow 5s ease-in-out infinite;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
  animation-delay: 0.2s;
}
</style>