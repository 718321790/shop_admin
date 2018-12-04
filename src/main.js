// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/index.css'
import axios from 'axios'

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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
