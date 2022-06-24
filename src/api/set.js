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
// 获取部门列表
export function getDepartmentlists(params) {
  return request({
    url: '/TerminalGroup/lists',
    method: 'get',
    params,
  })
}
// 获取部门列表--新增
export function createDepartment(data) {
  return request({
    url: 'TerminalGroup/createData',
    method: 'post',
    data,
  })
}
// 获取部门列表--新增
export function modifyDepartment(data) {
  return request({
    url: 'TerminalGroup/modifyData',
    method: 'post',
    data,
  })
}
// 获取部门列表--新增
export function getDepartmentInfo(params) {
  return request({
    url: 'TerminalGroup/info',
    method: 'get',
    params,
  })
}
// 获取部门列表--删除
export function delDepartment(data) {
  return request({
    url: 'TerminalGroup/deletedGroup',
    method: 'post',
    data,
  })
}
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
// 员工列表--新增
export function addStaff(data) {
  return request({
    url: '/staff/add',
    method: 'post',
    data,
  })
}
// 员工列表--修改
export function modifyStaff(data) {
  return request({
    url: '/staff/modify',
    method: 'post',
    data,
  })
}
// 员工列表--员工信息
export function getStaffinfo(params) {
  return request({
    url: '/staff/info',
    method: 'get',
    params,
  })
}
// 员工列表--修改员工状态
export function updateStaffStatus(data) {
  return request({
    url: 'staff/updateOtherStatus',
    method: 'post',
    data,
  })
}
// 员工列表--一键离职
export function oneKeyEnd(data) {
  return request({
    url: 'staff/oneKeyEnd',
    method: 'post',
    data,
  })
}
// 员工列表--修改员工班主任
export function updateMaster(data) {
  return request({
    url: '/staff/updateMaster',
    method: 'post',
    data,
  })
}
// 员工新增--获取角色
export function getRoleSelectData(params) {
  return request({
    url: '/staff/getRoleSelectData',
    method: 'get',
    params,
  })
}
// 获取部门扁平数据
export function switchGroupList(params) {
  return request({
    url: 'TerminalGroup/switchList',
    method: 'get',
    params,
  })
}


// 清空小程序绑定
export function clearAppletOpenid(params) {
  return request({
    url: 'staff/clearAppletOpenid',
    method: 'get',
    params,
  })
}
// 获取工单列表
export function getWorkorderList(params) {
  return request({
    url: '/Workorder/getWorkorderList',
    method: 'get',
    params,
  })
}
// 工单列表-删除
export function deleteWorkorder(data) {
  return request({
    url: '/Workorder/deleteWorkorder',
    method: 'post',
    data,
  })
}
// 工单列表-选择学生
export function getUserSelect(params) {
  return request({
    url: '/Workorder/userSelect',
    method: 'get',
    params,
  })
}
// 工单列表-选择订单
export function getOrderSelect(params) {
  return request({
    url: '/Workorder/orderSelect',
    method: 'get',
    params,
  })
}
// 工单列表-提交工单
export function submitWorkorder(data) {
  return request({
    url: '/Workorder/submitWorkorder',
    method: 'post',
    data,
  })
}
// 工单列表-修改工单
export function updateWorkorder(data) {
  return request({
    url: '/Workorder/updateWorkorder',
    method: 'post',
    data,
  })
}
// 工单详情
export function getWorkorderDetail(params) {
  return request({
    url: '/Workorder/workorderDetail',
    method: 'get',
    params,
  })
}
// 工单详情-消息列表
export function workorderMessageList(params) {
  return request({
    url: '/Workorder/workorderMessageList',
    method: 'get',
    params,
  })
}
// 工单详情-消息发送
export function replyWorkorder(data) {
  return request({
    url: '/Workorder/replyWorkorder',
    method: 'post',
    data,
  })
}
// 工单详情-获取转交人
export function getStaffSelect(params) {
  return request({
    url: '/Workorder/staffSelect',
    method: 'get',
    params,
  })
}
// 工单详情-转交工单
export function deliverWorkorder(data) {
  return request({
    url: '/Workorder/deliverWorkorder',
    method: 'post',
    data,
  })
}
// 工单详情-关闭工单
export function finishWorkorder(data) {
  return request({
    url: '/Workorder/finishWorkorder',
    method: 'post',
    data,
  })
}
// 工单详情-重启工单
export function restartWorkorder(data) {
  return request({
    url: '/Workorder/restartWorkorder',
    method: 'post',
    data,
  })
}