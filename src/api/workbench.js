
/**
 * 工作台相关接口
 */
import request from '@/utils/request'
/**
 * 獲取身份信息
 */
export function getIdentity() {
    return request({
        url: '/Workbench/getIdentity',
        method: 'get',
    })
}
/**
 * 獲取工作台基礎信息
 */
export function getAdminWorkData() {
    return request({
        url: '/Workbench/getAdminWorkData',
        method: 'get',
    })
}
/**
 * 獲取訪問量
 */
export function getVisitChart(params) {
    return request({
        url: '/Workbench/getVisitChart',
        method: 'get',
        params
    })
}
/**
 * 获取销售额
 * @param {type} params 
 */
export function getSaleChart(params) {
    return request({
        url: '/Workbench/getSaleChart',
        method: 'get',
        params
    })
}
/**
 * 获取招生/教务工作台信息
 */
export function getStaffWorkData() {
    return request({
        url: '/Workbench/getStaffWorkData',
        method: 'get',
    })
}
/**
 * 获取待办信息
 * @param {*} params 
 */
export function getStaffBacklog(params) {
    return request({
        url: '/Workbench/getStaffBacklog',
        method: 'get',
        params
    })
}
/**
 * 获取所有入口
 * 
 */
export function getMenuList() {
    return request({
        url: '/Workbench/getMenuList',
        method: 'get',
    })
}
/**
 * 设置快捷入口
 */
export function setStaffQuickEntry(data) {
    return request({
        url: '/Workbench/setStaffQuickEntry',
        method: 'post',
        data
    })
}