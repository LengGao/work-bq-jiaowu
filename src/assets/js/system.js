import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'

let system = {
  //角色权限
  roleperm(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.roleperm,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.list)
        let data = res.data.data.list
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },

  //通知公告
  noticelist(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.noticelist,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.list)
        let data = res.data.data.list
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },

  //删除公告
  deletenoticelist(self, id) {
    let config = {
      // search_box: ruleForm.search_box,
      id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletenoticelist,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data.list)
        let data = res.data.data.list
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },

  //编辑公告
  updatenoticelist(self, id) {
    let config = {
      // search_box: ruleForm.search_box,
      id,
    }
    console.log(config)
    axiosHttp({
      url: url.updatenoticelist,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data.list)
        let data = res.data.data.list
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },

  //员工列表
  getStaffList(self, name, data = {}) {
    let name_mobile = ''
    if (data.name != '' || data.name != undefined) {
      name_mobile = data.name
    }
    let config = {
      page: self.page,
      name_mobile: name_mobile,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffList,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //员工选择列表
  getStaffSelect(self, name, data = {}) {
    // let name_mobile = ''
    // if (data.name != '' || data.name != undefined) {
    //   name_mobile = data.name
    // }
    let config = {
      // page: self.page,
      // name_mobile: name_mobile,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffSelect,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //员工详情
  getStaffInfo(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffInfo,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        if (res.data.code == 0) {
          self.ruleForm = {
            id: data.staff_id,
            staff_name: data.staff_name,
            mobile_num: data.mobile_num,
            account: data.account,
            role_ids: data.role_ids,
            as_headmaster: data.as_headmaster,
            is_super: data.is_super,
            institution_id: data.institution_id,
            identity: data.identity,
          }
          if (data.head_photo != '') {
            self.haschoose = true
            self.ruleForm.head_photo = data.cover_img
          } else {
            self.haschoose = false
            self.ruleForm.head_photo = ''
          }
        }
      },
    })
  },
  //添加员工
  addStaff(self, ruleForm) {
    let config = {
      staff_name: ruleForm.staff_name,
      mobile_num: ruleForm.mobile_num,
      account: ruleForm.account,
      password: ruleForm.password,
      head_photo: ruleForm.head_photo,
      role_ids: ruleForm.role_ids,
      as_headmaster: ruleForm.as_headmaster,
      is_super: ruleForm.is_super,
      institution_id: ruleForm.institution_id,
      identity: ruleForm.identity,
    }
    console.log(config)
    axiosHttp({
      url: url.addStaff,
      data: config,
      // method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        // let data = res.data.data
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisible = false
          self.$api.getStaffList(self, 'schoolData')
          // self[name] = data
        }
      },
    })
  },
  //修改员工
  modifyStaff(self, ruleForm) {
    let config = {
      id: ruleForm.id,
      staff_name: ruleForm.staff_name,
      mobile_num: ruleForm.mobile_num,
      account: ruleForm.account,
      password: ruleForm.password,
      head_photo: ruleForm.head_photo,
      role_ids: ruleForm.role_ids,
      as_headmaster: ruleForm.as_headmaster,
      is_super: ruleForm.is_super,
      institution_id: ruleForm.institution_id,
      identity: ruleForm.identity,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyStaff,
      data: config,
      // method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        // let data = res.data.data
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.dialogVisible = false
          self.$api.getStaffList(self, 'schoolData')
          // self[name] = data
        }
      },
    })
  },
  //删除员工
  deleteStaff(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteStaff,
      data: config,
      // method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        // let data = res.data.data.list
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStaffList(self, 'schoolData')
          // self[name] = data
        }
      },
    })
  },
  //修改员工状态
  ajaxStatusStaff(self, id, account_status) {
    let config = {
      account_status: account_status,
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.ajaxStatusStaff,
      data: config,
      // method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStaffList(self, 'schoolData')
        }
      },
    })
  },
  //修改员工超管状态
  updateSuperStaff(self, id, is_super) {
    let config = {
      is_super: is_super,
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.updateSuperStaff,
      data: config,
      // method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStaffList(self, 'schoolData')
        }
      },
    })
  },
  //修改员工班主任
  updateMasterStaff(self, id, as_headmaster) {
    let config = {
      as_headmaster: as_headmaster,
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.updateMasterStaff,
      data: config,
      // method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStaffList(self, 'schoolData')
        }
      },
    })
  },

  //获取角色选择列表
  getRoleSelectData(self, name) {
    let config = {
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getRoleSelectData,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //角色身份选择列表
  getIdentitySelect(self, name) {
    let config = {
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getIdentitySelect,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //角色身份选择列表
  getInstitutionSelectData(self, name) {
    let config = {
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getInstitutionSelectData,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //获取操作详情
  getAdminOperationDetail(self, name, data = {}) {
    let config = {
      id: self.$route.query.id,
    }
    console.log(config)
    axiosHttp({
      url: url.getAdminOperationDetail,
      data: config,
      // method: 'GET',
      then(res) {
        // for (let item of res.data.data.list) {
        //   item.addtime = self.$moment.unix(item.addtime).format('YYYY-MM-DD')
        // }
        self.origin_data = res.data.data.origin_data
        self.new_data = res.data.data.new_data
        // console.log(res.data.data)
        // console.log(res.data.data.origin_data)
        self[name].push(res.data.data)
      },
    })
  },
  //操作记录
  getAdminOperationRecordList(self, name, data = {}) {
    // let staffName = ''
    // let start_time = ''
    // let end_time = ''

    // if (data.name != '' || data.name != undefined) {
    //   staffName = data.name
    // }
    // // if (data.id != '' || data.id != undefined) {
    // //   status = data.id
    // // }
    // if (data.start_time != '' && data.start_time != '') {
    //   start_time = data.start_time
    //   end_time = data.end_time
    // }
    let config = {
      page: self.page,
      staff_name: self.staff_name,
      action: self.action,
      table_name: self.table_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getAdminOperationRecordList,
      data: config,
      // method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.addtime = self.$moment.unix(item.addtime).format('YYYY-MM-DD')
        }
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //获取操作类型下拉列表
  getActionSelectList(self, name, data = {}) {
    let config = {
      id: self.$route.query.id,
    }
    console.log(config)
    axiosHttp({
      url: url.getActionSelectList,
      data: config,
      method: 'GET',
      then(res) {
        // for (let item of res.data.data.list) {
        //   item.addtime = self.$moment.unix(item.addtime).format('YYYY-MM-DD')
        // }

        console.log(res.data.data)
        // console.log(res.data.data.origin_data)
        self[name] = res.data.data
      },
    })
  },
  //回滚操作
  rollBackOperation(self, id) {
    let config = {
      id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.rollBackOperation,
      data: config,
      // method: 'GET',
      then(res) {
        // for (let item of res.data.data.list) {
        //   item.addtime = self.$moment.unix(item.addtime).format('YYYY-MM-DD')
        // }
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getAdminOperationDetail(self, 'schoolData')
        }
      },
    })
  },
}

export default system
