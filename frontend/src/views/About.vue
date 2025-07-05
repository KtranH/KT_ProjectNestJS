<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Hero Section -->
    <section class="relative w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-yellow-400/20 rounded-full blur-lg"></div>
        <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Về chúng tôi
        </h1>
        <p class="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
          Khám phá công nghệ và triết lý đằng sau ứng dụng NestJS + Vue.js này
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="w-full py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Project Overview -->
        <div class="max-w-4xl mx-auto mb-16">
          <div class="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-200">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div class="flex-1 text-center lg:text-left">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Dự án Demo Full-Stack</h2>
                <p class="text-lg text-gray-600 leading-relaxed">
                  Đây là một ứng dụng demo showcasing sự kết hợp mạnh mẽ giữa NestJS (backend) và Vue.js (frontend). 
                  Dự án được thiết kế để minh họa các best practices trong phát triển ứng dụng web hiện đại, 
                  từ kiến trúc API RESTful đến giao diện người dùng responsive.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="max-w-6xl mx-auto mb-16">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
            Công nghệ sử dụng
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- NestJS -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 16.171c-.063.106-.134.207-.21.302-.076.095-.158.185-.242.268-.084.083-.173.16-.267.232-.094.071-.193.136-.297.194-.104.058-.212.109-.325.152-.113.043-.23.078-.35.105-.12.027-.243.046-.368.057-.125.011-.252.016-.381.016-.129 0-.256-.005-.381-.016-.125-.011-.248-.03-.368-.057-.12-.027-.237-.062-.35-.105-.113-.043-.221-.094-.325-.152-.104-.058-.203-.123-.297-.194-.094-.072-.183-.149-.267-.232-.084-.083-.166-.173-.242-.268-.076-.095-.147-.196-.21-.302-.063-.106-.119-.217-.167-.332-.048-.115-.088-.234-.12-.357-.032-.123-.056-.249-.072-.378-.016-.129-.024-.26-.024-.393s.008-.264.024-.393c.016-.129.04-.255.072-.378.032-.123.072-.242.12-.357.048-.115.104-.226.167-.332.063-.106.134-.207.21-.302.076-.095.158-.185.242-.268.084-.083.173-.16.267-.232.094-.071.193-.136.297-.194.104-.058.212-.109.325-.152.113-.043.23-.078.35-.105.12-.027.243-.046.368-.057.125-.011.252-.016.381-.016.129 0 .256.005.381.016.125.011.248.03.368.057.12.027.237.062.35.105.113.043.221.094.325.152.104.058.203.123.297.194.094.072.183.149.267.232.084.083.166.173.242.268.076.095.147.196.21.302.063.106.119.217.167.332.048.115.088.234.12.357.032.123.056.249.072.378.016.129.024.26.024.393s-.008.264-.024.393c-.016.129-.04.255-.072.378-.032.123-.072.242-.12.357-.048.115-.104.226-.167.332z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">NestJS</h3>
              <p class="text-gray-600 mb-4">
                Framework Node.js mạnh mẽ cho việc xây dựng API scalable và maintainable với TypeScript.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Dependency Injection</li>
                <li>• Modular Architecture</li>
                <li>• Built-in TypeScript</li>
                <li>• Powerful CLI</li>
              </ul>
            </div>

            <!-- Vue.js -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l12 7-12 7-12-7 12-7zm0 14l-12-7 12-7 12 7-12 7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Vue.js 3</h3>
              <p class="text-gray-600 mb-4">
                Progressive JavaScript framework với Composition API và reactive system hiện đại.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Composition API</li>
                <li>• Reactive System</li>
                <li>• Component-based</li>
                <li>• Vue Router & Pinia</li>
              </ul>
            </div>

            <!-- TailwindCSS -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">TailwindCSS</h3>
              <p class="text-gray-600 mb-4">
                Utility-first CSS framework cho việc tạo ra giao diện đẹp mắt và responsive nhanh chóng.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Utility-first</li>
                <li>• Responsive Design</li>
                <li>• Customizable</li>
                <li>• Performance Optimized</li>
              </ul>
            </div>

            <!-- TypeScript -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">TypeScript</h3>
              <p class="text-gray-600 mb-4">
                Superset của JavaScript với static typing giúp code an toàn và dễ maintain hơn.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Static Typing</li>
                <li>• Better IDE Support</li>
                <li>• Early Error Detection</li>
                <li>• Enhanced Refactoring</li>
              </ul>
            </div>

            <!-- Vite -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355L8.069 15.74a.306.306 0 0 1-.31-.49l.527-4.672Z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Vite</h3>
              <p class="text-gray-600 mb-4">
                Build tool siêu nhanh với Hot Module Replacement và optimized bundling.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Lightning Fast HMR</li>
                <li>• Optimized Build</li>
                <li>• Plugin Ecosystem</li>
                <li>• ES Modules Support</li>
              </ul>
            </div>

            <!-- Docker -->
            <div class="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.981-.06 2.958-.179a12.968 12.968 0 003.657-1.055 9.208 9.208 0 002.846-2.156 8.567 8.567 0 001.754-2.872h.146c.542 0 1.08-.06 1.608-.179.526-.12 1.037-.297 1.52-.53.473-.226.915-.503 1.31-.825.385-.314.733-.668 1.029-1.054l.17-.22-.097-.196c-.12-.252-.25-.49-.393-.717a.707.707 0 00-.023-.036z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Docker</h3>
              <p class="text-gray-600 mb-4">
                Containerization platform giúp deploy và scale ứng dụng một cách nhất quán.
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Consistent Environment</li>
                <li>• Easy Deployment</li>
                <li>• Scalability</li>
                <li>• Isolation</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="max-w-4xl mx-auto mb-16">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
            Tính năng nổi bật
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">API RESTful</h3>
              <p class="text-gray-600">Endpoints được thiết kế theo chuẩn REST với documentation đầy đủ</p>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p class="text-gray-600">Giao diện thích ứng hoàn hảo trên mọi thiết bị từ mobile đến desktop</p>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Type Safety</h3>
              <p class="text-gray-600">TypeScript đảm bảo type safety từ frontend đến backend</p>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
              <p class="text-gray-600">Tối ưu hóa hiệu suất với lazy loading, code splitting và caching</p>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="max-w-2xl mx-auto text-center">
          <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Liên hệ & Đóng góp
            </h2>
            <p class="text-gray-600 mb-6">
              Dự án này được phát triển với mục đích học tập và chia sẻ kiến thức. 
              Mọi đóng góp và phản hồi đều được chào đón!
            </p>
            <div class="flex justify-center space-x-4">
              <a href="#" class="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <router-link 
                to="/test-api"
                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Test API
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Về chúng tôi - NestJS + Vue'
})
</script> 