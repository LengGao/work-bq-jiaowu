/**
 * 考务管理相关
 */
import request from '@/utils/request'
// 成绩管理管理=======
/**
 * 按计划
 */

export function getPlanList(params) {
  return request({
    url: '/Graduation/planList',
    method: 'get',
    params,
  })
}
/**
 * 按学员
 */
export function getGradeListByUser(params) {
  return request({
    url: '/Graduation/getGradeListByUser',
    method: 'get',
    params,
  })
}
/**
 * 计划成绩详情列表
 */
export function getGradeListByPlan(params) {
  return request({
    url: '/Graduation/getGradeListByPlan',
    method: 'get',
    params,
  })
}
/**
 * 获取成绩详情下拉列表数据
 */
export function getPlanGradeSelect(params) {
  return request({
    url: '/Graduation/getPlanGradeSelect',
    method: 'get',
    params,
  })
}
/**
 *全部成绩
 */
export function getSubjectListByUser(params) {
  return request({
    url: '/Graduation/getSubjectListByUser',
    method: 'get',
    params,
  })
}
/**
 *历史成绩
 */
export function getHistoryGradeList(params) {
  return request({
    url: '/Graduation/getHistoryGradeList',
    method: 'get',
    params,
  })
}
/**
 *获取计划学员成绩详情
 */
export function getPlanGradeDetail(params) {
  return request({
    url: '/Graduation/getPlanGradeDetail',
    method: 'get',
    params,
  })
}
/**
 * 保存成绩
 * @param {*} data
 */
export function saveGrade(data) {
  return request({
    url: '/Graduation/saveGrade',
    method: 'post',
    data,
  })
}
/**
 * 批量通过
 * @param {*} data
 */
export function batchPass(data) {
  return request({
    url: '/Graduation/batchPass',
    method: 'post',
    data,
  })
}
