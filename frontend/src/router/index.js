import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, requireGuest } from './guards/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: requireGuest,
    meta: { transition: 'slide-left' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    beforeEnter: requireGuest,
    meta: { transition: 'slide-right' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: requireAuth,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/test-api',
    name: 'TestAPI',
    component: () => import('@/views/TestAPI.vue'),
    beforeEnter: requireAuth,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('@/views/Task.vue'),
    beforeEnter: requireAuth,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { transition: 'fade' }
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