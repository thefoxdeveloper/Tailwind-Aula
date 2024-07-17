import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import IndexView from '@/views/IndexView.vue'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionStorage.getItem('token')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
