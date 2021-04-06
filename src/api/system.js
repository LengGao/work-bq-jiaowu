import request from '@/utils/request'
/**
 * 通知公告列表
 * @param {*} params 
 */
 export function noticelist(params) {
    return request({
        url: '/SystemAnnouncement/list',
        method: 'get',
        params
    })
}
/**
 * 添加公告
 * @param {*} data 
 */
 export function noticecreate(data) {
    return request({
        url: '/SystemAnnouncement/create',
        method: 'post',
        data
    })
}
/**
 * 修改公告
 * @param {*} data 
 */
 export function noticeupdate(data) {
    return request({
        url: '/SystemAnnouncement/update',
        method: 'post',
        data
    })
}

/**
 * 通知对象
 * @param {*} params 
 */
 export function getReceiverSelect(params) {
    return request({
        url: '/SystemAnnouncement/getReceiverSelect',
        method: 'get',
        params
    })
}

/**
 * 删除通知
 * @param {*} data 
 */
 export function noticedelete(data) {
    return request({
        url: '/SystemAnnouncement/delete',
        method: 'post',
        data
    })
}

/**
 * 通知详情
 * @param {*} data 
 */
 export function noticeinfo(data) {
    return request({
        url: '/SystemAnnouncement/info',
        method: 'post',
        data
    })
}


