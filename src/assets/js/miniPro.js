import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
let minipro = {
  bannerList(self, name, data) {
    let banner_name = ''
    if (data != undefined) {
      banner_name = data.name
    }
    let config = {
      page: self.page,
      banner_name: banner_name,
    }
    console.log(config)
    axiosHttp({
      url: url.bannerList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  bannerInfo(self, id) {
    let config = {
      banner_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.bannerInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          // self.defaultAddClassifyPicture = res.data.data.info
          self.swiperForm = res.data.data.info
          self.swiperForm.category_id = res.data.data.info.course_category_id
          self.swiperForm.image_id = res.data.data.info.image_id
          self['url'] = res.data.data.info.image_url

          self.$api.forBanner(
            self,
            res.data.data.info.course_category_id,
            res.data.data.info.course_id
          )
        }
      },
    })
  },
  studentData(self, name, data) {
    let banner_name = ''
    if (data != undefined) {
      banner_name = data.name
    }
    let config = {
      page: '',
      name: banner_name,
    }
    console.log(config)
    axiosHttp({
      url: url.studentData,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          self[name] = res.data.data
          self.studentData = res.data.data
        }
      },
    })
  },
  bannerDelete(self, id) {
    let config = {
      banner_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.bannerDelete,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$api.bannerList(self, 'classfi')
          self.$message({
            type: 'success',
            message: '删除成功',
          })
        }
      },
    })
  },
  bannerAdd(self, name) {
    let config = {
      banner_name: self[name].banner_name,
      image_id: self[name].image_id,
      course_id: self[name].course_id,
    }
    console.log(self[name])
    axiosHttp({
      url: url.bannerAdd,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$api.bannerList(self, 'classfi')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.swiperVisible = false
        }
      },
    })
  },
  forBanner(self, id, course_id) {
    let config = {
      course_category_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.forBanner,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.editPicCourse = res.data.data
          if (course_id) {
            self.editPicCourse.course_id = course_id
          }
        }
      },
    })
  },
  modifybanner(self) {
    let config = {
      banner_id: self.banner_id,
      banner_name: self.swiperForm.banner_name,
      image_id: self.swiperForm.image_id,
      course_id: self.swiperForm.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.modifybanner,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.bannerList(self, 'classfi')
          self.$message({
            type: 'success',
            message: res.data.message,
          })

          self.swiperVisible = false
        }
      },
    })
  },
  bannerSort(banner_id, sort, self) {
    let config = {
      banner_id: parseInt(banner_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.bannerSort,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.bannerList(self, 'classfi')
        }
      },
    })
  },
  getNoticeConfigList(self, name) {
    let config = {}
    axiosHttp({
      url: url.getNoticeConfigList,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  //添加消息提醒
  createNoticeConfig(self, remindDetail) {
    let config = {
      notice_id: remindDetail.notice_id,
      content: remindDetail.content,
      week: remindDetail.week_arr,
      specific_time: remindDetail.specific_time,
    }
    axiosHttp({
      url: url.createNoticeConfig,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.remindDialogVisible = false
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getNoticeConfigList(self, 'NoticeConfig')
          // self[name] = res.data.data
        }
      },
    })
  },
  getNoticeList(self, name) {
    let config = {
      // notice_id: remindDetail.notice_id,
      // content: remindDetail.content,
      // week: remindDetail.week,
      // specific_time: remindDetail.specific_time,
    }
    axiosHttp({
      url: url.getNoticeList,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  getAppletMessageRecordList(self, name, data = {}) {
    let start_time = ''
    let end_time = ''
    if (data.start_time != '' && data.start_time != '') {
      start_time = data.start_time
      end_time = data.end_time
    }
    let config = {
      page: self.page,
      limit: 20,
      start_time: start_time,
      end_time: end_time,
    }
    console.log(config)
    axiosHttp({
      url: url.getAppletMessageRecordList,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  updateNoticeConfig(self, remindDetail) {
    let config = {
      id: remindDetail.id,
      notice_id: remindDetail.notice_id,
      content: remindDetail.content,
      week: remindDetail.week_arr,
      specific_time: remindDetail.specific_time,
    }
    axiosHttp({
      url: url.updateNoticeConfig,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.remindDialogVisible = false
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getNoticeConfigList(self, 'NoticeConfig')
          // self[name] = res.data.data
        }
      },
    })
  },
  updateNoticeConfigStatus(self, remindDetail) {
    let config = {
      id: remindDetail.id,
      status: remindDetail.status,
    }
    axiosHttp({
      url: url.updateNoticeConfigStatus,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.remindDialogVisible = false
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getNoticeConfigList(self, 'remindData')
          // self[name] = res.data.data
        }
      },
    })
  },
  remindInfo(self, name, id) {
    let config = {
      problem_remind_id: id,
    }
    axiosHttp({
      url: url.remindInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data.info
        }
      },
    })
  },
  modifyproblemRemind(self, name) {
    let config = {
      problem_remind_id: self[name].problem_remind_id,
      remind_content: self[name].remind_content,
      cozy_remind: self[name].cozy_remind,
      clock: self[name].clock,
      frequency: self.checkeddays,
    }
    axiosHttp({
      url: url.modifyproblemRemind,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.getNoticeConfigList(self, 'remindData')
          self.$message({
            type: 'success',
            message: '编辑成功',
          })
          self.remindDialogVisible = false
        }
      },
    })
  },
  courseScore(self, name, data) {
    let name_content = ''
    if (data != undefined) {
      name_content = data.name
    }
    let config = {
      name_content: name_content,
      page: self.page,
    }
    axiosHttp({
      url: url.courseScore,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  courseScoreBashDelete(id, self) {
    let ids = []
    ids.push(id)
    let config = {
      ids: ids,
    }
    console.log(config)
    axiosHttp({
      url: url.courseScoreBashDelete,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.courseScore(self, 'commentData')
          self.$message({
            type: 'success',
            message: '删除成功！',
          })
        }
      },
    })
  },
  multiDeleteComment(self, ids) {
    let config = {
      ids: ids,
    }
    console.log(config)
    axiosHttp({
      url: url.courseScoreBashDelete,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.courseScore(self, 'commentData')
          self.$message({
            type: 'success',
            message: '删除成功！',
          })
        }
      },
    })
  },
  courseScoreBashPublish(self, ids) {
    let config = {
      ids: ids,
    }
    console.log(config)
    axiosHttp({
      url: url.courseScoreBashPublish,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.courseScore(self, 'commentData')
          self.$message({
            type: 'success',
            message: '发布成功！',
          })
        }
      },
    })
  },
  adminList(self, name) {
    let config = {}
    axiosHttp({
      url: url.adminSet,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  //获取各项配置信息
  getTotalConfigInfo(self, name) {
    // let name_content = ''
    // if (data != undefined) {
    //     name_content = data.name
    // }
    // let config = {
    //   name_content: name_content,
    //   page: self.page,
    // }
    axiosHttp({
      url: url.getTotalConfigInfo,
      // data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },

  getConfigDetail(self, name) {
    let config_id = parseInt(self.$route.query.config_id)
    let config = {
      config_id: config_id,
    }
    axiosHttp({
      url: url.getConfigDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)

        if (res.data.code == 0) {
          // self[name] = res.data.data
          switch (config_id) {
            case 4:
              self.ruleForm = res.data.data.contact_us
              break
            case 3:
              self.ruleForm = res.data.data.about_us
              break
            case 2:
              self[name] = res.data.data
              self.course_page_advert = res.data.data.course_page_advert
              self.open_class_page_advert = res.data.data.open_class_page_advert
              self.search_page_advert = res.data.data.search_page_advert
              self.teacher_page_advert = res.data.data.teacher_page_advert
              break
            case 1:
              self[name] = res.data.data
              let data = res.data.data
              self.home_page_advert = data.home_page_advert
              if (data.home_page_logo.img == '') {
                self.headUrl = ''
                self.headLog = false
              } else {
                self.headUrl = data.home_page_logo.img
                self.headLog = true
              }
              if (data.home_page_advert.img == '') {
                self.home_page_advert.img = ''
                self.banerLog = false
              } else {
                self.home_page_advert.img = data.home_page_advert.img
                self.banerLog = true
              }
              break
          }
        }
      },
    })
  },
  updateConfig(self, config_json) {
    let config_id = parseInt(self.$route.query.config_id)
    let config = {
      config_id: config_id,
      config_json: JSON.stringify(config_json),
      keyword: self.keyword,
    }
    console.log(config)
    axiosHttp({
      url: url.updateConfig,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '编辑成功',
          })
          console.log(config_id)
          switch (config_id) {
            case 1:
              self.$api.getConfigDetail(self, 'allData')
              console.log(11)
              break
            case 2:
              self.$router.go(-1)
              break
          }
        }
      },
    })
  },
  //菜单管理列表
  getMenuList(self, name) {
    // let config_id = parseInt(self.$route.query.config_id)
    let config = {
      // config_id: config_id,
    }
    axiosHttp({
      url: url.getMenuList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        self[name] = data
      },
    })
  },
  //获取菜单下拉列表接口
  getThumbMenuList(self, name) {
    // let config_id = parseInt(self.$route.query.config_id)
    let config = {
      // config_id: config_id,
    }
    axiosHttp({
      url: url.getThumbMenuList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        self[name] = data
      },
    })
  },
  //获取菜单详情
  getMenuDetail(self, id) {
    let config = {
      id: id,
    }
    axiosHttp({
      url: url.getMenuDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        self.ruleForm.menu_name = data.menu_name
        //对数组进行倒序处理
        let arr = data.parent_id_arr
        if (data.menu_type == 1) {
          //菜单对上级目录进行反选
          arr.reverse()
          if (arr.length > 1) {
            arr.splice(0, 1)
            arr.push(data.id)
          }
        } else {
          //功能对上级目录进行反选
          arr.reverse()
          if (arr.length > 1) {
            arr.splice(0, 1)
          }
        }

        console.log(data.parent_id_arr)
        self.parent_id_arr = data.parent_id_arr
        self.ruleForm.parent_id = data.parent_id
        self.ruleForm.node = data.node
        self.ruleForm.auth = data.auth
        self.ruleForm.icon = data.icon
        self.ruleForm.sort = data.sort
        self.ruleForm.menu_type = data.menu_type
      },
    })
  },
  //添加菜单
  createMenuData(self, ruleForm) {
    let config = {
      menu_name: ruleForm.menu_name,
      parent_id: ruleForm.parent_id,
      node: ruleForm.node,
      auth: ruleForm.auth,
      icon: ruleForm.icon,
      sort: ruleForm.sort,
      menu_type: ruleForm.menu_type,
    }
    axiosHttp({
      url: url.createMenuData,
      data: config,

      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisible = false
          self.$api.getMenuList(self, 'schoolData')
        }
      },
    })
  },
  //修改菜单
  updateMenuData(self, ruleForm) {
    let config = {
      id: ruleForm.id,
      menu_name: ruleForm.menu_name,
      parent_id: ruleForm.parent_id,
      node: ruleForm.node,
      auth: ruleForm.auth,
      icon: ruleForm.icon,
      sort: ruleForm.sort,
      menu_type: ruleForm.menu_type,
    }
    axiosHttp({
      url: url.updateMenuData,
      data: config,
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisible = false
          self.$api.getMenuList(self, 'schoolData')
        }
      },
    })
  },
  //修改菜单启用状态
  updateStatus(self, ruleForm) {
    let config = {
      id: ruleForm.id,
      menu_status: self.menu_status,
    }
    axiosHttp({
      url: url.updateStatus,
      data: config,
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.dialogVisible = false
          self.$api.getMenuList(self, 'schoolData')
        }
      },
    })
  },
  //删除菜单
  deleteMenuData(self, id) {
    // let config_id = parseInt(self.$route.query.config_id)
    let config = {
      id: id,
    }
    axiosHttp({
      url: url.deleteMenuData,
      data: config,

      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getMenuList(self, 'schoolData')
        }
        // console.log(res.data.data)
        // let data = res.data.data
        // self[name] = data
      },
    })
  },
  //修改菜单排序
  updateSort(id, sort, self) {
    // let config_id = parseInt(self.$route.query.config_id)
    let config = {
      id: id,
      sort: sort,
    }
    axiosHttp({
      url: url.updateSort,
      data: config,

      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getMenuList(self, 'schoolData')
        }
      },
    })
  },
  //获取各项配置信息
  getSmsList(self, name) {
    let config = {
      type: self.searchData.type,
      title: self.searchData.title,
      classroom_name: self.searchData.classroom_name,
      page: self.page,
    }
    axiosHttp({
      url: url.getSmsList,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
}
export default minipro
