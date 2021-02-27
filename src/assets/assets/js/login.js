
import { axiosHttp, v, url } from '@/assets/js/ajaxCommon'
import request from '@/utils/request'
/**
 *  axiosHttp
 * 
 * 接收一个对象 
 *  method 请求类型
 *  url 请求链接
 *  data 请求数据
 *  then 回调方法
 */


export function login(username, password) {
  console.log(username, password)
  // return request({
  //   url: '/admin/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}


let loginApi = {
  /**
   * 一、获取课程分类列表
   */
  login(username, password) {
    console.log(username, password)
    // return request({
    //   url: '/admin/login',
    //   method: 'post',
    //   data: {
    //     username,
    //     password
    //   }
    // })
    // let config = {
    //   p: page,
    // }
    // axiosHttp({
    //   url: url.getClassification,
    //   data: config,
    //   method: 'GET',
    //   then(res) {
    //     let data = res.data.data
    //     self[name] = data
    //   },
    // })
  },
  logout(self, name, page) {
    let config = {
      p: page,
    }
    axiosHttp({
      url: url.getClassification,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        self[name] = data
      },
    })
  },
  getInfo(self, name, page) {
    let config = {
      p: page,
    }
    axiosHttp({
      url: url.getClassification,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        self[name] = data
      },
    })
  }
}
export default loginApi
