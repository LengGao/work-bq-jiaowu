import Vue from 'vue'

// 全局组件
import Breadcrumb from '@/components/Breadcrumb'
import Eachertline from '@/components/Eachertline'
import Search from '@/components/Search'
import page from '@/components/page'
import SingleUpload from '@/components/Upload/singleUpload'
import MultiUpload from '@/components/Upload/multiUpload'
import imgSpace from '@/components/imgSpace.vue'
import kindeditor from '@/components/kindeditor.vue'

Vue.component('Breadcrumb', Breadcrumb)
Vue.component('Eachertline', Eachertline)
Vue.component('Search', Search)
Vue.component('page', page)
Vue.component('SingleUpload', SingleUpload)
Vue.component('MultiUpload', MultiUpload)
Vue.component('imgSpace', imgSpace)
Vue.component('kindeditor', kindeditor)
export default Vue
