// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// App constants
export const APP_NAME = 'Vue 3 App'
export const APP_VERSION = '1.0.0'

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'app_theme'
}

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
  PASSWORD_MIN_LENGTH: 8
} 