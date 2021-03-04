import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
let schManage = {
  //角色列表
  getRoleList(self, name, data = {}) {
    let role_name = ''
    if (data.name != '' || data.name != undefined) {
      role_name = data.name
    }
    let config = {
      page: self.page,
      role_name: role_name,
    }
    // console.log(config)
    axiosHttp({
      url: url.getRoleList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //角色详情
  getRegister(self, name) {
    let role_id = self.$route.query.role_id
    let config = {
      role_id: role_id,
    }
    axiosHttp({
      url: url.getRegister,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.nodeTree)

        self[name] = res.data.data.nodeTree
        if (role_id != undefined) {
          self.ruleForm.role_name = res.data.data.info.role_name
          self.ruleForm.remarks = res.data.data.info.remarks
          let nodeTree = res.data.data.nodeTree
          self[name] = nodeTree
          self.ischeck = true

          self.$nextTick(() => {
            let all_checks = res.data.data.all_checks
            self.$refs.tree.setCheckedKeys(all_checks) //给树节点赋值
            self.ischeck = false //重点： 赋值完成后 设置为false
          })

          console.log(self.all_checks)

          // setTimeout(function() {
          //   nodeTree.forEach((v) => {
          //     console.log(v.is_checked)
          //     if (v.is_checked == 1) {
          //       self.$refs.tree.setChecked(v.node_id, true, false)
          //     }
          //   })
          // }, 500)
          // let tree = nodeTree.map((i) => {
          //   return i.children
          // })
          // console.log(nodeTree)
        }
      },
    })
  },
  //添加角色
  addRegister(self, ruleForm) {
    let config = {
      role_name: ruleForm.role_name,
      remarks: ruleForm.remarks,
      node_ids: ruleForm.node_ids,
    }
    console.log(config)
    axiosHttp({
      url: url.addRegister,
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
  //修改角色
  modifyRegister(self, ruleForm) {
    let config = {
      role_id: self.role_id,
      role_name: ruleForm.role_name,
      remarks: ruleForm.remarks,
      node_ids: ruleForm.node_ids,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyRegister,
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
  //删除角色
  deleteRegister(self, role_id) {
    let config = {
      role_id: role_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteRegister,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getRoleList(self, 'schoolData')
        }
      },
    })
  },
  //订单列表/搜索
  getOrdersList(self, name, data = {}) {
    let role_name = ''
    let start_time = ''
    let end_time = ''
    let status = 0
    if (data.name != '' || data.name != undefined) {
      role_name = data.name
    }
    if (data.id != '' || data.id != undefined) {
      status = data.id
    }
    if (data.start_time != '' && data.start_time != '') {
      start_time = data.start_time
      end_time = data.end_time
    }
    let config = {
      page: self.page,
      name: role_name,
      startTime: start_time,
      endTime: end_time,
      status: status,
    }
    console.log(config)
    axiosHttp({
      url: url.getOrdersList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          if (item.add_time != 0) {
            item.add_time = self.$moment
              .unix(item.add_time)
              .format('YYYY-MM-DD')
          } else {
            item.add_time = '---'
          }
        }
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //授课老师下拉列表
  getTeacherDrop(self, name, data = {}) {
    let name_mobile = ''
    if (data.name != '' || data.name != undefined) {
      name_mobile = data.name
    }
    let config = {
      // page: self.page,
      name_mobile: name_mobile,
    }
    console.log(config)
    axiosHttp({
      url: url.getTeacherDrop,
      data: config,
      method: 'GET',
      then(res) {
        // for (let item of res.data.data.list) {
        //   item.add_time = self.$moment.unix(item.add_time).format('YYYY-MM-DD')
        // }
        console.log(res.data.data)
        self[name] = res.data.data
        console.log('执行 getTeacherDrop 函数', self[name])
      },
    })
  },
  //授课老师列表
  getTeacherList(self, name, data = {}) {
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
      url: url.getTeacherList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.add_time = self.$moment.unix(item.add_time).format('YYYY-MM-DD')
        }
        console.log(res.data.data)
        self[name] = res.data.data
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

  //添加授课老师
  addTeacher(self, ruleForm) {
    let config = {
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
      url: url.addTeacher,
      data: config,
      then(res) {
        console.log(res.data)
        console.log(res.data.code)
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
  //修改账号状态
  changeTeacherStatus(self, teacher_id, account_status) {
    let config = {
      teacher_id: teacher_id,
      account_status: account_status,
    }
    console.log(config)
    axiosHttp({
      url: url.changeTeacherStatus,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getTeacherList(self, 'schoolData')
        }
      },
    })
  },
  //删除授课老师
  deleteTeacher(self, teacher_id) {
    let config = {
      teacher_id: teacher_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteTeacher,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getTeacherList(self, 'schoolData')
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
  //员工列表
  getStaffList(self, name, data = {}) {
    let name_mobile = ''
    if (data.name != '' || data.name != undefined) {
      name_mobile = data.name
    }
    let config = {
      page: self.page,
      department_id: self.departmentId,
      name_mobile: name_mobile,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        // consol.log(res.data.data.total)
        self[name] = res.data.data
        self.total = self[name].total
        console.log(self.total)
      },
    })
  },
  //修改账号状态
  changeStatus(self, staff_id, statue) {
    let config = {
      staff_id: parseInt(staff_id),
      account_status: statue,
    }
    console.log(config)
    axiosHttp({
      url: url.changeStatus,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          // self.$router.go(-1)
        }
      },
    })
  },
  //添加员工
  addStaff(self, ruleForm) {
    let config = {
      staff_name: ruleForm.staff_name,
      mobile_num: ruleForm.mobile_num,
      mail: ruleForm.mail,
      department_id: ruleForm.department_id,
      account: ruleForm.account,
      password: ruleForm.password,
      head_photo: ruleForm.head_photo,
      role_ids: ruleForm.role_ids,
      as_headmaster: ruleForm.as_headmaster,
    }
    console.log(config)
    axiosHttp({
      url: url.addStaff,
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
  //修改员工
  modifyStaff(self, ruleForm) {
    let config = {
      staff_id: self.staff_id,
      staff_name: ruleForm.staff_name,
      mobile_num: ruleForm.mobile_num,
      mail: ruleForm.mail,
      department_id: ruleForm.department_id,
      account: ruleForm.account,
      password: ruleForm.password,
      head_photo: ruleForm.head_photo,
      role_ids: ruleForm.role_ids,
      as_headmaster: ruleForm.as_headmaster,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyStaff,
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
  //删除员工
  deleteStaff(self, staff_id) {
    let config = {
      staff_id: staff_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteStaff,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getStaffList(self, 'schoolData')
        }
      },
    })
  },
  // //部门列表
  // getDepartmentList(self, name, data = {}) {
  //   // let name_mobile = ''
  //   // if (data.name != '' || data.name != undefined) {
  //   //   name_mobile = data.name
  //   // }
  //   // let config = {
  //   //   page: self.page,
  //   // }
  //   // console.log(config)
  //   axiosHttp({
  //     url: url.getDepartmentList,
  //     // data: config,
  //     method: 'GET',
  //     then(res) {
  //       console.log(res)
  //       self[name] = res.data.data
  //     },
  //   })
  // },
  //部门列表
  getfoldList(self, name, data = {}) {
    // let name_mobile = ''
    // if (data.name != '' || data.name != undefined) {
    //   name_mobile = data.name
    // }
    // let config = {
    //   page: self.page,
    // }
    // console.log(config)
    axiosHttp({
      url: url.getfoldList,
      // data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data.list
        console.log(self[name])
      },
    })
  },
  //添加部门
  addepartment(self, ruleForm) {
    let config = {
      parent_id: ruleForm.parent_id,
      department_name: ruleForm.department_name,
    }
    console.log(config)
    axiosHttp({
      url: url.addepartment,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getfoldList(self, 'department')
          self.dialogVisible = false
        }
      },
    })
  },
  //部门详情
  getDepartmentInfo(self, department_id) {
    let config = {
      department_id: department_id,
    }
    axiosHttp({
      url: url.getDepartmentInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        let info = res.data.data.info
        self.ruleForm.parent_id = info.parent_id
        self.ruleForm.department_name = info.department_name
      },
    })
  },
  //修改部门
  modifyPartment(self, ruleForm) {
    let config = {
      parent_id: ruleForm.parent_id,
      department_name: ruleForm.department_name,
      department_id: ruleForm.department_id,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyPartment,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getfoldList(self, 'department')
          for (let key in self.ruleForm) {
            self.ruleForm[key] = ''
          }
          self.dialogVisible = false
        }
      },
    })
  },
  //删除部门
  deletePartment(self, department_id) {
    let config = {
      department_id: department_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletePartment,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getfoldList(self, 'department')
        }
      },
    })
  },
  //员工详情
  getStaffInfo(self, name, data = {}) {
    let config = {
      staff_id: self.$route.query.staff_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffInfo,
      data: config,
      method: 'GET',
      then(res) {
        let info = res.data.data.info
        console.log(info)
        let departArr = new Array()
        if (info.parent_id != 0 && info.parent_id != 1) {
          departArr.push(info.parent_id)
          departArr.push(info.department_id)
        } else {
          departArr.push(info.department_id)
        }

        console.log(departArr)
        self.department_idarr = departArr
        self.ruleForm.staff_name = info.staff_name
        self.ruleForm.mobile_num = info.mobile_num
        self.ruleForm.mail = info.mail
        self.ruleForm.role_ids = info.role_ids
        self.ruleForm.account = info.account
        self.ruleForm.department_id = info.department_id
        self.ruleForm.as_headmaster = info.as_headmaster + ''

        self.url = info.head_photo
        self.ruleForm.head_photo = info.head_photo
        if (info.head_photo != '') {
          self.haschoose = true
        } else {
          self.haschoose = false
        }
        // self.url=
        self[name] = res.data.data
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
  // getadminLogList(self, name, data = {}) {
  //   let staffName = ''
  //   let start_time = ''
  //   let end_time = ''

  //   if (data.name != '' || data.name != undefined) {
  //     staffName = data.name
  //   }
  //   // if (data.id != '' || data.id != undefined) {
  //   //   status = data.id
  //   // }
  //   if (data.start_time != '' && data.start_time != '') {
  //     start_time = data.start_time
  //     end_time = data.end_time
  //   }
  //   let config = {
  //     page: self.page,
  //     staffName: staffName,
  //     startTime: start_time,
  //     endTime: end_time,
  //   }
  //   console.log(config)
  //   axiosHttp({
  //     url: url.getadminLogList,
  //     data: config,
  //     method: 'GET',
  //     then(res) {
  //       for (let item of res.data.data.list) {
  //         item.addtime = self.$moment.unix(item.addtime).format('YYYY-MM-DD')
  //       }
  //       console.log(res.data.data)
  //       self[name] = res.data.data
  //     },
  //   })
  // },
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

  //获取编辑公开课详情
  editOpenCourse(self, name) {
    let config = {
      live_class_id: self.$route.query.live_class_id,
    }
    axiosHttp({
      url: url.editorOpen,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code === 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  //编辑公开课详情
  modifyOpenCourse(self, name) {
    let config = {
      live_class_name: self.reasonForm.livingName,
      live_class_id: self.$route.query.live_class_id,
      teacher_id: self.reasonForm.teachers.value,
      live_teacher_name: self.reasonForm.teachers.label,
      live_steam_time: self.reasonForm.value1,
      live_start_time: self.reasonForm.value2[0],
      live_end_time: self.reasonForm.value2[1],
      live_class_icon: self.reasonForm.url,
      live_class_common: self.reasonForm.textarea,
      live_class_detail: self.reasonForm.introduction,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyOpen,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '更新成功！',
          })
          self.$router.go(-1)
        }
      },
    })
  },
}

export default schManage
