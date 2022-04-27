import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_LOACTION, // api的base_url
})

// request拦截器
service.interceptors.request.use(config => {
  const token = store.getters.token || ''

  config.headers['content-Type'] = 'application/json; charset=utf-8'
  if (token) {
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非0是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res?.data?.help_url) {
      store.commit("SET_HELP_URL", res.data.help_url)
    }
    if (res.code !== 0 && response.config.responseType !== 'blob') {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      // 5000:未登录;
      if (res.code === 50000) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            router.push('/login')
            // location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    error.message && Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
