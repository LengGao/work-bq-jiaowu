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
  //校区列表

  updateStatus(self, id, status) {
    let config = {
      id: id,
      status: status,
    }
    console.log(config)
    axiosHttp({
      url: url.updateStatus,
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
  updateSort(self, id, sort) {
    let config = {
      id: id,
      sort: sort,
    }
    console.log(config)
    axiosHttp({
      url: url.updateSort,
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
}
export default resource
