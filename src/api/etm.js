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
