import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
// import { type } from 'jquery'

let enrollStu = {
  //1.1 招生录入学员信息、添加学员档案（客户管理、添加客户、客户报名）
  addCustomers(self, ruleForm) {
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
        }
      },
    })
  },
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
}

export default enrollStu
