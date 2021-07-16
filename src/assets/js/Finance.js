import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'

let Finance = {
  //订单管理
  orderindex(self, name) {
    let config = {
      all: self.all,
      ...self.searchData,
      page: self.page,
      all: 1,
    }
    console.log(config)
    axiosHttp({
      url: url.orderindex,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self[name] = data
          self.panelData = res.data.data.count[0]
          // self.ruleForm = res.data.data.list[0]
        }
      },
    })
  },

  //订单详情
  orderdetail(self, name, callback) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
      order_id: self.order_id,
      //order_id赋值：order_id
    }
    console.log(config)
    axiosHttp({
      url: url.orderdetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        let data = res.data.data
        if (res.data.code == 0) {
          self.projectData = []
          self[name] = data
          console.log(data.project)
          const project = JSON.parse(data.project)
          self.projectData = Array.isArray(project) ? project : [project]
          // console.log( self.projectData )
          self.pay_log = data.pay_log
          self.ruleForm = res.data.data
          callback()
        }
      },
    })
  },


}

export default Finance
