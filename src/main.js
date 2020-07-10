import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import './assets/css/element-variables.scss';
import './assets/css/common.scss';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false


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
  render: h => h(App)
}).$mount('#app')
