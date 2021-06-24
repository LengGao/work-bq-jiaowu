
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
export function getFollowPage(params) {
    return request({
        url: '/StaffFollow/getFollowPage',
        method: 'get',
        params
    })
}
/**
 * 更新待办状态
 * @param {*} params 
 */
export function updateState(data) {
    return request({
        url: '/StaffFollow/updateState',
        method: 'post',
        data
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

/**
 * 通知公告列表
 */
export function getSystemAnnouncementList(params) {
    return request({
        url: '/Workbench/getSystemAnnouncementList',
        method: 'get',
        params
    })
}

/**
 * 公告详情
 */
export function getAnnouncementInfo(params) {
    return request({
        url: '/Workbench/getAnnouncementInfo',
        method: 'get',
        params
    })
}

/**
 * 公告标记已读未读
 */
export function setUnread(params) {
    return request({
        url: '/Workbench/setUnread',
        method: 'get',
        params
    })
}
// 获取分享链接
export function thirdSign(params) {
    return request({
        url: '/notify/thirdSign',
        method: 'get',
        params
    })
}