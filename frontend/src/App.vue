<script setup>
import { ref, onMounted } from 'vue'

const backendStatus = ref(null)
const users = ref([])
const loading = ref(false)
const error = ref(null)

const API_BASE_URL = '/api'

// Kiểm tra trạng thái backend
const checkBackendStatus = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error('Backend không phản hồi')
    }
    
    const data = await response.json()
    backendStatus.value = data
  } catch (err) {
    error.value = err.message
    console.error('Lỗi kết nối backend:', err)
  } finally {
    loading.value = false
  }
}

// Lấy danh sách users
const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách người dùng')
    }
    
    const data = await response.json()
    users.value = data
  } catch (err) {
    error.value = err.message
    console.error('Lỗi lấy users:', err)
  } finally {
    loading.value = false
  }
}

// Chạy khi component được mount
onMounted(() => {
  document.title = '🚀 NestJS + Vue Full-Stack App'
  checkBackendStatus()
  fetchUsers()
})
</script>

<template>
  <div id="app">
    <header class="header">
      <h1>🚀 NestJS + Vue Full-Stack App</h1>
      <p>Ứng dụng demo kết nối NestJS backend và Vue frontend</p>
    </header>

    <main class="main">
      <!-- Trạng thái Backend -->
      <section class="section">
        <h2>🔧 Trạng thái Backend</h2>
        <div v-if="loading" class="loading">⏳ Đang kiểm tra...</div>
        <div v-else-if="error" class="error">❌ Lỗi: {{ error }}</div>
        <div v-else-if="backendStatus" class="success">
          <p>✅ Status: {{ backendStatus.status }}</p>
          <p>📅 Timestamp: {{ backendStatus.timestamp }}</p>
          <p>💬 Message: {{ backendStatus.message }}</p>
          <p>🔖 Version: {{ backendStatus.version }}</p>
        </div>
        <button @click="checkBackendStatus" class="btn">🔄 Kiểm tra lại</button>
      </section>

      <!-- Danh sách Users -->
      <section class="section">
        <h2>👥 Danh sách người dùng</h2>
        <div v-if="loading" class="loading">⏳ Đang tải...</div>
        <div v-else-if="error" class="error">❌ Lỗi: {{ error }}</div>
        <div v-else-if="users.length > 0" class="users-grid">
          <div v-for="user in users" :key="user.id" class="user-card">
            <h3>{{ user.name }}</h3>
            <p>📧 {{ user.email }}</p>
            <small>ID: {{ user.id }}</small>
          </div>
        </div>
        <button @click="fetchUsers" class="btn">🔄 Tải lại</button>
      </section>
    </main>

    <footer class="footer">
      <p>Made with ❤️ using NestJS + Vue.js + Vite</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.main {
  display: grid;
  gap: 30px;
}

.section {
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.section h2 {
  margin-top: 0;
  color: #333;
  font-size: 1.5rem;
}

.loading {
  color: #2196F3;
  font-weight: bold;
}

.error {
  color: #f44336;
  font-weight: bold;
  padding: 10px;
  background: #ffebee;
  border-radius: 5px;
}

.success {
  color: #4caf50;
  background: #e8f5e8;
  padding: 15px;
  border-radius: 5px;
  border-left: 4px solid #4caf50;
}

.success p {
  margin: 5px 0;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.user-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.user-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.user-card p {
  margin: 5px 0;
  color: #666;
}

.user-card small {
  color: #999;
}

.btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: background 0.2s;
}

.btn:hover {
  background: #45a049;
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #666;
  border-top: 1px solid #eee;
}
</style>
