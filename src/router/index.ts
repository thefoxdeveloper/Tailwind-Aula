import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import IndexView from '@/views/IndexView.vue'
import ExplorerView from '@/views/ExplorerView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: ExplorerView
    },
    {
      path: '/profile/:id',
      name: 'explorer',
      component: ProfileView
    }
  ]
})

export default router
