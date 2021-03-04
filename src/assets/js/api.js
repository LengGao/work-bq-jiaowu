//ajax配置项文件已超4000row
import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import imgSpace from '@/assets/js/imgSpace'
import quertionBank from '@/assets/js/quertionBank'
import enrollStu from '@/assets/js/enrollStu'
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
      category_id: parseInt(category_id.category_id),
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
  //首页分类列表
  getHomeclassifiList(self, name, data = {}) {
    let index_category_name = ''
    if (data.name != '' || data.name != undefined) {
      index_category_name = data.name
    }
    let config = {
      page: self.page,
      index_category_name: index_category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getHomeclassifiList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加首页分类
  addHomeCategory(self, name) {
    let config = {
      index_category_name: self[name].index_category_name,
      sort: self[name].sort,
      index_category_icon: self['url'],
    }
    console.log(config)
    axiosHttp({
      url: url.addHomeCategory,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisibleHome = false
          self.$api.getHomeclassifiList(self, 'homeData')
        }
      },
    })
  },
  //删除首页分类
  deleteHomeclassifi(Homeclassifi_id, self) {
    let config = {
      id: parseInt(Homeclassifi_id.index_category_id),
    }
    axiosHttp({
      url: url.deleteHomeclassifi,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getHomeclassifiList(self, 'homeData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  //分类列表详情
  getHomeclassifiDetail(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.getHomeclassifiDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let homeClass = res.data.data
        self.addClassifyHome = homeClass.info
        self['url'] = homeClass.info.index_category_icon
        // self[name] =homeClass
      },
    })
  },
  //修改首页分类排序值
  updateHomeClassifiSort(index_category_id, sort, self) {
    let config = {
      index_category_id: parseInt(index_category_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.updateHomeClassifiSort,
      data: config,
      method: 'POST',
      then(res) {
        self.$api.getHomeclassifiList(self, 'homeData')
      },
    })
  },

  //批量排序视频章节
  sortNideoChapters(index_category_id, sort, self) {
    let config = {
      index_category_id: parseInt(index_category_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.updateHomeClassifiSort,
      data: config,
      method: 'POST',
      then(res) {
        self.$api.getHomeclassifiList(self, 'homeData')
      },
    })
  },
  //修改课程排序
  updateCourseSort(course_id, sort, self) {
    let config = {
      course_id: parseInt(course_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.updateCourseSort,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getCourseManage(self, 'schoolData')
        }
      },
    })
  },
  //修改首页分类
  modifyHomeCategory(self, id) {
    let config = {
      id: id,
      index_category_name: self.addClassifyHome.index_category_name,
      sort: self.addClassifyHome.sort,
      index_category_icon: self['url'],
    }
    console.log(config)
    axiosHttp({
      url: url.modifyHomeCategory,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisibleHome = false
          self.$api.getHomeclassifiList(self, 'homeData')
          for (let key in self.addClassify) {
            self.addClassifyHome[key] = ''
          }
          self['url'] = ''
        }
      },
    })
  },
  //推荐机构列表
  getRecommender(self, name, data = {}) {
    let institution_name = ''
    if (data.name != '' || data.name != undefined) {
      institution_name = data.name
    }

    let config = {
      page: self.page,
      institution_name: institution_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getRecommender,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        let effect = self[name].list
        if (effect.length > 0) {
          effect.forEach((val, num) => {
            if (val.Blocks.length > 0) {
              val.Blocks.forEach((item, digit) => {
                item.parent_name = val.institution_name
              })
            }
          })
        }
      },
    })
  },
  //创建/修改机构账号信息
  doAccount(self, ruleForm) {
    let config = {
      institution_id: ruleForm.institution_id,
      account: ruleForm.account,
      password: ruleForm.password,
    }
    console.log(config)
    axiosHttp({
      url: url.doAccount,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.organVisible = false
          self.$api.getRecommender(self, 'schoolData')
          // self.$message({
          //   type: 'success',
          //   message: res.data.message,
          // })
          // self.$router.go(-1)
        }
        // else {
        //   self.$message({
        //     type: 'error',
        //     message: res.data.message,
        //   })
        // }
      },
    })
  },
  //添加机构
  addorGanization(self, ruleForm) {
    let config = {
      institution_name: ruleForm.institution_name,
      host_man: ruleForm.host_man,
      telephone: ruleForm.telephone,
      account: ruleForm.account,
      password: self.password,
    }
    console.log(config)
    axiosHttp({
      url: url.addorGanization,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //删除推荐机构
  deleteInstitution(self, institution_id) {
    let config = {
      institution_id: parseInt(institution_id),
    }
    axiosHttp({
      url: url.deleteInstitution,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getRecommender(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },

  //学员管理
  getStudentManage(self, name, data = {}) {
    let keyboard = ''
    let start_time = ''
    let end_time = ''
    let category_id = ''
    let course_id = ''
    let organization_id = ''
    let classroom_id = ''
    let teacher_id = ''
    let campus_id = ''
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    if (data.teacher_id != '' || data.teacher_id != undefined) {
      teacher_id = data.teacher_id
    }
    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }
    if (data.campus_id != '' || data.campus_id != undefined) {
      campus_id = data.campus_id
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      organization_id = data.organization_id
    }
    if (data.course_id != '' || data.course_id != undefined) {
      course_id = data.course_id
    }
    if (data.category_id != '' || data.category_id != undefined) {
      category_id = data.category_id
    }

    if (data.start_time != '' && data.start_time != '') {
      start_time = data.start_time
      end_time = data.end_time
    }
    let config = {
      course_id: course_id ? course_id : self.$route.query.course_id,
      keyboard: keyboard,
      course_category_id: category_id
        ? category_id
        : self.$route.query.category_id,
      // course_id: course_id,
      page: self.page,
      type: self.type,
      start_time: start_time,
      end_time: end_time,
      organization_id: organization_id,
      schoole_id: campus_id,
      classroom_id: classroom_id
        ? classroom_id
        : self.$route.query.classroom_id,
      teacher_id: teacher_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getStudentManage,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.data) {
          if (item.create_time == '0' || item.create_time == null) {
            item.create_time = '---'
          } else {
            item.create_time = self.$moment
              .unix(item.create_time)
              .format('YYYY-MM-DD')
          }
        }
        self[name] = res.data.data
      },
    })
  },
  //学员转班
  exchangestudents(self, classroom_id) {
    let config = {
      intent_id: self.$route.query.intent_id,
      old_classroom_id: self.$route.query.classroom_id,
      new_classroom_id: classroom_id,
      course_students_id: self.$route.query.course_students_id,
    }
    console.log(config)
    axiosHttp({
      url: url.exchangestudents,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //学员批量转班接口
  batchchangestudents(self, classroom_id) {
    let config = {
      uid: self.$route.query.uid,
      old_classroom_id: parseInt(self.$route.query.classroom_id),
      new_classroom_id: parseInt(classroom_id),
      course_students_id: self.$route.query.course_students_id,
    }
    console.log(config)
    axiosHttp({
      url: url.batchchangestudents,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //移除学员接口
  removeLearner(self, uid) {
    let config = {
      uid: uid,
      classroom_id: parseInt(self.$route.query.classroom_id),
    }
    console.log(config)
    axiosHttp({
      url: url.removeLearner,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getclasstudents(self, 'schoolData')
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },

  //批量移除学员
  batchremove(self, uid) {
    let config = {
      uid: uid,
      classroom_id: parseInt(self.$route.query.classroom_id),
    }
    console.log(config)
    axiosHttp({
      url: url.batchremove,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //添加班级学员
  addstudents(self) {
    let config = {
      course_students_id: self.course_students_id,
      intent_id: self.intent_id,
      classroom_id: self.$route.query.classroom_id,
    }
    console.log(config)
    axiosHttp({
      url: url.addstudents,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //班级列表
  getClassroomList(self, name, data = {}) {
    let keyboard = ''
    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }

    let config = {
      course_id: self.$route.query.course_id,
      keyboard: keyboard,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getClassroomList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //获取班级群发短信记录
  getMessageInfo(self, name) {
    let config = {
      classroom_id: self.classroom_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getMessageInfo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //班级发送短信
  sendMessage(self, ruleForm) {
    let config = {
      classroom_id: self.classroom_id,
      type: ruleForm.type,
      title: ruleForm.title,
      content: ruleForm.content,
      teacher: ruleForm.teacher,
      time: ruleForm.time,
      address: ruleForm.address,
      remarks: ruleForm.remarks,
      uid_arr: ruleForm.uid_arr,
      wechat_notice: ruleForm.wechat_notice,
    }
    console.log(config)
    axiosHttp({
      url: url.sendMessage,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          ;(self.ruleForm = {
            title: '',
            type: '',
            teacher: '',
            time: '',
            content: '',
            address: '',
            remarks: '',
            uid_arr: '',
          }),
            self.$api.getMessageInfo(self, 'schoolData')
        }
      },
    })
  },
  //班级管理
  getCourseClass(self, name, data = {}) {
    let keyboard = ''
    let course_category_id = ''
    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }
    if (data.id != '' || data.id != undefined) {
      course_category_id = data.id
    }
    let config = {
      // course_id: 1,
      course_category_id: course_category_id,
      keyboard: keyboard,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getCourseClass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加班级
  addClass(self, ruleForm) {
    let config = {
      classroom_name: ruleForm.classroom_name,
      teacher_id: ruleForm.teacher_id,
      master_teacher_id: ruleForm.master_teacher_id,
      course_id: self.$route.query.course_id,
      class_icon: ruleForm.class_icon,
      describe: ruleForm.describe,
    }
    console.log(config)
    axiosHttp({
      url: url.addClass,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.push({
            path: '/eda/classDetail',
            query: {
              course_id: self.$route.query.course_id,
            },
          })
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //编辑班级接口

  getClassInfo(self, methods) {
    let config = {}
    let way = ''
    let a = self.$route.query.classroom_id
    let b = self.$route.query.way
    if (a != undefined) {
      self.classroom_id = a
    } else if (b != undefined) {
      self.classroom_id = b
    } else {
      console.log(classroom_id)
    }
    if (methods == 'POST') {
      way = 'POST'
      config = {
        classroom_id: self.classroom_id,
        classroom_name: self.ruleForm.classroom_name,
        teacher_id: self.ruleForm.teacher_id,
        master_teacher_id: self.ruleForm.master_teacher_id,
        course_id: self.ruleForm.course_id,
        class_icon: self.ruleForm.class_icon,
        describe: self.ruleForm.describe,
      }
    } else {
      way = 'GET'
      config = {
        classroom_id: self.$route.query.classroom_id,
      }
    }

    console.log(config)
    console.log(way)
    axiosHttp({
      url: url.getClassInfo,
      data: config,
      method: way,
      then(res) {
        console.log(res.data.data)

        if (way == 'GET') {
          let info = res.data.data
          self.ruleForm.classroom_name = info.classroom_name
          self.ruleForm.teacher_id = info.teacher_id
          self.ruleForm.master_teacher_id = info.master_teacher_id
          self.ruleForm.course_id = info.course_id
          self.url = info.class_icon
          self.ruleForm.class_icon = info.class_icon
          self.ruleForm.describe = info.describe
          self.haschoose = true
        } else {
          if (res.status == 200) {
            self.$message({
              type: 'success',
              message: res.data.message,
            })
            console.log(111)
            self.$router.push({
              path: '/eda/classDetail',
            })
          }
        }
      },
    })
  },
  //班级学员列表
  getclasstudents(self, name, data = {}) {
    let keyboard = ''
    let organization_id = ''
    let school_id = ''
    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      organization_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      school_id = data.institution_id
    }
    let config = {
      course_id: self.$route.query.course_id,
      class_id: self.$route.query.classroom_id,
      keyboard: keyboard,
      organization_id: organization_id,
      page: self.page,
      school_id: school_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getclasstudents,
      data: config,
      method: 'GET',
      then(res) {
        res.data.data.data.forEach((i) => {
          i.addChose = 0
        })
        console.log(res.data.data.data)
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //面授课室列表
  getSubscribeClassroomList(self, name, data = {}) {
    let subscribe_classroom_name = ''
    if (data.name != '' || data.name != undefined) {
      subscribe_classroom_name = data.name
    }

    let config = {
      problem_course_id: self.$route.query.problem_course_id,
      subscribe_classroom_name: subscribe_classroom_name,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getSubscribeClassroomList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加面授约课学生
  insertStudent(self, zx) {
    let config = {
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      uid: zx.uid,
      mobile: zx.mobile,
      realname: zx.realname,
      problem_course_id: self.$route.query.problem_course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.insertStudent,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },

  //黑名单列表
  getBlacklist(self, name, data = {}) {
    let institution_id = ''
    let realname = ''
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }

    let config = {
      problem_course_id: self.$route.query.problem_course_id,
      institution_id: institution_id,
      page: self.page,
      realname: realname,
    }
    console.log(config)
    axiosHttp({
      url: url.getBlacklist,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //可加入黑名单学生
  getBlackStudentsList(self, name, data = {}) {
    let institution_id = ''
    let nickname = ''
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.name != '' || data.name != undefined) {
      nickname = data.name
    }
    let config = {
      problem_course_id: self.$route.query.problem_course_id,
      institution_id: institution_id,
      page: self.page,
      nickname: nickname,
      // realname: realname,
    }
    console.log(config)
    axiosHttp({
      url: url.getBlackStudentsList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加黑名单
  insertBlacklist(self, uid) {
    let config = {
      problem_course_id: self.problem_course_id,
      uid: uid,
    }
    console.log(config)
    axiosHttp({
      url: url.insertBlacklist,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //移除黑名单
  removeBlacklist(self, blacklist_id) {
    let config = {
      blacklist_id: blacklist_id,
    }
    console.log(config)
    axiosHttp({
      url: url.removeBlacklist,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getBlacklist(self, 'schoolData')
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //获取该课程下的所有班级（不带分页）
  getCourseAllclass(self, name) {
    let config = {
      course_id: self.$route.query.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getCourseAllclass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)

        self[name] = res.data.data
      },
    })
  },
  //添加约课课室
  addSubscribeClassroom(self, ruleForm) {
    let config = {
      subscribe_classroom_name: ruleForm.subscribe_classroom_name,
      teacher_id: ruleForm.teacher_id,
      teacher_name: ruleForm.teacher_name,
      start_time: ruleForm.start_time,
      end_time: ruleForm.end_time,
      course_id: self.$route.query.problem_course_id,
      chapter_ids: ruleForm.chapter_ids.toString(),
      classroom_ids: ruleForm.classroom_ids.toString(),
      address: ruleForm.address,
      max_num: ruleForm.max_num,
      show_time: ruleForm.show_time,
      close_time: ruleForm.close_time,
    }
    console.log(config)
    axiosHttp({
      url: url.addSubscribeClassroom,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$api.getRecommender(self, 'schoolData')
          // for (let key in self.ruleForm) {
          //   self.ruleForm[key] = ''
          // }
          // self.dialogVisible = false
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //面授课室详情
  getSubscribeClassroomInfo(self) {
    let config = {
      subscribe_classroom_id: parseInt(
        self.$route.query.subscribe_classroom_id
      ),
    }
    console.log(config)
    axiosHttp({
      url: url.getSubscribeClassroomInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)

        let info = res.data.data.info
        self.ruleForm.subscribe_classroom_name = info.subscribe_classroom_name
        self.ruleForm.teacher_id = info.teacher_id
        self.ruleForm.teacher_name = info.teacher_name
        self.ruleForm.address = info.address
        self.ruleForm.max_num = info.max_num
        self.ruleForm.show_time = self.$moment
          .unix(info.show_time)
          .format('YYYY-MM-DD HH:mm:ss')
        self.ruleForm.close_time = self.$moment
          .unix(info.close_time)
          .format('YYYY-MM-DD HH:mm:ss')
        let start_time = self.$moment.unix(info.start_time).format('HH:mm:ss')
        self.ruleForm.start_time = self.$moment
          .unix(info.start_time)
          .format('YYYY-MM-DD HH:mm:ss')
        let end_time = self.$moment.unix(info.end_time).format('HH:mm:ss')
        self.ruleForm.end_time = self.$moment
          .unix(info.end_time)
          .format('YYYY-MM-DD HH:mm:ss')
        self.allTime = []
        self.allTime.push(start_time)
        self.allTime.push(end_time)
        self.alldate = self.$moment.unix(info.end_time).format('YYYY-MM-DD')
        let chapter_idStr = '[' + info.chapter_ids + ']'
        let chapter_idArr = eval('(' + chapter_idStr + ')')
        self.ruleForm.chapter_ids = chapter_idArr
        let classroom_idStr = '[' + info.classroom_ids + ']'
        let classroom_idArr = eval('(' + classroom_idStr + ')')
        self.ruleForm.classroom_ids = classroom_idArr
        console.log(self.ruleForm.classroom_ids)
      },
    })
  },
  //修改约课课室
  saveSubscribeClassroom(self, ruleForm) {
    let config = {
      subscribe_classroom_name: ruleForm.subscribe_classroom_name,
      teacher_id: ruleForm.teacher_id,
      teacher_name: ruleForm.teacher_name,
      start_time: ruleForm.start_time,
      end_time: ruleForm.end_time,
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      chapter_ids: ruleForm.chapter_ids.toString(),
      classroom_ids: ruleForm.classroom_ids.toString(),
      address: ruleForm.address,
      max_num: ruleForm.max_num,
      show_time: ruleForm.show_time,
      close_time: ruleForm.close_time,
    }
    console.log(config)
    axiosHttp({
      url: url.saveSubscribeClassroom,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$api.getRecommender(self, 'schoolData')
          // for (let key in self.ruleForm) {
          //   self.ruleForm[key] = ''
          // }
          // self.dialogVisible = false
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //预约学生列表
  getStudentList(self, name, data = {}) {
    let realname = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    let config = {
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      page: self.page,
      realname: realname,
      status: self.status,
    }
    console.log(config)
    axiosHttp({
      url: url.getStudentList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          if (item.create_time == '0' || item.create_time == null) {
            item.create_time = '---'
          } else {
            item.create_time = self.$moment
              .unix(item.create_time)
              .format('YYYY-MM-DD HH:mm:ss')
          }
          switch (item.from) {
            case 1:
              item.from = '后台添加'
              break
            case 2:
              item.from = '小程序'
              break
            case 3:
              item.from = 'PC端'
              break
            case 4:
              item.from = '移动端'
              break
            default:
              item.from = '未知'
          }
        }
        let data = res.data.data.list
        console.log(data)
        if (self.isTagactive == 5) {
          let missedList = []
          missedList = data.map((i) => {
            if (i.missed == 1) {
              return i
            }
          })
          console.log(missedList[0])
          if (missedList[0] == undefined) {
            self[name] = []
          } else {
            self[name] = missedList
          }
        } else {
          self[name] = data
        }
      },
    })
  },
  //更新学生状态
  updateStudentStatus(self, status) {
    let config = {
      student_id: parseInt(self.student_id),
      status: status,
    }
    console.log(config)
    axiosHttp({
      url: url.updateStudentStatus,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStudentList(self, 'schoolData')
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //生产签到二维码
  getQrCode(self, ruleForm) {
    let config = {
      subscribe_classroom_id: parseInt(
        self.$route.query.subscribe_classroom_id
      ),
      pages: 'index/index',
    }
    console.log(config)
    axiosHttp({
      url: url.getQrCode,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.img_url = res.data.data.info.img_url
          // self.$api.getStudentList(self, 'schoolData')
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  // 群发短信
  batchSendMessage(self, ruleForm) {
    let config = {
      subscribe_classroom_id: parseInt(
        self.$route.query.subscribe_classroom_id
      ),
      address: ruleForm.address,
      remark: ruleForm.remark,
    }
    console.log(config)
    axiosHttp({
      url: url.batchSendMessage,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$api.getStudentList(self, 'schoolData')
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //面授约课短信详情和记录列表
  getSubMessageInfo(self, name, data = {}) {
    let realname = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    let config = {
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      course_category_id: self.$route.query.course_category_id,
      course_id: self.$route.query.course_id,
      realname: realname,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getSubMessageInfo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data)
        self[name] = res.data.data.list
        self.ruleForm = res.data.data.detail
      },
    })
  },
  //面授约课群发短信(新)
  sendSubMessage(self, name) {
    let config = {
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      address: self.address,
      remarks: self.remarks,
    }
    console.log(config)
    axiosHttp({
      url: url.sendSubMessage,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          ;(self.address = ''),
            (self.remarks = ''),
            self.$api.getSubMessageInfo(self, 'schoolData')
        }
      },
    })
  },
  //额外学生列表
  getAdditionalStudentList(self, name, data = {}) {
    let realname = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    let config = {
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      course_id: self.$route.query.course_id,
      realname: realname,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getAdditionalStudentList,
      data: config,
      method: 'GET',
      then(res) {
        self[name] = res.data.data
      },
    })
  },

  //添加校区
  addBlock(self, ruleForm) {
    let config = {
      parent_id: ruleForm.parent_id,
      institution_name: ruleForm.institution_name,
    }
    console.log(config)
    axiosHttp({
      url: url.addBlock,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getRecommender(self, 'schoolData')
          for (let key in self.ruleForm) {
            self.ruleForm[key] = ''
          }
          self.dialogVisible = false
          // self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //推荐机构详情
  organizationDetail(self, institution_id) {
    let config = {
      institution_id: institution_id,
    }
    console.log(config)
    axiosHttp({
      url: url.organizationDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let info = res.data.data.info
        self.ruleForm.account = info.account
        self.ruleForm.host_man = info.host_man
        self.ruleForm.institution_name = info.institution_name
        self.ruleForm.telephone = info.telephone
        // self[name] = res.data.data
      },
    })
  },
  //修改机构
  modifyOrganization(self, ruleForm) {
    let config = {
      institution_id: self.institution_id,
      institution_name: ruleForm.institution_name,
      host_man: ruleForm.host_man,
      telephone: ruleForm.telephone,
      account: ruleForm.account,
      password: self.password,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyOrganization,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //修改校区
  modifyBlock(self, ruleForm) {
    let config = {
      institution_id: ruleForm.parent_id,
      institution_name: ruleForm.institution_name,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyBlock,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getRecommender(self, 'schoolData')
          for (let key in self.ruleForm) {
            self.ruleForm[key] = ''
          }
          self.dialogVisible = false
          // self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
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
  //班主任列表
  getHeadMaster(self, name) {
    let config = {
      // page: 1,
    }
    console.log(config)
    axiosHttp({
      url: url.getHeadMaster,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加课程
  addCourses(self, ruleForm) {
    let config = {
      is_topping: parseInt(ruleForm.is_topping),
      course_name: ruleForm.course_name,
      course_category_id: parseInt(ruleForm.course_category_id),
      teacher_id: parseInt(ruleForm.teacher_id),
      video_collection_id: parseInt(ruleForm.video_collection_id),
      problem_course_id: parseInt(ruleForm.problem_course_id),
      sale_type: parseInt(ruleForm.sale_type),
      is_hot: parseInt(ruleForm.is_hot),
      course_price: parseFloat(ruleForm.course_price),
      past_price: parseFloat(ruleForm.past_price),
      index_category_id: parseInt(ruleForm.index_category_id),
      fictitious_num: parseInt(ruleForm.fictitious_num),
      cover_img: ruleForm.cover_img,
      edu_qr_code: ruleForm.edu_qr_code,
      is_publish: parseInt(ruleForm.is_publish),
      is_fictitious: ruleForm.is_fictitious,
      sort: parseInt(ruleForm.sort),
      introduction: ruleForm.introduction,
      class_type: parseInt(ruleForm.class_type),
      include_course_ids: ruleForm.include_course_ids,
      brief: ruleForm.brief,
      free_sort: ruleForm.free_sort,
      hot_sort: ruleForm.hot_sort,
    }
    console.log(config)
    axiosHttp({
      url: url.addCourses,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$api.getRecommender(self, 'schoolData')
          // for (let key in self.ruleForm) {
          //   self.ruleForm[key] = ''
          // }
          // self.dialogVisible = false
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //删除课程
  deleteCourses(self, course_id) {
    let config = {
      course_id: parseInt(course_id),
    }
    axiosHttp({
      url: url.deleteCourses,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getCourseManage(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //批量发布,批量关闭
  bashPublish(self, course_id, status) {
    let config = {
      course_ids: course_id,
      is_publish: status,
    }
    console.log(config)
    axiosHttp({
      url: url.bashPublish,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.getCourseManage(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$api.getRecommender(self, 'schoolData')
          // for (let key in self.ruleForm) {
          //   self.ruleForm[key] = ''
          // }
          // self.dialogVisible = false
          // self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //批量删除
  bashDelete(self, course_id) {
    let config = {
      course_ids: course_id,
      // is_publish: status,
    }
    console.log(config)
    axiosHttp({
      url: url.bashDelete,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.getCourseManage(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //获取关联课程
  getSingleCourses(self, name) {
    // let config = {
    //   id: id,
    // }
    // console.log(config)
    axiosHttp({
      url: url.getSingleCourses,
      // data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)

        // self.ruleForm.host_man = info.host_man
        // self.ruleForm.institution_name = info.institution_name
        // self.ruleForm.telephone = info.telephone
        self[name] = res.data.data.list
      },
    })
  },
  //课程详情
  getCoursesDetail(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.getCoursesDetail,
      data: config,
      method: 'GET',
      then(res) {
        let info = res.data.data.info
        console.log(info)
        // self.ruleForm = info
        self.ruleForm.is_topping = info.is_topping
        self.ruleForm.course_name = info.course_name
        self.ruleForm.course_category_id = info.course_category_id
        self.ruleForm.teacher_id = info.teacher_id
        self.ruleForm.video_collection_id = info.video_collection_id
        self.ruleForm.problem_course_id = info.problem_course_id
        self.ruleForm.sale_type = info.sale_type
        self.ruleForm.course_price = info.course_price
        self.ruleForm.past_price = info.past_price
        self.ruleForm.index_category_id = info.index_category_id
        self.ruleForm.fictitious_num = info.fictitious_num
        self.ruleForm.cover_img = info.cover_img
        self.ruleForm.is_hot = info.is_hot
        self.ruleForm.introduction = info.introduction
        self.ruleForm.edu_qr_code = info.edu_qr_code
        self.ruleForm.is_fictitious = info.is_fictitious
        self.ruleForm.sort = info.sort
        self.ruleForm.include_course_ids = info.include_course_ids
        self.ruleForm.class_type = info.class_type
        self.ruleForm.brief = info.brief
        self.ruleForm.free_sort = info.free_sort
        self.ruleForm.hot_sort = info.hot_sort
        self.editor.txt.html(info.introduction)
        if (info.course_category_id != '' && self.$route.query.setMeal == 1) {
          //课程题库列表
          self.$api.getProblemCourseList(self, 'questionBank')
          //视屏列表
          self.$api.videocollectionlist(self, 'videoData')
        }
        //chapterIds中字符串转数组的方法eval()
        //  let Str = '[' + info.chapterIds + ']'
        //  let Arr = eval('(' + Str + ')')
        self.chapterCo = info.include_course_ids
        console.log(info.cover_img)
        if (info.cover_img != '') {
          self.haschoose = true
          self.url = info.cover_img
        } else {
          self.haschoose = false
          self.url = ''
        }
        var _self = self

        let _obj = {}
        let i = 0
        self.courseData.forEach((v, k) => {
          // console.log(11)
          _self.chapterCo.forEach((vo, key) => {
            if (v.course_id == vo) {
              var _temp = {}
              _temp['course_id'] = v.course_id
              _temp['course_name'] = v.course_name
              //console.log(_temp)
              _obj[i] = _temp
              i++
            }
          })
          console.log(_obj)
        })
        self.taglist = _obj
        self.ruleForm.include_course_ids = info.include_course_ids
        console.log(info.include_course_ids)
        self.chapterTags = self.chapterCo
        // self.ruleForm.host_man = info.host_man
        // self.ruleForm.institution_name = info.institution_name
        // self.ruleForm.telephone = info.telephone
        // self[name] = res.data.data
      },
    })
  },
  //修改课程
  modifyCourse(self, ruleForm) {
    let config = {
      is_topping: parseInt(ruleForm.is_topping),
      course_id: parseInt(self.course_id),
      course_name: ruleForm.course_name,
      course_category_id: parseInt(ruleForm.course_category_id),
      teacher_id: parseInt(ruleForm.teacher_id),
      video_collection_id: parseInt(ruleForm.video_collection_id),
      problem_course_id: parseInt(ruleForm.problem_course_id),
      sale_type: parseInt(ruleForm.sale_type),
      is_hot: parseInt(ruleForm.is_hot),
      course_price: parseFloat(ruleForm.course_price),
      past_price: parseFloat(ruleForm.past_price),
      index_category_id: parseInt(ruleForm.index_category_id),
      fictitious_num: parseInt(ruleForm.fictitious_num),
      cover_img: ruleForm.cover_img,
      edu_qr_code: ruleForm.edu_qr_code,
      is_publish: parseInt(ruleForm.is_publish),
      is_fictitious: ruleForm.is_fictitious,
      sort: ruleForm.sort,
      introduction: ruleForm.introduction,
      class_type: parseInt(ruleForm.class_type),
      include_course_ids: ruleForm.include_course_ids,
      brief: ruleForm.brief,
      free_sort: ruleForm.free_sort,
      hot_sort: ruleForm.hot_sort,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyCourse,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$store.commit('SET_PAGENUM', self.lastPage)
          // eventBus.$emit('lastPageNum', self.lastPage)
          self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //课程资料列表
  getFileList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      course_id: self.$route.query.course_id,
      page: self.page,
    }
    axiosHttp({
      url: url.getFileList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //批量排序课程资料
  courseFileSort(sortAry, self) {
    // let chapter_name = ''
    // if (data.name != '' || data.name != undefined) {
    //   chapter_name = data.name
    // }
    let config = {
      sortAry: sortAry,
    }
    axiosHttp({
      url: url.courseFileSort,
      data: config,
      // method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getFileList(self, 'schoolData')
        }
        // console.log(res.data.data)
        // self[name] = res.data.data
      },
    })
  },
  //修改课程资料
  alterFileList(self, name) {
    let config = {
      course_file_id: self['ruleForm'].course_file_id,
      file_name: self['ruleForm'].file_name,
      sort: self['ruleForm'].sort,
      file: self['ruleForm'].file,
    }
    console.log(config)
    axiosHttp({
      url: url.alterFileList,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '提交成功!',
          })
          self['dialogEditor'] = false
        }
      },
    })
  },
  //批量删除
  deleteFile(self, course_file_id) {
    let config = {
      course_file_id: course_file_id,
      // is_publish: status,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteFile,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.getFileList(self, 'schoolData')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //课程资料详情
  flieInfo(self, file_id) {
    let config = {
      file_id: file_id,
    }
    console.log(config)
    axiosHttp({
      url: url.flieInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self.$api.getFileList(self, 'schoolData')
          // self.$message({
          //   type: 'success',
          //   message: res.data.message,
          // })
          let data = res.data.data
          self.ruleForm.file_name = data.file_name
          self.ruleForm.sort = data.sort
          self.ruleForm.oss_name = data.oss_name
          self.ruleForm.oss_url = data.oss_url
          self.icon = data.oss_url
          self.ruleForm.suffix = data.suffix
          self.ruleForm.course_file_id = data.course_file_id
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //添加课程资料
  addAppendFile(self, ruleForm) {
    let config = {
      course_id: self.$route.query.course_id,
      file_name: ruleForm.file_name,
      file: ruleForm.file,
      sort: parseInt(ruleForm.sort),
    }
    console.log(config)
    axiosHttp({
      url: url.addAppendFile,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getFileList(self, 'schoolData')
          // for (let key in self.ruleForm) {
          //   self.ruleForm[key] = ''
          // }
          self.dialogVisible = false
          // self.$router.go(-1)
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },

  /**
   * 视频加密
   * @param {*} self
   * @param {*} name
   */
  generateDataKey(self) {
    let config = {
      video_id: self.courseTimeForm.mediaId,
    }
    axiosHttp({
      url: url.generateDataKey,
      data: config,
      then(res) {
        if (self.zCourseTime) {
          // 修改
          // self.$api.saveCourseLesson(self);
        } else {
          // 新增
          // self.$api.addCourseLesson(self);
        }
      },
    })
  },
  /**
   * 视频加密 直播回顾
   * @param {*} self
   * @param {*} name
   */
  generateDataKeyLive(self) {
    let config = {
      videoId: self.courseTimeForm.mediaId,
    }

    axiosHttp({
      url: url.generateDataKey,
      data: config,
      then(res) {
        if (self.editId) {
          self.$api.saveLiveVideo(self)
        } else {
          self.$api.addLiveVideo(self)
        }
      },
    })
  },
  clearCache(self) {
    let config = {}
    console.log('你出发了')
    axiosHttp({
      url: url.clearCache,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '缓存已清除',
          })
        }
      },
    })
  },
  huanfu(self) {
    // let config = {}
    // axiosHttp({
    //   url: '@/styles/variables.scss',
    //   data: config,
    //   method: 'GET',
    //   then(res) {
    //     console.log(res)
    //   },
    // })
    axios({
      method: 'GET',
      url: '@/styles/variables.scss',
      data: '',
      then(data) {
        console.log(data)
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
  statiSys,
  schManage,
  visualization,
  videoManger,
  miniPro,
  loginApi
)
export default api
