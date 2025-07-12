import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, requireGuest } from './guards/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: requireGuest
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/test-api',
    name: 'TestAPI',
    component: () => import('@/views/TestAPI.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('@/views/Task.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  // Redirect old routes to new ones
  {
    path: '/dashboard-old',
    redirect: '/dashboard'
  },
  {
    path: '/tailwind-demo',
    redirect: '/'
  },
  {
    path: '/backend-test',
    redirect: '/test-api'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 