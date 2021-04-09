/**
 * 系统配置相关
 */
import request from '@/utils/request'

// 角色管理=======
/**
 * 获取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/role/index',
    method: 'get',
    params,
  })
}
// 角色管理=======
/**
 * 获取角色详情
 */
export function getRoleInfo(params) {
  return request({
    url: '/role/info',
    method: 'get',
    params,
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data,
  })
}
// 修改角色
export function modifyRole(data) {
  return request({
    url: '/role/modify',
    method: 'post',
    data,
  })
}
// 代办列表分页
export function getFollowPage(params) {
  return request({
    url: '/StaffFollow/getFollowPage',
    method: 'get',
    params,
  })
}
// 员工管理=======
/**
 * 获取员工列表
 */
export function getStaffList(params) {
  return request({
    url: '/staff/index',
    method: 'get',
    params,
  })
}
/**
 * 获取身份下拉列表
 */
export function getIdentitySelect(params) {
  return request({
    url: '/staff/getIdentitySelect',
    method: 'get',
    params,
  })
}
/**
 * 获取机构下拉列表
 */
export function getOrganizationSelect(params) {
  return request({
    url: '/institution/getOrganizationSelect',
    method: 'get',
    params,
  })
}
/**
 * 获取机构下拉列表
 */
export function getSchoolSelect(params) {
  return request({
    url: '/institution/getSchoolSelect',
    method: 'get',
    params,
  })
}
