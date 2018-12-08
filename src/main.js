// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/index.css'
import axios from 'axios'
// import ElTreeGrid from 'element-tree-grid'

// 注册全局组件
// Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.prototype.axios = axios

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.use(ElementUI)

// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  error => {
    this.$message({
      type: 'error',
      message: error,
      duration: 1000
    })
  }
)
// 设置响应拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    switch (response.data.meta.status) {
      case 401:
        vm.$message({
          type: 'error',
          message: response.data.meta.msg
        })
        vm.$router.push('/login')
        break

      case 403:
        vm.$message({
          type: 'error',
          message: response.data.meta.msg
        })
        vm.$router.push('/login')
        break
      default:
        return response
    }
  },
  error => {
    console.log(error)
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 返回 401 清除token信息并跳转到登录页面
    //       localStorage.removeItem('token')
    //       this.$router.push('/login')
    //   }
    // }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
