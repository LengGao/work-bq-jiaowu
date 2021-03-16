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