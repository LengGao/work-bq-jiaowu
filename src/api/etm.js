/**
 * 招生相关
 */
import request from '@/utils/request'

// 客户管理=======
/**
 * 获取学生导入列表
 */
export function onlineUserList(params) {
  return request({
    url: '/classstudents/onlinestudents',
    method: 'get',
    params,
  })
}
/**
 * 获取客户列表
 */
export function getCustomerList(params) {
  return request({
    url: '/UserArchives/index',
    method: 'get',
    params,
  })
}
/**
 * 获取机构下拉列表
 */
export function getInstitutionList(params) {
  return request({
    url: '/institution/index',
    method: 'get',
    params,
  })
}
/**
 * 获取渠道来源
 */
export function getfieldinfo(params) {
  return request({
    url: '/Customfield/getfieldinfo',
    method: 'get',
    params,
  })
}
/**
 * 课程下拉
 */
export function getCourseSelect(params) {
  return request({
    url: '/course/index',
    method: 'get',
    params,
  })
}

/**
 * 项目列表
 */
export function getProject(params) {
  return request({
    url: '/project/index',
    method: 'get',
    params,
  })
}
/**
 * 公海客户
 */
export function getCommonUserList(params) {
  return request({
    url: '/Enrollment/commonUserList',
    method: 'get',
    params,
  })
}
// 删除公海客户
export function delUser(params) {
  return request({
    url: '/Enrollment/delUser',
    method: 'get',
    params,
  })
}
// 报名时选择项目
export function getCateProjectOption(params) {
  return request({
    url: '/project/cate_project',
    method: 'get',
    params,
  })
}
// 报名时选择项目-查询已选项目的详情
export function getCateProjectDetail(data) {
  return request({
    url: '/project/mult_detail',
    method: 'post',
    data,
  })
}
// 报名
export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data,
  })
}
// 清除用户登录信息
export function clearlogininfo(data) {
  return request({
    url: '/Admissions/clearlogininfo',
    method: 'post',
    data,
  })
}
// 获取最近登录用户
export function getRecentLoginUser(params) {
  return request({
    url: 'userArchives/loginUser',
    method: 'get',
    params,
  })
}
// 网课学员-退款，作废
export function cancelIntent(data) {
  return request({
    url: '/order/cancelIntent',
    method: 'post',
    data,
  })
}
