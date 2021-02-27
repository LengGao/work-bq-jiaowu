import request from '@/utils/request'
export function insertCategory(params) {
    return request({
      url: '/courseCategory/getCategoryList',
      method: 'get',
      params:params
    })
  }