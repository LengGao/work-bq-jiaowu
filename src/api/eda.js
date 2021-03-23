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