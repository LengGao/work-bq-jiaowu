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
const baseUrl = process.env.NODE_ENV === "development" ? 'http://thing.com' : ''
export const downloadUrl = `${baseUrl}/static/order_import.xlsx`
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
 * @param {*} data 
 */
export function orderCancel(params) {
    return request({
        url: '/order/cancel',
        method: 'get',
        params
    })
}

/**
 * 订单审批
 * @param {*} params 
 */
 export function Approvalist(params) {
    return request({
        url: '/order/index',
        method: 'get',
        params
    })
}