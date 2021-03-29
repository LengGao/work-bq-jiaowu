import Vue from 'vue'

// 全局组件
import Breadcrumb from '@/components/Breadcrumb'
import Eachertline from '@/components/Eachertline'
import Eachertbar from '@/components/Eachertbar'
import Search from '@/components/Search'
import Search2 from '@/components/Search2'
import SearchList from '@/components/SearchList/index'
import Title from '@/components/Title'
import imgDialog from '@/components/imgDialog'
import page from '@/components/page'
import pageConfig from '@/components/Pageconfig'
import FileUpload from '@/components/Upload/fileUpload'
import SingleUpload from '@/components/Upload/singleUpload'
// import MultiUpload from '@/components/Upload/multiUpload'
import imgSpace from '@/components/imgSpace.vue'
import kindeditor from '@/components/kindeditor.vue'
import videoUpload from '@/components/Upload/videoUpload.vue'
import smallEachert from '@/components/smallEachert.vue'
import smallbar from '@/components/smallbar.vue' //dynamicLine
import dynamicLine from '@/components/dynamicLine.vue'
import PreviewImg from '@/components/PreviewImg/index'
Vue.component('PreviewImg', PreviewImg)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('Eachertline', Eachertline)
Vue.component('Eachertbar', Eachertbar)
Vue.component('Search', Search)
Vue.component('Search2', Search2)
Vue.component('SearchList', SearchList)
Vue.component('Title', Title)
Vue.component('imgDialog', imgDialog)
Vue.component('page', page)
Vue.component('FileUpload', FileUpload)
Vue.component('SingleUpload', SingleUpload)
// Vue.component('MultiUpload', MultiUpload)
Vue.component('imgSpace', imgSpace)
Vue.component('kindeditor', kindeditor)
Vue.component('videoUpload', videoUpload)
Vue.component('smallEachert', smallEachert)
Vue.component('smallbar', smallbar)
Vue.component('dynamicLine', dynamicLine)
Vue.component('pageConfig', pageConfig)

export default Vue
