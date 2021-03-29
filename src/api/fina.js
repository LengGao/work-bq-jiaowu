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
export function importOrder(data) {
    return request({
        url: '/UserArchives/import',
        method: 'post',
        data
    })
}
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
export function orderCancel(data) {
    return request({
        url: '/order/cancel',
        method: 'post',
        data
    })
}