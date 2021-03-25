import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'

let Examination = {
  //考试科目列表
  subjectList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.subjectList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
  //考试规则列表
  ruleList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.ruleList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
        }
      },
    })
  },
    //添加报考规则
    createRule(self, ruleForm) {
      let config = {
        cate_id: ruleForm.cate_id,
        rule_name: ruleForm.rule_name,
        subject_name: ruleForm.subject_name,
        exam_type: ruleForm.exam_type,
        credit_hour: ruleForm.credit_hour,
        exam_type: ruleForm.exam_type,
        credit_hour: ruleForm.credit_hour,
        comment: ruleForm.comment,
        phone: ruleForm.phone,
        id_card_limit: ruleForm.id_card_limit,
        place_limit: ruleForm.place_limit,
        age_limit: ruleForm.age_limit,
        edu_limit: ruleForm.edu_limit,
        work_limit: ruleForm.work_limit,
        health_limit: ruleForm.health_limit,

        // search_box: ruleForm.search_box,
  
        page: self.page,
      }
      console.log(config)
      axiosHttp({
        url: url.createRule,
        data: config,
        method: 'POST',
        then(res) {
          console.log(res.data.data)
          let data = res.data.data
          if (res.data.code == 0) {
            self[name] = data
            self.dialogVisible=false
            self.$api.createRule(self, 'schoolData')
          }
        },
      })
    },
  //添加科目
  createSubject(self, ruleForm) {
    let config = {
      cate_id: ruleForm.cate_id,
      category_name: ruleForm.category_name,
      subject_name: ruleForm.subject_name,
      total_score: ruleForm.total_score,
      pass_score: ruleForm.pass_score,
      exam_type: ruleForm.exam_type,
      credit_hour: ruleForm.credit_hour,
      cost: ruleForm.cost,
      period: ruleForm.period,
      from_organization_id: ruleForm.from_organization_id,

      // search_box: ruleForm.search_box,

      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.createSubject,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
          self.dialogVisible=false
          self.$api.subjectList(self, 'subjectData')
        }
      },
    })
  },

  //修改科目
  updateSubject(self, ruleForm) {
    let config = {
      cate_id: ruleForm.cate_id,

      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.updateSubject,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
          self.dialogVisible=false
          self.$api.updateList(self, 'subjectData')
        }
      },
    })
  },

    //删除科目
    deleteSubject(self, id) {
      let config = {
        // search_box: ruleForm.search_box,
        id:id,
      }
      console.log(config)
      axiosHttp({
        url: url.deleteSubject,
        data: config,
        method: 'POST',
        then(res) {
          console.log(res.data.data)
          let data = res.data.data
          if (res.data.code == 0) {
            self[name] = data
            self.dialogVisible=false
            self.$api.subjectList(self, 'subjectData')
          }
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
  //获取老师 不带分页
  getTeacherSublist(self, name, data = {}) {
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
      url: url.getTeacherSublist,
      data: config,
      method: 'GET',
      then(res) {
        // for (let item of res.data.data.list) {
        //   item.add_time = self.$moment.unix(item.add_time).format('YYYY-MM-DD')
        // }
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
}

export default Examination
