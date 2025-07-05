import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/test-api',
    name: 'TestAPI',
    component: () => import('@/views/TestAPI.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  // Redirect old routes to new ones
  {
    path: '/dashboard',
    redirect: '/test-api'
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