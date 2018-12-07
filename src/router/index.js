import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import User from '@/components/user/User'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/rights/Rights'
import Categories from '@/components/categories/Categories'
import Goods from '@/components/goods/Goods'
import GoodsAdd from '@/components/goods-add/GoodsAdd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/users', component: User },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods/:id?', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    },
    {
      path: '/',
      redirect: '/home'
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
