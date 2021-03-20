import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'

let Finance = {
  //订单管理
  orderindex(self, name) {
    let config = {
      all: self.all,
      ...self.searchData,
      page: self.page,
      all:1,
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
 
        }
      },
    })
  },

  //订单详情
  orderdetail(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
      order_id: self.$route.query.order_id,
      //order_id赋值：上一级路由的order_id
    }
    console.log(config)
    axiosHttp({
      url: url.orderdetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data.pay_log)
        let data = res.data.data.pay_log
        if (res.data.code == 0) {
          self[name] = data
          self.ruleForm = res.data.data
        }
      },
    })
  },
}

export default Finance
