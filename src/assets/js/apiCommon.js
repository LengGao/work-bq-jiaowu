import axios from 'axios'
import Vue from 'vue'
import url from '@/assets/js/url'
import common from '@/utils/common'
import qs from 'qs'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 区分生产模式和开发模式
function setHost() {
  var host = window.location.host.split('.')
  var oHost = ''
  if (host.length == 3) {
    host[0] = 'api'
    oHost = host.join('.')
  } else if (host.length == 2) {
    oHost = 'api.' + host.join('.')
  }
  return 'http://' + oHost
}
//新增加测试环境
let location = process.env.VUE_APP_LOACTION || setHost()
// axios默认配置
axios.defaults.timeout = 1800000 // 超时时间
axios.defaults.baseURL = location // 默认地址
Vue.prototype.$urls = location
axios.defaults.headers['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
let v = new Vue()
/**  
 *
 * 接收一个对象
 *  method 请求类型
 *  url 请求链接
 *  data 请求数据
 *  then 回调方法
 */
let axiosHttp = (obj) => {
  let loading = v.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    // background: 'rgba(0, 0, 0, 0.7)'
    background: 'rgba(0, 0, 0, 0)',
  })
  let oData = obj.method == 'GET' ? obj.data : {}
  let params = obj.params || oData

  axios({
    method: obj.method || 'POST',
    url: obj.url || '',
    data: obj.data || '',
    params: params,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default
  })
    .then(function(res) {
      loading.close()
      let data = res.data
      console.log(data.code)
      if (data.code <= 3004 && data.code > 3000 ? true : false) {
        v.$confirm(data.message, {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            window.location.reload()
          })
        })
      } else if (data.code == 444) {
        // 444是404页面
        v.$router.push({ name: '404' })
      } else if (data.code == 3005) {
        v.$message({
          type: 'error',
          message: data.message,
        })
        setTimeout(() => {
          window.location.reload()
        }, 1200)
      } else {
        if (data.code != 0) {
          v.$message({
            type: 'error',
            message: data.message,
          })
        } else {
          obj.then && typeof obj.then == 'function' && obj.then(res)
        }
      }
    })
    .catch(function(error) {
      loading.close()
      console.log(error.response)
      if (error.response) {
        console.log(error.response.status)
        if (error.response.status != 200) {
          v.$message({
            type: 'error',
            message: error.response.statusText,
          })
        }
      }
    })
}
export { axiosHttp, v, url, common }
