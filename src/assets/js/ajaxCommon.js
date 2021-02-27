import axios from 'axios'
import Vue from 'vue'
import url from '@/assets/js/url'
import qs from 'qs'

axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
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
  return 'https://' + oHost
}
// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
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
    params,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default
  })
    .then(function(res) {
      loading.close()
      let data = res.data
      // if (data.data == void 0) {
      //    v.$alert('加载失败，请稍后再试!!', '系统提示');
      // } else
      if (data.code == 1) {
        v.$alert(data.msg, '系统提示')
        obj.catch && typeof obj.catch == 'function' && obj.catch(res)
      } else if (data.code == 999) {
        // 999重新登陆
        process.env.NODE_ENV == 'production' &&
          v.$alert(data.msg, '系统提示', {
            callback: () => (window.location.href = '/adminLogin'),
          })
      } else if (data.code == 444) {
        // 444是404页面
        // v.$router.push({name:'error'});
      } else {
        obj.then && typeof obj.then == 'function' && obj.then(res)
      }
    })
    .catch(function(error) {
      loading.close()
      console.log(error.response)
      if (error.response) {
        console.log(error.response.status)
        if (error.response.status != 200) {
          v.$alert('加载失败，请稍后再试!', '系统提示')
          obj.catch && typeof obj.catch == 'function' && obj.catch(error)
        }
      }
    })
}
export { axiosHttp, v, url }
