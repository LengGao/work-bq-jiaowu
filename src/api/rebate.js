import request from '@/utils/request'

export function rebateList(params) {
  return request({
    url: '/Crm/rebateList',
    method: 'get',
    params: params
  })
}
export function rebateDetail(params) {
  return request({
    url: '/Crm/rebateDetail',
    method: 'get',
    params: params
  })
}
// 获取机构
export function getOrgName(params) {
  return request({
      url: '/OrgReceivable/getOrgName',
      method: 'get',
      params
  })
}
// 获取创建人
export function getStaffSelect(params) {
  return request({
      url: '/Merchant/getStaffSelect',
      method: 'get',
      params
  })
}
// 学历订单列表
export function getEduList(params) {
  return request({
    url: '/EduOrder/order',
    method: 'get',
    params,
  })
}

// 审核返点-拒绝
export function approveRebate(data) {
  return request({
    url: '/Crm/approveRebate',
    method: 'post',
    data: data
  })
}

// 审核返点-同意
export function approveRebateadopt(data) {
  return request({
    url: '/Crm/approveRebate',
    method: 'post',
    data: data
  })
}

// 添加返点
export function applyRebate(data) {
  return request({
    url: '/Crm/applyRebate',
    method: 'post',
    data: data
  })
}