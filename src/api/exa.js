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
//考试科目列表
export function getSubjectList(params) {
  return request({
    url: '/Examination/subjectList',
    method: 'get',
    params,
  })
}
// 添加科目
export function createSubject(data) {
  return request({
    url: '/Examination/createSubject',
    method: 'post',
    data,
  })
}
// 修改科目
export function updateSubject(data) {
  return request({
    url: '/Examination/updateSubject',
    method: 'post',
    data,
  })
}
// 删除科目
export function deleteSubject(data) {
  return request({
    url: '/Examination/deleteSubject',
    method: 'post',
    data,
  })
}
// 科目详情
export function getSubjectDetail(params) {
  return request({
    url: '/Examination/subjectInfo',
    method: 'get',
    params,
  })
}
//报考规则列表
export function getRuleList(params) {
  return request({
    url: '/Examination/ruleList',
    method: 'get',
    params,
  })
}
// 添加报考规则时下拉
export function getRuleSelect(params) {
  return request({
    url: '/Examination/getRuleSelect',
    method: 'get',
    params,
  })
}
// 获取规则，科目下拉列表
export function getSelectForPlan(params) {
  return request({
    url: '/Examination/getSelectForPlan',
    method: 'get',
    params,
  })
}
// 添加规则
export function createRule(data) {
  return request({
    url: '/Examination/createRule',
    method: 'post',
    data,
  })
}
// 修改规则
export function updateRule(data) {
  return request({
    url: '/Examination/updateRule',
    method: 'post',
    data,
  })
}
// 规则详情
export function getRuleDetail(params) {
  return request({
    url: '/Examination/ruleInfo',
    method: 'get',
    params,
  })
}
// 删除规则
export function deleteRule(data) {
  return request({
    url: '/Examination/deleteRule',
    method: 'post',
    data,
  })
}
//修改科目状态
export function updateSubjectStatus(data) {
  return request({
    url: '/Examination/updateSubjectStatus',
    method: 'post',
    data,
  })
}
//修改规则状态
export function updateRuleStatus(data) {
  return request({
    url: '/Examination/updateRuleStatus',
    method: 'post',
    data,
  })
}
//获取报考计划列表
export function planList(params) {
  return request({
    url: '/Examination/planList',
    method: 'get',
    params,
  })
}
// 添加报考计划
export function createPlan(data) {
  return request({
    url: '/Examination/createPlan',
    method: 'post',
    data,
  })
}
// 修改报考计划
export function updatePlan(data) {
  return request({
    url: '/Examination/updatePlan',
    method: 'post',
    data,
  })
}
// 报考计划详情
export function planInfo(params) {
  return request({
    url: '/Examination/planInfo',
    method: 'get',
    params,
  })
}
// 删除报考计划
export function deletePlan(data) {
  return request({
    url: '/Examination/deletePlan',
    method: 'post',
    data,
  })
}
// 报考计划详情列表
export function enrollRecordList(params) {
  return request({
    url: '/Examination/enrollRecordList',
    method: 'get',
    params,
  })
}
// 报考详情相关选择列表
export function getEnrollSelect(params) {
  return request({
    url: '/Examination/getEnrollSelect',
    method: 'get',
    params,
  })
}
// 报名
export function enroll(data) {
  return request({
    url: '/Examination/enroll',
    method: 'post',
    data,
  })
}
// 修改报名
export function updateEnroll(data) {
  return request({
    url: '/Examination/updateEnroll',
    method: 'post',
    data,
  })
}
// 报名科目选项
export function getSubjectSelectForEnroll(params) {
  return request({
    url: '/Examination/getSubjectSelectForEnroll',
    method: 'get',
    params,
  })
}
// 报考-选择学生列表
export function getStudentUserSelect(params) {
  return request({
    url: '/Examination/getStudentUserSelect',
    method: 'get',
    params,
  })
}
// 报考-选择学生列表-班级选项
export function getClassRoomSelect(params) {
  return request({
    url: '/Examination/getClassRoomSelect',
    method: 'get',
    params,
  })
}
// 报考详情
export function enrollInfo(params) {
  return request({
    url: '/Examination/enrollInfo',
    method: 'get',
    params,
  })
}
// 移除报名学生
export function removeStudent(data) {
  return request({
    url: '/Examination/removeStudent',
    method: 'post',
    data,
  })
}
// 报考审核详情
export function auditInfo(params) {
  return request({
    url: '/Examination/auditInfo',
    method: 'get',
    params,
  })
}
// 报考审核
export function audit(data) {
  return request({
    url: '/Examination/audit',
    method: 'post',
    data,
  })
}
// 重置审核
export function refresh(data) {
  return request({
    url: '/Examination/refresh',
    method: 'post',
    data,
  })
}
// 导出报考详情
export function exportEnrollRecord(params) {
  return request({
    url: '/Examination/exportEnrollRecord',
    method: 'get',
    params,
  })
}
//获取计划下拉列表
export function getPlanSelect(params) {
  return request({
    url: '/Examination/getPlanSelect',
    method: 'get',
    params,
  })
}
//获取计划相关科目列表
// export function getSubjectSelectForEnroll(params) {
//   return request({
//     url: '/Examination/getSubjectSelectForEnroll',
//     method: 'get',
//     params,
//   })
// }
//导出成绩按学员
export function exportUserGrade(params) {
  return request({
    url: '/Graduation/exportUserGrade',
    method: 'get',
    params,
  })
}
