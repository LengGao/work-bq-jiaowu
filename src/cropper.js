// import VueCropper from 'vue-cropper' //图片裁剪
// Vue.use(VueCropper)
import Vue from 'vue'
import Viewering from 'v-viewer' // 预览相关
import 'viewerjs/dist/viewer.css' // 预览相关
Viewering.setDefaults({
  zIndexInline: 9999
})
Vue.use(Viewering)