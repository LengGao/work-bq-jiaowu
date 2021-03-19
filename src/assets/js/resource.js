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
      // id: id,
      // sort: sort,
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
  //添加项目
  createProject(self, ruleForm) {
    let config = {
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
        project_id: ruleForm.id,
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

    // console.log(config)
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
}
export default resource
