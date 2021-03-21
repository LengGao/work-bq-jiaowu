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