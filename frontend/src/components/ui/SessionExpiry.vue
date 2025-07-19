<template>
  <div v-if="isAuthenticated && timeUntilExpiration > 0" class="flex items-center gap-2 text-sm">
    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span :class="getTimeClass()">
      {{ formatTime(timeUntilExpiration) }}
    </span>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, timeUntilExpiration } = useAuth()

const formatTime = (minutes) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`
  }
  return `${minutes}m`
}

const getTimeClass = () => {
  if (timeUntilExpiration <= 5) {
    return 'text-red-600 font-semibold animate-pulse'
  } else if (timeUntilExpiration <= 30) {
    return 'text-amber-600 font-medium'
  }
  return 'text-gray-600'
}
</script> 