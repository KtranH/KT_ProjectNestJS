<template>
  <div class="relative">
    <div class="flex items-center space-x-4">
      <!-- User Info -->
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <div class="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span class="text-sm font-medium text-white">
              {{ userInitials }}
            </span>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="text-sm font-medium text-gray-900">{{ authStore.getUser?.username }}</div>
          <div class="text-xs text-gray-500">Đã đăng nhập</div>
        </div>
      </div>

      <!-- Dropdown Menu -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Content -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
        >
          <div class="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
            Tài khoản
          </div>
          
          <button
            @click="handleProfile"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Hồ sơ</span>
            </div>
          </button>
          
          <button
            @click="handleSettings"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Cài đặt</span>
            </div>
          </button>
          
          <div class="border-t border-gray-100 my-1"></div>
          
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <div class="flex items-center space-x-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Đăng xuất</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop for closing dropdown -->
    <div
      v-if="isDropdownOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/modules/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const isDropdownOpen = ref(false)

const userInitials = computed(() => {
  const user = authStore.getUser
  if (!user?.username) return 'U'
  return user.username.charAt(0).toUpperCase()
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleProfile = () => {
  closeDropdown()
  router.push('/profile')
}

const handleSettings = () => {
  closeDropdown()
  router.push('/settings')
}

const handleLogout = async () => {
  closeDropdown()
  await authStore.logout()
  router.push('/login')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 