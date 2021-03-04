import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'

let enrollStu = {
  //客户字段设置列表
  getallcustomfield(self, name, data = {}) {
    let field_name = ''
    if (data.name != '' || data.name != undefined) {
      field_name = data.name
    }
    let config = {
      page: self.page,
      field_name: field_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getallcustomfield,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //新增用户字段
  addfield(self, ruleForm) {
    let config = {
      field_type: ruleForm.type,
      field_text: ruleForm.text,
      required: ruleForm.checked,
      field_content: ruleForm.content,
    }
    console.log(config)
    axiosHttp({
      url: url.addfield,
      data: config,
      then(res) {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self['dialogVisible'] = false
          self.$api.getallcustomfield(self, 'fieldList')
        }
      },
    })
  },
  //删除客户字段接口
  delfield(self, field_id) {
    let config = {
      field_id: field_id,
    }
    axiosHttp({
      url: url.delfield,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self['dialogVisible'] = false
          self.$api.getallcustomfield(self, 'fieldList')
        }
      },
    })
  },
  //编辑自定义字段接口
  editfield(self, ruleForm) {
    let config = {
      field_id: ruleForm.id,
      field_type: ruleForm.type,
      field_text: ruleForm.text,
      required: ruleForm.checked,
      field_content: ruleForm.content,
    }
    axiosHttp({
      url: url.editfield,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$api.getallcustomfield(self, 'fieldList')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self['dialogVisible'] = false
        }
      },
    })
  },
  //获取我的客户、查询学员、公海学员
  getMyclient(self, name, data = {}) {
    let keyboard = ''
    let start_time = ''
    let status = ''
    let end_time = ''
    let organization_id = ''
    let consultant_id = ''
    let course_type_id = ''
    let sources = ''
    let course_id = ''
    let school_id = ''
    let dealType = ''

    if (data.statusNum != undefined) {
      status = data.statusNum
      console.log(status)
    } else {
      status = self.status
      console.log(status)
    }
    if (data.start_time != '' && data.start_time != undefined) {
      start_time = data.start_time
      end_time = data.end_time
    }
    if (data.course_id != '' || data.course_id != undefined) {
      course_id = data.course_id
    }
    if (data.dealType != '' || data.dealType != undefined) {
      dealType = data.dealType
    }
    if (data.campus_id != '' || data.campus_id != undefined) {
      school_id = data.campus_id
    }

    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }
    if (data.channel_id != '' || data.channel_id != undefined) {
      sources = data.channel_id
    }

    if (data.teacher_id != '' || data.teacher_id != undefined) {
      consultant_id = data.teacher_id
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      organization_id = data.organization_id
    }
    if (data.category_id != '' || data.category_id != undefined) {
      course_type_id = data.category_id
    }
    console.log(status)
    let config = {
      page: self.page,
      keyboard: keyboard,
      start_time: start_time,
      end_time: end_time,
      status: parseInt(status),
      organization_id: organization_id,
      consultant_id: consultant_id,
      course_type_id: course_type_id,
      sources: sources,
      course_id: course_id,
      school_id: school_id,
      type: dealType,
    }
    console.log(data)
    axiosHttp({
      url: url.getMyclient,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          if (item.create_time == 0) {
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
  //新获取我的客户、查询学员、公海学员
  getlearners(self, name, data = {}) {
    let keyboard = ''
    let start_time = ''
    let status = ''
    let end_time = ''
    let organization_id = ''
    let consultant_id = ''
    let course_type_id = ''
    let sources = ''
    let course_id = ''
    let school_id = ''
    let dealType = ''

    if (data.statusNum != undefined) {
      status = data.statusNum
      console.log(status)
    } else {
      status = self.status
      console.log(status)
    }
    if (data.start_time != '' && data.start_time != undefined) {
      start_time = data.start_time
      end_time = data.end_time
    }
    if (data.course_id != '' || data.course_id != undefined) {
      course_id = data.course_id
    }
    if (data.dealType != '' || data.dealType != undefined) {
      dealType = data.dealType
    }
    if (data.campus_id != '' || data.campus_id != undefined) {
      school_id = data.campus_id
    }

    if (data.name != '' || data.name != undefined) {
      keyboard = data.name
    }
    if (data.channel_id != '' || data.channel_id != undefined) {
      sources = data.channel_id
    }

    if (data.teacher_id != '' || data.teacher_id != undefined) {
      consultant_id = data.teacher_id
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      organization_id = data.organization_id
    }
    if (data.category_id != '' || data.category_id != undefined) {
      course_type_id = data.category_id
    }
    console.log(status)
    let config = {
      page: self.page,
      keyboard: keyboard,
      start_time: start_time,
      end_time: end_time,
      status: parseInt(status),
      organization_id: organization_id,
      consultant_id: consultant_id,
      course_type_id: course_type_id,
      sources: sources,
      course_id: course_id,
      school_id: school_id,
      type: dealType,
    }
    console.log(data)
    axiosHttp({
      url: url.getlearners,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.data) {
          if (item.create_time == 0) {
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
  //清除用户微信登录信息
  clearlogininfo(self, price, data = {}) {
    let config = {
      uid: price.uid,
      login_clear: price.login_clear,
    }
    axiosHttp({
      url: url.clearlogininfo,
      data: config,
      method: 'POST',
      then(res) {
        self.$api.getlearners(self, 'myclient', data)
        self.$message({
          type: 'success',
          message: res.data.message,
        })
      },
    })
  },
  //编辑学员基本信息
  editstudentuser(state, self) {
    let config = {}
    if (state == 'GET') {
      config = {
        uid: self['ruleForm'].uid, //get或post都必选
      }
    } else {
      config = {
        uid: self['ruleForm'].uid, //get或post都必选
        school_id: self['ruleForm'].school_id, //校区id
        from_organization_id: self['ruleForm'].from_organization_id, //机构id
        user_pass: self['ruleForm'].user_pass, //用户密码
        user_nicename: self['ruleForm'].user_nicename, //用户昵称
        user_realname: self['ruleForm'].user_realname, //用户真实姓名
        user_email: self['ruleForm'].user_email, //邮件
        user_img: self['ruleForm'].user_img, //用户头像
        is_admin: self['ruleForm'].is_admin, //是否是小程序管理员,0不是，1是
      }
    }

    axiosHttp({
      url: url.editstudentuser,
      data: config,
      method: state,
      then(res) {
        var data = res.data.data
        if (res.data.code == 0) {
          console.log(res.data.data)

          if (state == 'GET') {
            //对时间进行格式转换
            for (var item in data) {
              if (item == 'last_login_time') {
                if (data[item] == 0) {
                  data[item] = '---'
                } else {
                  data[item] = self.$moment
                    .unix(data[item])
                    .format('YYYY-MM-DD hh:mm')
                }
              }
              if (item == 'sex') {
                switch (data[item]) {
                  case 0:
                    data[item] = '未知'
                    break
                  case 1:
                    data[item] = '男'
                    break
                  case 0:
                    data[item] = '女'
                    break
                }
              }
            }
            //判断是否有头像
            if (data.user_img != '') {
              self.haschoose = true
              self.url = data.user_img
            } else {
              self.haschoose = false
              self.url = ''
            }

            self.ruleForm = data
            self.ruleForm.user_pass = ''
            console.log(data.from_organization_id)
            //判断是否有所属机构
            if (data.from_organization_id != 0) {
              self.ruleForm.organization_id = self.ruleForm.from_organization_id
              self.$api.getSubBlock(self, 'campusData')
            }
          } else {
            // self.$api.getRecommender(self, 'schoolData')

            self.$message({
              type: 'success',
              message: res.data.message,
            })
            self.$router.go(-1)
          }
        }
      },
    })
  },
  //客户详情接口
  getStudentDetail(self, name) {
    let config = {
      intent_id: self.$route.query.intent_id,
      uid: self.$route.query.uid,
    }
    axiosHttp({
      url: url.getStudentDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let base_info = res.data.data.base_info
        for (var item in base_info) {
          if (item == 'create_time') {
            if (base_info[item] == 0) {
              base_info[item] = '---'
            } else {
              base_info[item] = self.$moment
                .unix(base_info[item])
                .format('YYYY-MM-DD hh:mm')
            }
          }
        }
        self.ruleForm = base_info
        self.uid = res.data.data.base_info.uid
        self.course_id = res.data.data.base_info.course_id
        console.log(self.uid)
        self.course_data = res.data.data.course_data
        console.log(self.ruleForm)
        self[name] = res.data.data
        if (self.ruleForm.course_type_id && self.ruleForm.class_type) {
          self.$api.relateCourse(self, 'Courname', 'detail')
        } else {
          self.ruleForm.course_id = self.ruleForm.course_name
        }
      },
    })
  },
  //获取导出数据
  getDownloadExcel(self, name) {
    let config = {
      uid: self.$route.query.uid,
      course_id: self.course_id,
      // institution_id: 1,
    }
    axiosHttp({
      url: url.getDownloadExcel,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data)
          self.exportId = res.data.data.data.id
          self.dialogVisible = true
        }
        console.log(res)
      },
    })
  },
  //导出数据
  stuDownloads(self, name) {
    let config = {
      id: self.exportId,
      // institution_id: 1,
    }
    axiosHttp({
      url: url.stuDownloads,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        console.log(res.data.code == 0)
        if (res.data.code == 0) {
          self.dialogVisible = false
          if (res.data.data.excel_path) {
            window.location.href = res.data.data.excel_path
          }
        }
      },
    })
  },
  //学习报告
  getReport(self, name) {
    let config = {
      institution_id: self.institution_id,
      course_id: self.$route.query.course_id,
      uid: self.$route.query.uid,
      state: self.state,
    }
    axiosHttp({
      url: url.getReport,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        self.info = res.data.data.info
        self.list = res.data.data.list
        self.live = res.data.data.list.live
        self.practice = res.data.data.list.practice
        self.real_topic = res.data.data.list.real_topic
        self.self_determination = res.data.data.list.self_determination
        self.video = res.data.data.list.video
        self.report_id = res.data.data.report_id
      },
    })
  },
  getSynthesisImage(self, name) {
    let config = {
      report_id: self.report_id,
      uid: self.$route.query.uid,
      course_id: self.$route.query.course_id,
    }
    axiosHttp({
      url: url.getSynthesisImage,
      data: config,
      // method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.dialogVisible = false
          if (res.data.data.url) {
            window.location.href = res.data.data.url
          }
        }
        // console.log(res.data.data)
      },
    })
  },

  //学员缴费
  payMent(self, name) {
    let config = {
      intent_id: self.$route.query.intent_id,
    }
    axiosHttp({
      url: url.payMent,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        res.data.data.create_time = self.$moment
          .unix(res.data.data.create_time)
          .format('YYYY-MM-DD')

        console.log(self.ruleForm.create_time)
        self[name] = res.data.data
      },
    })
  },
  paySend(self, form) {
    let config = {
      intent_id: parseInt(self.$route.query.intent_id),
      amount: parseFloat(form.amount),
      common: form.common,
      payment_method: form.payment_method,
      effective_time: parseInt(form.effective_time),
    }
    console.log(config)
    axiosHttp({
      url: url.paySend,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$store.commit('SET_PAGENUM', self.lastPage)
          self.$router.go(-1)
        }
      },
    })
  },
  //学员退款接口
  refunds(self, methods) {
    console.log(methods)
    let way = ''
    let config = {}
    if (methods == 'GET') {
      way = 'GET'
      config = {
        intent_id: self.$route.query.intent_id,
      }
    } else {
      way = 'POST'
      config = {
        intent_id: self.$route.query.intent_id,
        refunds_amount: methods.refunds_amount,
        refunds_reason: methods.refunds_reason,
        refunds_common: methods.common,
      }
    }

    axiosHttp({
      url: url.refunds,
      data: config,
      method: way,
      then(res) {
        if (way == 'GET') {
          res.data.data.create_time = self.$moment
            .unix(res.data.data.create_time)
            .format('YYYY-MM-DD')
          console.log(res.data.data.create_time)

          // self.create_time = res.data.data.create_time
          self.ruleForm = res.data.data
          console.log(self.ruleForm)
        } else {
          self.$message({
            type: res.data.code == 0 ? 'success' : 'error',
            message: res.data.message,
          })
          if (res.data.code == 0) {
            self.$store.commit('SET_PAGENUM', self.lastPage)
            self.$router.go(-1)
          }
        }
      },
    })
  },
  //退费情况
  refundDetail(self, name, data = {}) {
    let config = {
      intent_id: self.$route.query.intent_id,
    }
    axiosHttp({
      url: url.refundDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data

        if (data.create_time == 0) {
          data.create_time = '---'
        } else {
          data.create_time = self.$moment
            .unix(data.create_time)
            .format('YYYY-MM-DD hh:mm:ss')
        }

        console.log(data.create_time)
        self[name] = data
      },
    })
  },
  //新增意向学员
  addintention(self, ruleForm) {
    let way = ''
    let config = {}
    if (ruleForm == 'GET') {
      way = 'GET'
      config = {}
    } else {
      way = 'POST'
      config = ruleForm
      // config = {
      //   realname: ruleForm.realname,
      //   mobile: ruleForm.mobile,
      //   identity_card: ruleForm.identity_card,
      //   sources: ruleForm.sources,
      //   class_type: ruleForm.class_type,
      //   course_id: ruleForm.course_id,
      //   organization_id: ruleForm.organization_id,
      //   connsultan_id: ruleForm.connsultan_id,
      //   comment: ruleForm.comment,
      //   sex: ruleForm.sex,
      //   user_img: ruleForm.user_img,
      //   class_type_id: ruleForm.class_type_id,

      // }
    }
    axiosHttp({
      url: url.addintention,
      data: config,
      method: way,
      then(res) {
        console.log(res.data.code)
        if (way == 'GET') {
          if (res.data.code == 0) {
            self.course_data = res.data.data.custom_field
            console.log(self.course_data)
            // self.$message({
            //   type: 'success',
            //   message: res.data.message,
            // })
          }
        } else {
          if (res.data.code == 0) {
            self.$message({
              type: 'success',
              message: res.data.message,
            })
            self.$router.go(-1)
          }
        }
      },
    })
  },
  //机构下的校区
  getSubBlock(self, name) {
    let config = {
      parent_id: parseInt(self.ruleForm.organization_id),
    }
    console.log(config)
    axiosHttp({
      url: url.getSubBlock,
      data: config,
      method: 'GET',
      then(res) {
        self[name] = res.data.data
      },
    })
  },
  //根据课程类型和班型获取课程
  relateCourse(self, name, str) {
    let class_type_id = 0
    if (str != undefined) {
      class_type_id = self.ruleForm.course_type_id
    } else {
      class_type_id = self.ruleForm.class_type_id
    }
    let config = {
      course_category_id: class_type_id,
      class_type: self.ruleForm.class_type,
    }
    console.log(config)
    axiosHttp({
      url: url.relateCourse,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //根据字段名称获取字段信息接口
  getfieldinfo(self, name, field_text) {
    let config = {
      field_text: field_text,
    }
    console.log(config)
    axiosHttp({
      url: url.getfieldinfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //编辑意向学员
  editIntendStu(self, methods, ruleForm) {
    let config = {}
    let way = ''
    if (methods == 'POST') {
      way = 'POST'
      config = ruleForm
    } else {
      way = 'GET'
      config = {
        intent_id: self.$route.query.intent_id,
      }
    }
    console.log(config)
    axiosHttp({
      url: url.editIntendStu,
      data: config,
      method: way,
      then(res) {
        console.log(res.data.data)
        if (way == 'GET') {
          let base_info = res.data.data.base_info
          let course_data = res.data.data.course_data
          // console.log(base_info.organization_id)

          for (var item in base_info) {
            if (item == 'create_time') {
              if (base_info[item] == 0) {
                base_info[item] = '---'
              } else {
                base_info[item] = self.$moment
                  .unix(base_info[item])
                  .format('YYYY-MM-DD')
              }
            }
            if (item == 'user_img') {
              if (base_info[item] != '') {
                self.url = base_info[item]
                self.haschoose = true
              } else {
                self.url = ''
                self.haschoose = false
              }
            }
            if (item == 'course_type_id') {
              if (base_info[item] != '') {
                base_info['class_type_id'] =
                  base_info[item] || base_info['class_type_id']
              }
            }
            if (item == 'consultant_id') {
              if (base_info[item] != '') {
                base_info['connsultan_id'] =
                  base_info[item] || base_info['connsultan_id']
              }
            }
          }
          console.log(base_info)
          self.ruleForm = base_info
          if (base_info.organization_id) {
            self.$api.getSubBlock(self, 'campusData')
          }
          if (base_info.class_type_id && base_info.class_type) {
            self.$api.relateCourse(self, 'Courname')
          }
          if (base_info.school_id) {
          }
          let course_Array = {}
          course_data.forEach((k) => {
            if (k.field_type == 'multi_select') {
              course_Array[k.field_name] = k.user_data
            } else {
              course_Array[k.field_name] = k.user_data.toString()
            }
          })
          self.course_Arr = course_Array
        } else {
          if (res.data.code == 0) {
            self.$message({
              type: 'success',
              message: res.data.message,
            })
            self.$store.commit('SET_PAGENUM', self.lastPage)
            self.$router.go(-1)
          }
        }
      },
    })
  },
  //将学员放入公海
  jumpSea(self, intent_id) {
    let config = {
      intent_id: intent_id,
    }
    axiosHttp({
      url: url.jumpSea,
      data: config,
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.push({
            path: '/etm/seaStudent',
            // query: { intent_id: intent_id },
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
  //领取公海学员
  receive(self, intent_id) {
    let config = {
      intent_id: intent_id,
    }
    axiosHttp({
      url: url.receive,
      data: config,
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$router.push({
            path: '/etm/enrollmentManagement',
            // query: { intent_id: intent_id },
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
  //动态获取学习进度下所有列表
  getProgressList(self, name) {
    let config = {
      uid: self.uid,
      page: self.page,
      state: self.state,
      course_id: self.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getProgressList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          if (item.accuracy != undefined || item.accuracy != '') {
            item.accuracy = item.accuracy + '%'
          }
          if (item.progress != undefined || item.progress != '') {
            item.progress = item.progress + '%'
          }
          // if (item.create_time != undefined || item.create_time != '') {
          //   item.create_time = self.$moment
          //     .unix(item.create_time)
          //     .format('YYYY-MM-DD')
          // }
          if (self.apiText == 'practice') {
            item.doneQuest = item.total_problem - item.unanswered
          } else if (self.apiText == 'realTopic') {
            if (item.operation_type == 0) {
              item.operation_type = ' 练习模式'
            } else {
              item.operation_type = '考试模式'
            }
          } else if (self.apiText == 'subscribeClassroom') {
            switch (item.status) {
              case -1:
                item.status = '已取消'
                break
              case 0:
                item.status = '等待确认'
                break
              case 1:
                item.status = '已失约'
                break
              case 2:
                item.status = '已签到'
            }
          } else {
            console.log('其他接口')
          }
        }

        console.log(res.data.data)
        self[name] = res.data.data
        console.log(res.data.data.data) //chapterIds中字符串转数组的方法eval()
        //           let Str = '[' + res.data.data.data + ']'
        //         console.log(Str)
        //          let Arr = eval('(' + Str + ')')
        //           console.log(Arr)
        // let Arr = new Array()
        // Arr.push(res.data.data.data)
        // console.log(Arr[0])
        self.panelData = res.data.data.data
      },
    })
  },
  //学习报告
  studyReportForWord(self, name) {
    let config = {
      uid: self.uid,
      course_id: self.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.studyReportForWord,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        console.log(res.data.data.exam.list)
        let list = res.data.data.exam.list
        self.allvisx = list.map((i) => {
          console.log(i.create_time)
          return (i.create_time = 0)
        })
        console.log(self.allvisy)
        self.allvisy = list.map((i) => {
          console.log(i.mark)
          return i.mark - 0
        })
        console.log(self.allvisx)
        // self['allvis']=res.data.data.exam.list
        self['study_day'] = res.data.data.study_day
        self['make_problem_day'] = res.data.data.make_problem_day
        self['watch_video_time'] = res.data.data.watch_video_time
        self['watch_live_total'] = res.data.data.watch_live_total
        console.log(self['watch_video_time'])
        console.log(self['watch_live_total'])
        console.log(res.data.data.watch_live_total)
        self['practice'].push(res.data.data.practice)
        let challenge = res.data.data.challenge
        let punch = res.data.data.punch
        let challengeObj = {}
        Object.assign(challengeObj, punch, challenge)
        console.log(challengeObj)

        self['single_qualified'] = res.data.data.exam.single_qualified + '%'
        self['multiple_qualified'] = res.data.data.exam.single_qualified + '%'
        self['judge_qualified'] = res.data.data.exam.judge_qualified + '%'
        self['fill_qualified'] = res.data.data.exam.fill_qualified + '%'
        self['scenes_qualified'] = res.data.data.exam.scenes_qualified + '%'
        //  console.log(res.data.data.watch_video_time)
        //    console.log(res.data.data.examTest)
        self['challengeList'].push(challengeObj)

        self[name] = res.data.data
      },
    })
  },
  //学习进度报告
  studyProgressReport(self, name) {
    let config = {
      uid: self.uid,
      course_id: self.course_id,
    }
    axiosHttp({
      url: url.studyProgressReport,
      data: config,
      method: 'GET',
      then(res) {
        // console.log(res.data.data)
        // console.log(res.data.data.punch)

        res.data.data.punch.use_time = (
          res.data.data.punch.use_time / 1000
        ).toFixed(2)
        res.data.data.realTopic.use_time = (
          res.data.data.realTopic.use_time / 1000
        ).toFixed(2)
        res.data.data.mockTest.use_time = (
          res.data.data.mockTest.use_time / 1000
        ).toFixed(2)
        res.data.data.topicChallenge.use_time = (
          res.data.data.topicChallenge.use_time / 1000
        ).toFixed(2)
        res.data.data.selfDetermination.use_time = (
          res.data.data.selfDetermination.use_time / 1000
        ).toFixed(2)

        console.log((res.data.data.realTopic.use_time / 1000).toFixed(2))
        self.punch.push(res.data.data.punch)
        self.practice.push(res.data.data.practice)
        self.realTopic.push(res.data.data.realTopic)
        self.mockTest.push(res.data.data.mockTest)
        self.topicChallenge.push(res.data.data.topicChallenge)
        self.selfDetermination.push(res.data.data.selfDetermination)
        self.subscribeClassroom.push(res.data.data.subscribeClassroom)
        // self.realTopic.push(res.data.data.realTopic)
        // self.realTopic.push(res.data.data.realTopic)
      },
    })
  },
  //跟进记录列表
  getRoutineRecordList(self, name) {
    let config = {
      uid: self.uid,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getRoutineRecordList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD HH:MM:SS')
        }
        self[name] = res.data.data
      },
    })
  },
  //添加跟进记录
  insertRoutineRecord(self, intent_id) {
    let config = {
      uid: self.uid,
      record: self.record,
    }
    axiosHttp({
      url: url.insertRoutineRecord,
      data: config,
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getRoutineRecordList(self, 'schoolData')
          self.record = ''
        } else {
          self.$message({
            type: 'error',
            message: res.data.message,
          })
        }
      },
    })
  },
  //跟进记录列表
  getOrderList(self, name) {
    let config = {
      uid: self.uid,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getOrderList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD HH:MM:SS')
          switch (item.inte_from) {
            case 0:
              item.inte_from = '后台'
              break
            case 1:
              item.inte_from = '小程序'
              break
            case 2:
              item.inte_from = 'pc端'
              break
            case 3:
              item.inte_from = 'h5'
              break
          }
        }
        self[name] = res.data.data
      },
    })
  },
  //跟进记录列表
  getTrackList(self, name) {
    let config = {
      // uid: 31762,
      uid: self.uid,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getTrackList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD HH:MM:SS')
          switch (item.type) {
            case 1:
              item.type = '点击'
              break
            case 2:
              item.type = '下载'
              break
            case 3:
              item.type = '登录'
              break
          }
          switch (item.source) {
            case 1:
              item.source = 'PC'
              break
            case 2:
              item.source = '小程序'
              break
          }
        }
        self[name] = res.data.data
      },
    })
  },
}

export default enrollStu
