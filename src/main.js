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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
