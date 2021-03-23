import { axiosHttp, v, url } from '@/assets/js/apiCommon'
let resource = {
  getTeachBooksList(self, name, data) {
    let config = {
      page: self.page,
      //   category_name: category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getTeachBooksList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //教室列表
  getRoomList(self, name, data) {
    let config = {
      page: self.page,
      //   category_name: category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getRoomList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //教室列表
  getRoomSelect(self, name, data) {
    let config = {
      // page: self.page,
      //   category_name: category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getRoomSelect,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //添加教室
  createRoom(self, ruleForm) {
    let config = {
      page: self.page,
      room_name: ruleForm.room_name,
      address: ruleForm.address,
      comment: ruleForm.comment,
      max_num: ruleForm.max_num,
    }
    console.log(config)
    axiosHttp({
      url: url.createRoom,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          if (self.addChecked) {
            self.addChecked = false
            self.$api.getRoomList(self, 'schoolData')
            for (var i in self.ruleForm) {
              self.ruleForm[i] = ''
            }
          } else {
            self.classVisible = false
            self.$api.getRoomList(self, 'schoolData')
          }
        }
        // self[name] = res.data.data
      },
    })
  },
  //修改教室
  updateRoom(self, ruleForm) {
    let config = {
      page: self.page,
      id: ruleForm.id,
      room_name: ruleForm.room_name,
      address: ruleForm.address,
      comment: ruleForm.comment,
      max_num: ruleForm.max_num,
    }
    console.log(config)
    axiosHttp({
      url: url.updateRoom,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.classVisible = false
          self.$api.getRoomList(self, 'schoolData')
        }
        // self[name] = res.data.data
      },
    })
  },
  //删除教室
  deleteRoom(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteRoom,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getRoomList(self, 'schoolData')
        }
      },
    })
  },
  //删除教室
  updateRoomStatus(self, id, status) {
    let config = {
      id: id,
      status: status,
    }
    console.log(config)
    axiosHttp({
      url: url.updateRoomStatus,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })

          self.$api.getRoomList(self, 'schoolData')
        }
      },
    })
  },
  //校区列表
  getSchoolList(self, name) {
    let config = {
      // institution_name: institution_name,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getSchoolList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data

          // self.$message({
          //   type: 'success',
          //   message: res.data.message,
          // })
          // self.$api.getRoomList(self, 'schoolData')
        }
      },
    })
  },
  //校区状态修改

  changeUpdateStatus(self, id, status) {
    let config = {
      id: id,
      account_status: status,
    }
    console.log(config)
    axiosHttp({
      url: url.changeUpdateStatus,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })

          self.$api.getSchoolList(self, 'schoolData')
        }
      },
    })
  },
  //校区排序
  changeUpdateSort(self, id, sort) {
    let config = {
      id: id,
      sort: sort,
    }
    console.log(config)
    axiosHttp({
      url: url.changeUpdateSort,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getSchoolList(self, 'schoolData')
        }
      },
    })
  },
  //项目列表
  getProjectList(self, name) {
    let config = {
      page: 1,
      page: self.pageNum,
      ...self.searchData,
      category_id: self.searchData.category_id.pop(),
    }
    console.log(config)
    axiosHttp({
      url: url.getProjectList,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //项目不带分页
  getProjectSub(self, index) {
    let config = {
      // page: 1,
      // page: self.pageNum,
      // ...self.searchData,
      // category_id: self.searchData.category_id.pop(),
    }
    console.log(config)
    axiosHttp({
      url: url.getProjectSub,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          console.log(res.data.data)
          self.cloneData(data, self.projectData, 'project_id', 'project_name')
          console.log(self.projectData)
          self.searchOptions[index].options = self.projectData
          console.log(self.searchOptions[index], index)
        }
      },
    })
  },
  //添加项目
  createProject(self, ruleForm) {
    let config = {
      project_name: ruleForm.project_name,

      category_id: Array.isArray(self.ruleForm.category_id)
        ? self.ruleForm.category_id.pop()
        : self.ruleForm.category_id,
      price: parseFloat(ruleForm.price),
      lowest_price: parseFloat(ruleForm.lowest_price),
      service_type: ruleForm.service_type,

      service_period: ruleForm.service_period,
      service_effective: ruleForm.service_effective,
      course: ruleForm.course,
      problem: ruleForm.problem,
      textbooks: ruleForm.textbooks,
      status: ruleForm.status,
      applay: parseInt(ruleForm.applay),
      school: ruleForm.school,
    }
    // console.log(config)
    axiosHttp({
      url: url.createProject,
      data: config,
      // method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getProjectList(self, 'schoolData')
          self.dialogVisible = false
        }
      },
    })
  },
  //删除项目接口
  deleteproject(self, project_id) {
    let config = {
      project_id: project_id,
    }
    // console.log(config)
    axiosHttp({
      url: url.deleteproject,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getProjectList(self, 'schoolData')
          self.dialogVisible = false
        }
      },
    })
  },
  //编辑项目接口
  editProject(self, ruleForm, way) {
    let config = {}
    if (way == 'GET') {
      config = {
        project_id: ruleForm.project_id,
      }
    } else {
      config = {
        project_id: ruleForm.id || ruleForm.project_id,
        project_name: ruleForm.project_name,
        category_id: parseInt(ruleForm.category_id),
        price: parseFloat(ruleForm.price),
        lowest_price: parseFloat(ruleForm.lowest_price),
        service_type: ruleForm.service_type,

        service_period: ruleForm.service_period,
        service_effective: ruleForm.service_effective,
        course: ruleForm.course,
        problem: ruleForm.problem,
        textbooks: ruleForm.textbooks,
        status: ruleForm.status,
        applay: parseInt(ruleForm.applay),
        school: ruleForm.school,
      }
    }

    console.log(config)
    axiosHttp({
      url: url.editProject,
      data: config,
      method: way,
      then(res) {
        if (res.data.code == 0) {
          let data = res.data.data
          if (way == 'GET') {
            console.log(data)
            self.ruleForm = data
          } else {
            self.$message({
              type: 'success',
              message: res.data.message,
            })
            self.$api.getProjectList(self, 'schoolData')
            self.dialogVisible = false
          }
        }
      },
    })
  },
  //分类下拉列表
  getcategorytree(self, index) {
    let config = {
      // page: self.page,
      // index_category_name: index_category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getcategorytree,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          console.log(res.data.data)
          self.cloneData(data, self.selectData, 'category_id', 'category_name')

          self.$set(self.searchOptions[index].attrs, 'options', self.selectData)
          console.log(self.selectData)
          // self.searchOptions[index].options = self.selectData
          console.log(self.searchOptions[index], index)
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
  //视频集合列表
  videocollectionlist(self, name, data) {
    // console.log(data)
    // let course_category_id = '',
    //   keyboard = ''

    // if (data != undefined && data != '') {
    //   console.log(data.id)
    //   course_category_id = data.id
    //   keyboard = data.name
    // }
    // console.log(self.ruleForm.course_category_id)
    // let course_category = self.ruleForm.course_category_id
    // if (course_category != '' && course_category != undefined) {
    //   course_category_id = course_category
    // }
    let config = {
      // course_category_id: course_category_id,
      // keyboard: keyboard,
      // page: self.page,
    }
    axiosHttp({
      url: url.videocollectionlist,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data // this
        console.log(self[name])
      },
    })
  },
  //关联题库
  getProblemCourseList(self, name, data = {}) {
    // let course_names = ''
    // if (data.name != '' || data.name != undefined) {
    //   course_names = data.name
    // }
    // let category_id = ''
    // if (
    //   self.ruleForm.course_category_id != undefined &&
    //   self.ruleForm.course_category_id != ''
    // ) {
    //   category_id = self.ruleForm.course_category_id
    // }
    // if (self.keytype) {
    // }
    let config = {
      // page: self.page,
      // course_name: course_names,
      // category_id: self.keytype || 0 || category_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemCourseList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
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
  //school里的推荐机构列表
  getRecommenderSearch(self, name, data = {}) {
    let institution_name = ''
    if (data.name != '' || data.name != undefined) {
      institution_name = data.name
    }

    let config = {
      // page: self.page,
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
}
export default resource
