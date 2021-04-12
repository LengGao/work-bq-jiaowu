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
  getRoomList(self, name, data = {}) {
    var room_name = ''
    if (data.name != '' || data.name != undefined) {
      room_name = data.name
    }
    let config = {
      page: self.page,
      room_name: room_name,
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
      institution_name: institution_name,
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

          self.getSchoolList()
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
          self.getSchoolList(self)
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
  //班级不带分页
  getcourseallclass(self, id, name) {
    let config = {
      category_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.getcourseallclass,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          console.log(data)
          self[name] = data

          // console.log(res.data.data)
          // self.cloneData(data, self.projectData, 'project_id', 'project_name')
          // console.log(self.projectData)
          // self.searchOptions[index].options = self.projectData
          // console.log(self.searchOptions[index], index)
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
          console.log(data)
          if (way == 'GET') {
            self.courseTag = data.course
            self.materialTag = data.textbooks
            data.problem.forEach((i) => {
              i.id = i.problem_id
              console.log(i)
            })
            console.log(data.problem)
            self.quesTag = data.problem
            self.ruleForm = data
            self.ruleForm.category_id = data.category_id
            console.log(self.ruleForm.category_id)
            // self.ruleForm.service_period = data.service_period
            console.log(data.service_period)
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
  //课程资料列表
  getFileList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      course_id: self.$route.query.course_id,
      page: self.page,
      // chapter_name
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
  getvideochapter(self, name) {
    let config = {
      video_collection_id: self.video_collection_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getvideochapter,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        // if(res.data.code==0){
        //     self.$message({
        //         type: "success",
        //         message: "编辑成功!"
        //     });
        //     self.$api.videocollectionlist(self, 'dataList')
        //     self.editdialogVisible = false
        // }
      },
    })
  },
  addvideochapter(self, name) {
    let config = {
      video_chapter_name: self[name].name,
      video_collection_id: self.video_collection_id,
      video_chapter_sort: self[name].sort,
    }
    console.log(config)
    axiosHttp({
      url: url.addvideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
          self.dialogVisible = false
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
  addvideochapterfree(self, data) {
    let config = {
      video_class_free: data.video_class_free,
      video_class_name: data.video_class_name,
      // video_collection_id: data.video_collection_id,
      video_class_id: data.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.addvideochapterfree,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          // self.dialogVisible = false
        }
      },
    })
  },
  editvideochapter(self, name) {
    let config = {
      video_chapter_name: self[name].name,
      video_chapter_id: self[name].video_chapter_id,
      video_chapter_sort: self[name].sort,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
          self.dialogSpace = false
        }
      },
    })
  },
  deletevideochapter(self, id) {
    let config = {
      video_chapter_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
        }
      },
    })
  },
  //批量排序视频章节
  videoChapterSort(sortAry, self) {
    let config = {
      sortAry: sortAry,
    }
    // console.log(config)
    axiosHttp({
      url: url.videoChapterSort,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self[name] = res.data.data
          self.$api.getvideoclass(self, 'videoData') //右侧列表
        }
      },
    })
  },
  getvideoclass(self, name, data) {
    console.log(data)
    let keyboard = ''
    if (data != undefined) {
      keyboard = data.name
    }
    let config = {
      video_collection_id: self.$route.query.video_collection_id,
      video_chapter_id: self.video_chapter_id,
      keyboard: keyboard,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getvideoclass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          let data = res.data.data
          for (let i of data.data) {
            i.video_class_duration =
              parseInt(i.video_class_duration / 60) +
              ':' +
              (i.video_class_duration % 60)
          }
          self[name] = data
        }
      },
    })
  },
  /**
   * 获取视频上传凭证和地址（阿里云）
   * @param {*} self
   * @param {*} name
   */
  createUploadVideo(self, uploadInfo, uploader, fn) {
    console.log('adasad')
    let arr = uploadInfo.file.name.split('.')
    let config = {
      title: arr[0],
      file_name: uploadInfo.file.name,
    }
    axiosHttp({
      url: url.updatecreate,
      data: config,
      method: 'POST',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (fn) {
          fn(data)
          return
        }
        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
      },
    })
  },
  addvideo(self) {
    let form = self.courseTimeForm
    console.log(form)
    let config = {
      video_class_name: self.$parent.$parent.$parent.$parent.video_class_name, //视频课时名称
      media_id: form.mediaId,
      // video_class_coverurl: form.free,//	封面url
      video_class_duration: form.lbDuration, //	课时时长
      // video_class_status: self.$route.query.id,//状态
      // video_class_free: self.zChapter,//	是否免费课时
      // 录播
      // video_class_free_time: form.mediaId,//	免费时长（秒）
      video_chapter_id:
        self.$parent.$parent.$parent.$parent.ruleForm.video_chapter_id, //章节id
      video_collection_id: self.$route.query.video_collection_id, //	集合id
      // video_class_teacher_id: form.mediaSite,//	老师id
      // 直播
      // media_id: form.startTime,//阿里返回的video_id
      video_class_sort:
        self.$parent.$parent.$parent.$parent.video_class_sort < 1
          ? (self.$parent.$parent.$parent.$parent.video_class_sort = 1)
          : self.$parent.$parent.$parent.$parent.video_class_sort, //	排序数字越大越靠前
      // media_size: form.maxOnlineNum,//大小
      media_name: form.media_name, //媒体名称后缀
    }
    console.log(config)
    axiosHttp({
      url: url.addvideo,
      data: config,
      then(res) {
        console.log(res)
        self.reload()
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  /**
   * 刷新视频上传凭证
   * @param {*} self
   * @param {*} name
   */
  refreshUploadVideo(self, uploadInfo, uploader, fn) {
    let config = {
      videoId: uploadInfo.videoId,
    }

    axiosHttp({
      url: url.refreshUploadVideo,
      data: config,
      then(res) {
        let data = res.data.data
        if (fn) {
          fn(data)
          return
        }

        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
      },
    })
  },
  editvideoclass(self) {
    console.log()
    let config = {
      video_class_id: self.spaceData.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideoclass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        self.editvideo = res.data.data
        console.log(self.editvideo)
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  deletevideoclass(self) {
    console.log()
    let config = {
      video_class_id: self.singleImgId,
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        // self.reload()
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  multideleteVideo(self, name) {
    console.log()
    let config = {
      video_class_id: self[name],
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        // self.reload()
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  editVideoSuccess(self) {
    let form = self.courseTimeForm
    console.log(self.$parent.$parent.$parent.$parent.editvideo.video_class_name)
    let config = {
      video_class_name:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_name, //视频课时名称
      media_id: form.mediaId,
      // video_class_coverurl: form.free,//	封面url
      video_class_duration: form.lbDuration, //	课时时长
      // video_class_status: self.$route.query.id,//状态
      // video_class_free: self.zChapter,//	是否免费课时
      // 录播
      // video_class_free_time: form.mediaId,//	免费时长（秒）
      video_chapter_id:
        self.$parent.$parent.$parent.$parent.editvideo.video_chapter_id, //章节id
      video_collection_id: self.$route.query.video_collection_id, //	集合id
      // video_class_teacher_id: form.mediaSite,//	老师id
      // 直播
      // media_id: form.startTime,//阿里返回的video_id
      video_class_sort:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_sort < 1
          ? (self.$parent.$parent.$parent.$parent.editvideo.video_class_sort = 1)
          : self.$parent.$parent.$parent.$parent.editvideo.video_class_sort, //	排序数字越大越靠前
      // media_size: form.maxOnlineNum,//大小
      media_name: form.media_name, //媒体名称后缀
      video_class_id:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideoclass,
      data: config,
      then(res) {
        console.log(res)
        self.reload()
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  batchmovevideoclass(self) {
    let config = {
      video_class_id: self.transFormId,
      video_chapter_id: self.transvideo_chapter_id,
    }
    axiosHttp({
      url: url.batchmovevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '移动成功!',
          })
          self.dialogTransform = false
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  mutilbatchmovevideoclass(self) {
    let config = {
      video_class_id: self.multiTransformConfirm,
      video_chapter_id: self.transvideo_chapter_id,
    }
    console.log(config)
    axiosHttp({
      url: url.batchmovevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '移动成功!',
          })
          self.dialogTransform = false
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  /**
   * 刷新视频上传凭证
   * @param {*} self
   * @param {*} name
   */
  refreshUploadVideo(self, uploadInfo, uploader, fn) {
    let config = {
      videoId: uploadInfo.videoId,
    }

    axiosHttp({
      url: url.refreshUploadVideo,
      data: config,
      then(res) {
        let data = res.data.data
        if (fn) {
          fn(data)
          return
        }

        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
      },
    })
  },
  createUploadVideo(self, uploadInfo, uploader, fn) {
    console.log('adasad')
    let arr = uploadInfo.file.name.split('.')
    let config = {
      title: arr[0],
      file_name: uploadInfo.file.name,
    }
    axiosHttp({
      url: url.updatecreate,
      data: config,
      method: 'POST',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (fn) {
          fn(data)
          return
        }
        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
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
  addvideochapterfree(self, data) {
    let config = {
      video_class_free: data.video_class_free,
      video_class_name: data.video_class_name,
      // video_collection_id: data.video_collection_id,
      video_class_id: data.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.addvideochapterfree,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          // self.dialogVisible = false
        }
      },
    })
  },
  //分类下拉列表
  getTeachCateList(self, name) {
    // let config = {
    //   teacher_id: teacher_id,
    // }
    // console.log(config)
    axiosHttp({
      url: url.getTeachCateList,
      // data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //授课老师详情
  getTeacherInfo(self, teacher_id) {
    let config = {
      teacher_id: teacher_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getTeacherInfo,
      data: config,
      method: 'GET',
      then(res) {
        let info = res.data.data.info
        self.ruleForm.email = info.email
        self.ruleForm.telephone = info.telephone
        self.ruleForm.account = info.account
        self.ruleForm.password = ''
        self.ruleForm.rank = info.rank
        self.ruleForm.cate_id_arr = info.cate_id_arr
        self.ruleForm.introduction = info.introduction
        self.ruleForm.teacher_name = info.teacher_name
        if (info.url != null || info.url != undefined) {
          self.haschoose = true
          self.url = info.url
        } else {
          self.haschoose = false
          self.url = ''
        }
      },
    })
  },
  //修改授课老师
  modifyTeacher(self, ruleForm) {
    let config = {
      teacher_id: self.$route.query.teacher_id,
      teacher_name: ruleForm.teacher_name,
      telephone: ruleForm.telephone,
      email: ruleForm.email,
      account: ruleForm.account,
      password: ruleForm.password,
      rank: ruleForm.rank,
      introduction: ruleForm.introduction,
      url: self.url,
      cate_id_arr: ruleForm.cate_id_arr,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyTeacher,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.go(-1)
        }
      },
    })
  },
  //修改老师排序
  updateTeacherSort(teacher_id, sort, self) {
    let config = {
      teacher_id: parseInt(teacher_id),
      sort: parseInt(sort),
    }
    axiosHttp({
      url: url.updateTeacherSort,
      data: config,
      method: 'POST',
      then(res) {
        self.$api.getTeacherList(self, 'schoolData')
      },
    })
  },
}
export default resource
