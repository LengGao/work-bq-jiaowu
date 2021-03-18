/**
 * 教务管理
 */
import request from '@/utils/request'
//证件资料===============================
/**
 * 获取证件资料列表
 */
export function getCertificates(params) {
    return request({
        url: '/userArchives/getCertificates',
        method: 'get',
        params
    })
}
/**
 * shang
 * @param {*} data 
 */
export const uploadImageUrl = `${process.env.VUE_APP_LOACTION}/oss/uploadImage`

/**
 * 根据id修改证件资料
 * @param {*} data 
 */
export function modifyCertificate(data) {
    return request({
        url: '/userArchives/modifyCertificate',
        method: 'post',
        data
    })
}
//根据id获取证件资料
export function getCertificateInfo(params) {
    return request({
        url: '/userArchives/getCertificateInfo',
        method: 'get',
        params
    })
}
//根据id下载证件资料
export function zipDownload(data) {
    return request({
        url: '/UserArchives/zipDownload',
        method: 'post',
        data
    })
}
//根据id获取上传记录
export function getCertificateLog(params) {
    return request({
        url: '/userArchives/getCertificateLog',
        method: 'get',
        params
    })
}