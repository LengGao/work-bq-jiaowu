import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import './assets/css/element-variables.scss'
import './assets/js/components' //注册组件
import '@/styles/index.scss' // global css
import moment from 'moment' //导入模块
import url from './assets/js/url'
import api from './assets/js/api'
import _ from 'lodash' //引入lodash
moment.locale('zh-cn') //设置语言 或 moment.lang('zh-cn');

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts //echarts处理时间https://echarts.apache.org/zh/index.html
Vue.prototype.$moment = moment //moment处理时间http://momentjs.cn/docs/
Vue.config.productionTip = false
Vue.prototype.$url = url //axios相关
Vue.prototype.$api = api //axios相关
Vue.prototype._ = _ //lodash相关https://www.lodashjs.com/
Vue.prototype.rootDir = process.env.VUE_APP_LOACTION //上传地址
Vue.prototype.downLoad = process.env.VUE_APP_downLoad //上传地址

import '@/icons' // icon
import '@/permission' // permission control
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
