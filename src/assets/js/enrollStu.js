import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'
let enrollStu = {
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
      uid: 1,
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
}

export default enrollStu
