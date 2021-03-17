import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import Vue from 'vue'
import { type } from 'jquery'

let Examination = {
    
//  //考试计划列表
 planList(self, name) {
    let config = {
      // search_box: ruleForm.search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.planList,
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

}

export default Examination