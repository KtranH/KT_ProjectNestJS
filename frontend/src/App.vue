<template>
  <div id="app" class="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation Bar -->
    <AppHeader />

    <!-- Main Content -->
    <main class="w-full min-h-screen">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
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
</style>