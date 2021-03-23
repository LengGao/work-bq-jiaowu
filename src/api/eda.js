/**
 * 教务相关
 */
import request from '@/utils/request'

// 教材发放=======
/**
 * 获取教材发放列表
 */
export function dispenseList(params) {
    return request({
        url: '/books/dispenseList',
        method: 'get',
        params,
    })
}
/**
 * 发放教材
 * @param {*} data 
 */
export function dispenseBooks(data) {
    return request({
        url: '/books/dispenseBooks',
        method: 'post',
        data,
    })
}
/**
 * 发放日志
 * @param {} params 
 */
export function dispenseLog(params) {
    return request({
        url: '/books/dispenseLog',
        method: 'get',
        params,
    })
}
/**
 * 获取项目下拉菜单
 * @param {*} params 
 */
export function getproject(params) {
    return request({
        url: '/project/getproject',
        method: 'get',
        params,
    })
}
/**
 * 获取班级下拉
 * @param {*} params 
 */
export function getcourseallclass(params) {
    return request({
        url: '/classroom/getcourseallclass',
        method: 'get',
        params,
    })
}
// 学生中心====================
/**
 * 学生列表
 * @param {*} params 
 */
export function getStudentList(params) {
    return request({
        url: '/classstudents/studentmanage',
        method: 'get',
        params,
    })
}
/**
 * 学生详情-基本信息
 * @param {*} params 
 */
export function getStudentBasicDetail(params) {
    return request({
        url: '/UserArchives/detail',
        method: 'get',
        params,
    })
}
/**
 * 修改学生基本信息
 * @param {*} params 
 */
export function updateStudentBasicInfo(data) {
    return request({
        url: '/UserArchives/modify',
        method: 'post',
        data,
    })
}
/**
 * 学习轨迹
 * @param {*} params 
 */
export function studentBehaviorRecord(params) {
    return request({
        url: 'StudentBehaviorRecord/index',
        method: 'get',
        params,
    })
}
/**
 * 学生跟进记录
 * @param {*} params 
 */
export function userArchivesRecord(params) {
    return request({
        url: '/UserArchivesRecord/index',
        method: 'get',
        params,
    })
}
/**
 * 添加跟进记录
 * @param {*} data 
 */
export function addUserArchivesRecord(data) {
    return request({
        url: '/UserArchivesRecord/add',
        method: 'post',
        data,
    })
}
