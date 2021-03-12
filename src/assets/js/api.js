//ajax配置项文件已超4000row
import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import imgSpace from '@/assets/js/imgSpace'
import quertionBank from '@/assets/js/quertionBank'
import enrollStu from '@/assets/js/enrollStu'
import resource from '@/assets/js/resource'
import statiSys from '@/assets/js/statiSys'
import schManage from '@/assets/js/schManage'
import testconfig from '@/assets/js/testconfig'
import visualization from '@/assets/js/visualization'
import videoManger from '@/assets/js/videoManger'
import miniPro from '@/assets/js/miniPro'
import loginApi from '@/assets/js/login'
import axios from 'axios'
import eventBus from '../../utils/eventbus.js'
let api = {
  /**
   * @param {* this} self
   * @param {* 筛选条件} name
   * @param {* 数据} data
   */
  getCategoryList(self, name, data) {
    let category_name = ''
    console.log(data != undefined)
    if (data != undefined) {
      category_name = data.name
    }
    let config = {
      page: self.page,
      category_name: category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getCategoryList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  updateCategorySort(category_id, sort, self) {
    let config = {
      category_id: parseInt(category_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.updateCategorySort,
      data: config,
      method: 'POST',
      then(res) {
        self.$api.getCategoryList(self, 'schoolData')
      },
    })
  },
  deleteCategory(category_id, self) {
    let config = {
      category_id: parseInt(category_id.category_id),
    }
    axiosHttp({
      url: url.deleteCategory,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getCategoryList(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  getCategoryInfo(self, id) {
    let config = {
      category_id: parseInt(id),
    }
    axiosHttp({
      url: url.getCategoryInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.info)
        if (res.data.code == 0) {
          self['brand'] = res.data.data.info
          self['icon'] = res.data.data.info.icon
        }
      },
    })
  },
  updateCategory(self, urls) {
    let config = {
      category_id: self.$route.query.id,
      category_name: self['brand'].category_name,
      sort: self['brand'].sort,
      icon: urls,
      describe: self['brand'].describe,
    }
    console.log(config)
    axiosHttp({
      url: url.updateCategory,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '更新成功',
          })
          self.$router.go(-1)
        }
      },
    })
  },
  insertCategory(self, name) {
    let config = {
      category_name: self[name].category_name,
      sort: self[name].sort,
      icon: self['url'],
      describe: self[name].describe,
    }
    console.log(config)
    axiosHttp({
      url: url.insertCategory,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功',
          })
          self.dialogVisible = false
          self.$api.getCategoryList(self, 'schoolData')
        }
      },
    })
  },
  insertCategory(self, name) {
    let config = {
      category_name: self[name].category_name,
      sort: self[name].sort,
      icon: self['url'],
      describe: self[name].describe,
    }
    console.log(config)
    axiosHttp({
      url: url.insertCategory,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功',
          })
          self.dialogVisible = false
          self.$api.getCategoryList(self, 'schoolData')
        }
      },
    })
  },
}
// Object.assign(api, imgSpace, quertionBank, testconfig, enrollStu,visualization,videoManger)
Object.assign(
  api,
  imgSpace,
  quertionBank,
  testconfig,
  enrollStu,
  resource,
  statiSys,
  schManage,
  visualization,
  videoManger,
  miniPro,
  loginApi
)
export default api
