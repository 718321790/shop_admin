import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import User from '@/components/user/User'
import Roles from '@/components/roles/Roles'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/user', component: User },
        { path: '/roles', component: Roles }
      ]
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})

export default router
