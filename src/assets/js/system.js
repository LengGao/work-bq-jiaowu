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

  //编辑公告
  createlist(self, id) {
    let config = {
      // search_box: ruleForm.search_box,
      id,
    }
    console.log(config)
    axiosHttp({
      url: url.createlist,
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
  getStaffList(self, name) {
    let config = {
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffList,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data.list)
        let data = res.data.data.list
        if (res.data.code == 0) {
          self[name] = data
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
}

export default system
