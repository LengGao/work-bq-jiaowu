//ajax配置项文件已超4000row
import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import imgSpace from '@/assets/js/imgSpace'
import quertionBank from '@/assets/js/quertionBank'
import enrollStu from '@/assets/js/enrollStu'
import resource from '@/assets/js/resource'
import statiSys from '@/assets/js/statiSys'

import testconfig from '@/assets/js/testconfig'
import visualization from '@/assets/js/visualization'
import videoManger from '@/assets/js/videoManger'
import miniPro from '@/assets/js/miniPro'
import loginApi from '@/assets/js/login'
import axios from 'axios'
import eventBus from '../../utils/eventbus.js'
import Examination from '@/assets/js/Examination'
import Finance from '@/assets/js/Finance'
import system from '@/assets/js/system'

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
  insertCategory(self, ruleForm) {
    let config = {
      classroom_name: ruleForm.classroom_name,
      category_id: ruleForm.category_id,
      category_id: ruleForm.category_id,
      // category_name: self[name].category_name,
      // sort: self[name].sort,
      // icon: self['url'],
      // describe: self[name].describe,
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
            message: res.data.message,
          })
          self.dialogVisible = false
          self.$api.getCategoryList(self, 'schoolData')
        }
      },
    })
  },
  //学生中心
  getStudentManage(self, name) {
    let config = {
      // category_name: self[name].category_name,
      // sort: self[name].sort,
      // icon: self['url'],
      // describe: self[name].describe,
    }
    // console.log(config)
    axiosHttp({
      url: url.getStudentManage,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          for (var item of data.data) {
            if (item.create_time != 0 || item.create_time != '') {
              item.create_time = self.$moment
                .unix(item.create_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.create_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  //学生中心
  getClassroomList(self, name) {
    let config = {}

    axiosHttp({
      url: url.getClassroomList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // for (var item of data.data) {
          //   if (item.create_time != 0 || item.create_time != '') {
          //     item.create_time = self.$moment
          //       .unix(item.create_time)
          //       .format('YYYY-MM-DD HH:mm:ss')
          //   } else {
          //     item.create_time = '---'
          //   }
          // }
          // self[name] = data
        }
      },
    })
  },
  //添加班级
  addClasses(self, ruleForm) {
    let config = {
      teacher_id: ruleForm.teacher_id,
      describe: ruleForm.describe,
      classroom_name: ruleForm.classroom_name,
      master_teacher_id: ruleForm.master_teacher_id,
      course_id: ruleForm.course_id,
      class_icon: ruleForm.class_icon,
      describe: ruleForm.describe,
      category_id: ruleForm.category_id,
    }
    axiosHttp({
      url: url.addClasses,
      data: config,
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          self.$api.getClassroomList(self, 'schoolData')
          self.dialogVisible = false
          // self[name] = data
        }
      },
    })
  },
  //编辑班级接口
  modifyClasses(self, ruleForm) {
    let config = {
      classroom_id: ruleForm.classroom_id,
      teacher_id: ruleForm.teacher_id,
      describe: ruleForm.describe,
      classroom_name: ruleForm.classroom_name,
      master_teacher_id: ruleForm.master_teacher_id,
      course_id: ruleForm.course_id,
      class_icon: ruleForm.class_icon,
      describe: ruleForm.describe,
      category_id: ruleForm.category_id,
    }
    axiosHttp({
      url: url.modifyClasses,
      data: config,
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          self.$api.getClassroomList(self, 'schoolData')
          self.dialogVisible = false
          // self[name] = data
        }
      },
    })
  },

  /***************教材发放**************/
  //发放教材列表
  dispenseList(self, name) {
    let config = {
      page: self.page,
    }
    axiosHttp({
      url: url.dispenseList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          for (var item of data.list) {
            if (item.update_time != 0 || item.update_time != '') {
              item.update_time = self.$moment
                .unix(item.update_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.update_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  getDispenseLog(self, name) {
    let config = {
      page: self.page,
      id: self.$route.query.id,
    }
    console.log(config)
    axiosHttp({
      url: url.getDispenseLog,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          for (var item of data.data) {
            if (item.create_time != 0 || item.create_time != '') {
              item.create_time = self.$moment
                .unix(item.create_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.create_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  /***************排班管理****************/
  //班级列表
  classroomList(self, name) {
    let config = {
      // page: self.page,
      // id: self.$route.query.id,
    }
    console.log(config)
    axiosHttp({
      url: url.classroomList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          for (var item of data.data) {
            if (item.create_time != 0 || item.create_time != '') {
              item.create_time = self.$moment
                .unix(item.create_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.create_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  //创建排课
  addScheduling(self, ruleForm) {
    let config = {
      param: ruleForm,
    }
    console.log(config)
    axiosHttp({
      url: url.addScheduling,
      data: config,
      // method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        }
      },
    })
  },
  //排课列表
  getTimetableList(self, name) {
    // let config = ruleForm
    let config = {
      page: self.page,
    }
    // console.log(config)
    axiosHttp({
      url: url.getTimetableList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          let data = res.data.data
          for (var item of data.list) {
            if (item.frist_class_time != 0 || item.frist_class_time != '') {
              item.frist_class_time = self.$moment
                .unix(item.frist_class_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.frist_class_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  //全部排课列表
  getAllForPageList(self, name) {
    let config = {
      page: self.page,
    }
    axiosHttp({
      url: url.getAllForPageList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          let data = res.data.data
          for (var item of data.list) {
            if (item.start_time != 0 || item.start_time != '') {
              item.start_time = self.$moment
                .unix(item.start_time)
                .format('YYYY-MM-DD HH:mm:ss')
            } else {
              item.start_time = '---'
            }
          }
          self[name] = data
        }
      },
    })
  },
  //导出当月排课
  exportExcelSchedule(self, name) {
    let config = {
      // page: self.page,
    }
    axiosHttp({
      url: url.exportExcelSchedule,
      data: config,
      // method: 'GET',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (res.data.code == 0) {
          self.url = data.url
          self.dialogVisible = true
          // if (res.data.data.url) {

          //   // window.location.href = res.data.data.url
          // }
          // let data = res.data.data
          // for (var item of data.list) {
          //   if (item.start_time != 0 || item.start_time != '') {
          //     item.start_time = self.$moment
          //       .unix(item.start_time)
          //       .format('YYYY-MM-DD HH:mm:ss')
          //   } else {
          //     item.start_time = '---'
          //   }
          // }
          // self[name] = data
        }
      },
    })
  },
  //课程列表
  getCourseManage(self, name, data = {}) {
    let course_name = ''
    let class_type = ''
    let course_category_id = ''
    if (data.name != '' || data.name != undefined) {
      course_name = data.name
    }
    if (data.id != '' || data.id != undefined) {
      course_category_id = data.id
    }
    if (data.course_type != '' || data.course_type != undefined) {
      class_type = data.course_type
    }
    let config = {
      page: self.page,
      course_name: course_name,
      course_category_id: course_category_id || self.ruleForm.category_id,
      class_type: class_type,
    }
    console.log(config)

    axiosHttp({
      url: url.getCourseManage,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
}

Object.assign(
  api,
  imgSpace,
  quertionBank,
  testconfig,
  enrollStu,
  resource,
  statiSys,
  visualization,
  videoManger,
  miniPro,
  loginApi,
  Examination,
  Finance,
  system
)
export default api
