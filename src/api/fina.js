import request from '@/utils/request'
/**
 * 订单管理
 */

/**
 * 获取订单列表
 * @param {*} params 
 */
export function getOrderList(params) {
    return request({
        url: '/order/index',
        method: 'get',
        params
    })
}
/**
 * 导入订单
 * @param {*} data 
 */
export const importUrl = `${process.env.VUE_APP_LOACTION}/UserArchives/import`
export const downloadUrl = `${process.env.VUE_APP_DOWNLOAD}/static/order_import.xlsx`
/**
 * 订单收款
 * @param {*} data 
 */
export function orderCollect(data) {
    return request({
        url: '/order/charge',
        method: 'post',
        data
    })
}
/**
 * 订单作废 退费
 * @param {*} params 
 */
export function orderCancel(params) {
    return request({
        url: '/order/cancel',
        method: 'get',
        params
    })
}
/**
 * 订单审批列表
 * @param {*} params 
 */
export function Approvalist(params) {
    return request({
        url: '/order/index',
        method: 'get',
        params
    })
}
/**
 * 订单入账
 * @param {*} data 
 */
export function Orderentry(data) {
    return request({
        url: '/order/entry',
        method: 'post',
        data
    })
}
/**
 * 合同审核列表
 * @param {*} params 
 */
export function auditlist(params) {
    return request({
        url: 'contract/audit_list',
        method: 'get',
        params
    })
}
/**
 * 合同审核
 * @param {*} data 
 */
export function contractaudit(data) {
    return request({
        url: 'contract/audit',
        method: 'post',
        data
    })
}
/**
 * 生成合同
 * @param {*} data 
 */
export function generate(data) {
    return request({
        url: 'contract/generate',
        method: 'post',
        data
    })
}
// 同一订单多笔入账
export function logEntry(data) {
    return request({
        url: '/order/logEntry',
        method: 'post',
        data
    })
}