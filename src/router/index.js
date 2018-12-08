import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
const NotFound = () => import('@/components/notFound/NotFound')
const GoodsAdd = () =>
  import(/* webpackChunkName:'goods' */ '@/components/goods-add/GoodsAdd')
const Goods = () =>
  import(/* webpackChunkName:'goods' */ '@/components/goods/Goods')
const Categories = () => import('@/components/categories/Categories')
const Rights = () => import('@/components/rights/Rights')
const Roles = () => import('@/components/roles/Roles')
const User = () => import('@/components/user/User')
const Home = () => import('@/components/Home')

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
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
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
