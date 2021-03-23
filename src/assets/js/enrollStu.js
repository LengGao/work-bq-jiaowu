import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'
let enrollStu = {
  //获取客户列表
  getCustomerList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.pageNum,
      ...self.searchData,
      // category_id: self.searchData.category_id.pop(),
    }
    console.log(config)
    axiosHttp({
      url: url.getCustomerList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.list)
        let data = res.data.data
        if (res.data.code == 0) {
          self.analysis = data.analysis[0]
          for (var item of data.list) {
            if (item.from_organization_name == '') {
              item.from_organization_name = '--'
            }
            if (item.create_time == null) {
              item.create_time = '--'
            }
            switch (item.sex) {
              case 0:
                item.sex = '未知'
                break
              case 1:
                item.sex = '男'
                break
              case 2:
                item.sex = '女'
                break
            }
            switch (item.sources) {
              case null:
                item.sources = '未知'
                break
              case '0':
                item.sources = '未知'
                break
              case '1':
                item.sources = '小程序'
                break
              case '2':
                item.sources = '后台录入'
                break
              case '4':
                item.sources = '教务系统录入'
                break
              case '3':
                item.sources = '业务员录入'
                break
            }
          }
          self[name] = data
        }
      },
    })
  },
  //1.1 招生录入学员信息、添加学员档案（客户管理、添加客户、客户报名）
  addCustomers(self, ruleForm, num) {
    // let field_name = ''
    // if (data.name != '' || data.name != undefined) {
    //   field_name = data.name
    // }
    let config = {
      page: self.page,
      surname: ruleForm.surname,
      mobile: ruleForm.mobile,
      id_card_number: ruleForm.id_card_number,
      sex: ruleForm.sex,
      birthday: ruleForm.birthday,
      marry: ruleForm.marry,
      qq: ruleForm.qq,
      email: ruleForm.email,
      culture: ruleForm.culture,
      province: ruleForm.province,
      city: ruleForm.city,
      from_organization_id: ruleForm.from_organization_id,
      tips: ruleForm.tips,
    }
    console.log(config)
    axiosHttp({
      url: url.addCustomers,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.curstomerVisible = false
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          let param = JSON.stringify(res.data.data)

          if (num) {
            self.$router.push({
              path: '/etm/customeRegist',
              query: { param: param },
            })
          }
        }
      },
    })
  },

  //1.3 客户报名、学员报名、创建订单
  createOrder(self, ruleForm) {
    let config = {
      order_token: ruleForm.order_token,
      aid: ruleForm.aid,
      uid: ruleForm.uid,
      id_card_number: ruleForm.id_card_number,
      todo_id: ruleForm.todo_id,
      pay_type: ruleForm.pay_type,
      pay_money: ruleForm.pay_money,
      order_money: ruleForm.order_money,
      reduction: ruleForm.reduction,
      overdue_money: ruleForm.overdue_money,
      surname: ruleForm.surname,
      mobile: ruleForm.mobile,
      id_card_number: ruleForm.id_card_number,
      supplement_time: ruleForm.supplement_time,
      receipt_file: ruleForm.receipt_file,
    }
    console.log(config)
    axiosHttp({
      url: url.createOrder,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.orderVisible = true
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  //网课学生列表
  onlineUserList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.onlineUserList,
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
  //2.0 返回省/市/区县三级联动数据json数据
  getProinvceList(self, name) {
    let config = {
      type: 'province',
      // search_box: ruleForm.search_box,
      // page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getProinvceList,
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
  //1.4 用户详情 用户资料详情 用户档案详情
  getUserDetail(self, name) {
    let config = {
      order_token: Math.floor(Math.random() * 1000000 + 1) + '',
      uid: self.$route.query.uid,
      // search_box: ruleForm.search_box,
      // page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getUserDetail,
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
  //1.5 招生修改学员信息、修改学员档案（客户管理、修改客户资料、客户报名）
  modifyUserDetail(self, formData) {
    let config = {
      id: formData.id,
      surname: formData.surname,
      mobile: formData.mobile,
      id_card_number: formData.id_card_number,
      sex: formData.sex,
      birthday: formData.birthday,
      marry: formData.marry,
      qq: formData.qq,
      email: formData.email,
      culture: formData.culture,
      province: formData.province,
      city: formData.city,
      from_organization_id: formData.from_organization_id,
      sources: formData.sources,
      tips: formData.tips,
      uid: formData.uid,
    }
    console.log(config)
    axiosHttp({
      url: url.modifyUserDetail,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.editorInfoShow = false
          self.$api.getUserDetail(self, 'ruleForm')
          // self[name] = data
        }
      },
    })
  },
  //1.8 用户跟进记录 跟进详情 跟进动作
  getUserRecord(self, name) {
    let config = {
      uid: self.ruleForm.uid,
    }
    console.log(config)
    axiosHttp({
      url: url.getUserRecord,
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
  //公海客户列表
  getCommonUserList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getCommonUserList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
          // self.orderVisible = true
          // self.$message({
          //   type: 'success',
          //   message: res.data.message,
          // })
        }
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
}

export default enrollStu
