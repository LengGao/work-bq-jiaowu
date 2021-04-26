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

/**
 * 通知推送
 * @param {*} data 
  */
 export function noticepush(data) {
    return request({
        url: '/SystemAnnouncement/push',
        method: 'post',
        data
    })
}

/**
 * 发送记录
 * @param {*} params 
 */
 export function sendRecord(params) {
    return request({
        url: '/SystemAnnouncement/sendRecord',
        method: 'get',
        params
    })
}

/**
 * 合同模板列表
 * @param {*} params 
 */
 export function templatelist(params) {
    return request({
        url: 'contract/template_list',
        method: 'get',
        params
    })
}

/**
 * 添加合同模板
 * @param {*} data 
 */
 export function templateadd(data) {
    return request({
        url: 'contract/template_add',
        method: 'post',
        data
    })
}

/**
 * 编辑合同模板
 * @param {*} data 
 */
 export function templateedit(data) {
    return request({
        url: 'contract/template_edit',
        method: 'post',
        data
    })
}


/**
 * 上传合同模板
 */
 export const uploadUrl = `${process.env.VUE_APP_LOACTION}/contract/upload_template`

 /**
 * 删除合同模板
 */
  export function templatedel(data) {
    return request({
        url: 'contract/template_del',
        method: 'post',
        data
    })
}

 /**
 * 关联合同模板
 */
  export function contractlink(data) {
    return request({
        url: 'contract/link',
        method: 'post',
        data
    })
}