<template>
  <div id="app" class="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation Bar -->
    <AppHeader />

    <!-- Main Content -->
    <main class="w-full min-h-screen">
      <router-view v-slot="{ Component, route }">
        <transition 
          :name="route.meta.transition || 'fade'" 
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useAuth } from './composables/useAuth.js'

const { initializeAuth } = useAuth()

onMounted(async () => {
  // Khởi tạo auth state khi app khởi động
  await initializeAuth()
})
</script>

<style>
/* CSS Reset và base styles */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* Đảm bảo container không bị overflow */
.container, .max-w-7xl {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* Fix cho mobile */
@media (max-width: 640px) {
  .container, .max-w-7xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 640px) {
  .container, .max-w-7xl {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container, .max-w-7xl {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container, .max-w-7xl {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container, .max-w-7xl {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container, .max-w-7xl {
    max-width: 1536px;
  }
}

/* Page Transition Effects */
/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide Left Transition */
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Slide Right Transition */
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide Up Transition */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  transform: translateY(30px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

/* Scale Transition */
.scale-enter-active, .scale-leave-active {
  transition: all 0.4s ease;
}
.scale-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
.scale-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>