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
import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/filters'
import '@/utils/mixins'
import './cropper'
// import './mock/mock'
moment.locale('zh-cn') //设置语言 或 moment.lang('zh-cn');
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'

Vue.use(VTree)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts //echarts
Vue.prototype.$moment = moment //moment处理时间http://momentjs.cn/docs/
Vue.config.productionTip = false
Vue.prototype.$url = url //axios相关
Vue.prototype.$api = api //axios相关
Vue.prototype.rootDir = process.env.VUE_APP_LOACTION //上传地址
Vue.prototype.downLoad = process.env.VUE_APP_DOWNLOAD //下载图片地址
Vue.prototype.Base64 = Base64
  // 节流自定义全局命令
  ; (function () {
    let openDelay = false
    Vue.directive('intervalclick', function (el, binding) {
      el.onclick = function (e) {
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
