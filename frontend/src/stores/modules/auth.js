import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null
  }),
  
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated
  },
  
  actions: {
    setUser(user) {
      this.user = user
      this.isAuthenticated = !!user
    },
    
    setToken(token) {
      this.token = token
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
    }
  }
}) 