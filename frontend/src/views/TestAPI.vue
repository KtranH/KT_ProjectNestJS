<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Test API
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Kiểm tra kết nối và các endpoints của NestJS backend
        </p>
      </div>

      <!-- API Status Card -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Trạng thái Backend</h2>
              <p class="text-gray-600">Kiểm tra kết nối tới NestJS server</p>
            </div>
          </div>

          <!-- Status Display -->
          <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6">
            <div v-if="backendLoading" class="flex items-center justify-center gap-3 py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span class="text-blue-600 font-semibold">Đang kiểm tra kết nối...</span>
            </div>
            
            <div v-else-if="backendError" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-800 mb-1">Không thể kết nối</h3>
                  <p class="text-red-700">{{ backendError }}</p>
                </div>
              </div>
            </div>
            
            <div v-else-if="backendStatus" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm border border-green-200">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-600">Status</p>
                      <p class="text-lg font-bold text-green-600">{{ backendStatus.status }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-600">Timestamp</p>
                      <p class="text-sm text-blue-600">{{ backendStatus.timestamp }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">Message</p>
                    <p class="text-purple-600">{{ backendStatus.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            @click="checkBackendStatus"
            :disabled="backendLoading"
            class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'animate-spin': backendLoading}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ backendLoading ? 'Đang kiểm tra...' : 'Kiểm tra kết nối' }}
          </button>
        </div>
      </div>

      <!-- Users List Card -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Danh sách người dùng</h2>
              <p class="text-gray-600">Lấy dữ liệu từ API endpoint /users</p>
            </div>
          </div>

          <!-- Users Display -->
          <div class="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-6 mb-6">
            <div v-if="usersLoading" class="flex items-center justify-center gap-3 py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span class="text-green-600 font-semibold">Đang tải danh sách...</span>
            </div>
            
            <div v-else-if="usersError" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-800 mb-1">Lỗi tải dữ liệu</h3>
                  <p class="text-red-700">{{ usersError }}</p>
                </div>
              </div>
            </div>
            
            <div v-else-if="users && users.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="user in users" 
                :key="user.id"
                class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 truncate">{{ user.name }}</h3>
                    <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                  </div>
                </div>
                <div class="text-xs text-gray-400 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  ID: {{ user.id }}
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p class="text-gray-500 text-lg font-medium">Chưa có dữ liệu người dùng</p>
              <p class="text-gray-400 text-sm">Hãy thử tải lại danh sách</p>
            </div>
          </div>

          <button 
            @click="fetchUsers"
            :disabled="usersLoading"
            class="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'animate-spin': usersLoading}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ usersLoading ? 'Đang tải...' : 'Tải danh sách' }}
          </button>
        </div>
      </div>

      <!-- API Endpoints Info -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">API Endpoints</h2>
              <p class="text-gray-600">Thông tin các endpoint có sẵn</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">GET</span>
                <code class="text-sm font-mono text-gray-700">/api/health</code>
              </div>
              <p class="text-sm text-gray-600">Kiểm tra trạng thái server</p>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">GET</span>
                <code class="text-sm font-mono text-gray-700">/api/users</code>
              </div>
              <p class="text-sm text-gray-600">Lấy danh sách người dùng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Backend status
const backendLoading = ref(false)
const backendError = ref(null)
const backendStatus = ref(null)

// Users data
const usersLoading = ref(false)
const usersError = ref(null)
const users = ref([])

// API base URL
const API_BASE_URL = 'http://localhost:3000/api'

const checkBackendStatus = async () => {
  backendLoading.value = true
  backendError.value = null
  backendStatus.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    backendStatus.value = data
  } catch (error) {
    backendError.value = error.message
  } finally {
    backendLoading.value = false
  }
}

const fetchUsers = async () => {
  usersLoading.value = true
  usersError.value = null
  users.value = []

  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    users.value = Array.isArray(data) ? data : []
  } catch (error) {
    usersError.value = error.message
    users.value = []
  } finally {
    usersLoading.value = false
  }
}

onMounted(() => {
  document.title = 'Test API - NestJS + Vue'
  // Tự động kiểm tra kết nối khi load trang
  checkBackendStatus()
})
</script> 