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
