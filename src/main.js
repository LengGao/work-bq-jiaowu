import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element框架
import echarts from '@/echarts'
import './assets/css/element-variables.scss'
import './assets/js/components' //注册组件
import '@/styles/index.scss' // global css
import moment from 'moment' //导入moment模块,时间戳处理相关
import url from './assets/js/url'
import { Base64 } from 'js-base64' //Base64编码
import api from './assets/js/api' //注册api，全局挂载
import _ from 'lodash' //引入lodash
import '@/icons' // icon
import '@/permission' // permission control
// import './mock/mock'
moment.locale('zh-cn') //设置语言 或 moment.lang('zh-cn');
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts //echarts
Vue.prototype.$moment = moment //moment处理时间http://momentjs.cn/docs/
Vue.config.productionTip = false
Vue.prototype.$url = url //axios相关
Vue.prototype.$api = api //axios相关
Vue.prototype._ = _ //lodash相关https://www.lodashjs.com/
Vue.prototype.rootDir = process.env.VUE_APP_LOACTION //上传地址
Vue.prototype.downLoad = process.env.VUE_APP_downLoad //下载图片地址
Vue.prototype.Base64 = Base64
// 节流自定义全局命令
;(function() {
  let openDelay = false
  Vue.directive('intervalclick', function(el, binding) {
    el.onclick = function(e) {
      if (openDelay) return
      openDelay = !openDelay
      if (!binding.value) {
        alert('未传入Value数据！')
        return
      }
      let func = binding.value['func']
      let time = binding.value['time']
      if (typeof time !== 'number') {
        alert('传入等待时间错误')
        return
      }
      let args = []
      for (const key in binding.value) {
        if (binding.value.hasOwnProperty(key)) {
          if (key === 'func' || key === 'time') continue
          args.push(binding.value[key])
        }
      }
      setTimeout(() => {
        openDelay = !openDelay
      }, time)
      func(...args)
    }
  })
})()

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
