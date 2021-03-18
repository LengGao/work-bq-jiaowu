/**
 * 教务管理
 */
import request from '@/utils/request'
//证件资料===============================
/**
 * 获取证件资料列表
 */
export function getCertificates() {
    return request({
        url: '/userArchives/getCertificates',
        method: 'get',
    })
}