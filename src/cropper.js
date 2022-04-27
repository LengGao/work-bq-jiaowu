import Vue from 'vue'
import Viewering from 'v-viewer' // 预览相关
import 'viewerjs/dist/viewer.css' // 预览相关
Viewering.setDefaults({
  zIndex: 9999,
})
Vue.use(Viewering)