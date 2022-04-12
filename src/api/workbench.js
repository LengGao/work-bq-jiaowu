
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
// 获取部门列表
export function terminalGroup(params) {
    return request({
        url: '/index/terminalGroup',
        method: 'get',
        params
    })
}
// 获取部门下的用户id
export function getDepartmentUser(data) {
    return request({
        url: 'index/getDepartmentUser',
        method: 'post',
        data
    })
}

// 获取可选员工
export function getBindUser(params) {
    return request({
        url: '/index/bindUser',
        method: 'get',
        params
    })
}
// 获取业绩指标数据
export function performanceIndicators(data) {
    return request({
        url: '/index/performanceIndicators',
        method: 'post',
        data
    })
}
// 获取销售趋势数据
export function getTrendData(data) {
    return request({
        url: '/index/trend',
        method: 'post',
        data
    })
}
// 获取销售龙虎榜
export function getSalesRankData(data) {
    return request({
        url: '/index/salesRank',
        method: 'post',
        data
    })
}
// 获取客户录入排行榜
export function getCustomerRankData(data) {
    return request({
        url: '/index/customerRank',
        method: 'post',
        data
    })
}
// 获取在线人数
export function getOnlineStatistics(data) {
    return request({
        url: '/index/onlineStatistics',
        method: 'post',
        data
    })
}
// 获取在线人数
export function getBriefing(data) {
    return request({
        url: '/index/briefing',
        method: 'post',
        data
    })
}
// 获取回款计划提醒
export function receivablePlan(data) {
    return request({
        url: '/index/receivablePlan',
        method: 'post',
        data
    })
}
// 获取待跟进客户
export function staffFollow(data) {
    return request({
        url: '/index/staffFollow',
        method: 'post',
        data
    })
}
// 获取系统公告
export function getSystemMsgList(data) {
    return request({
        url: '/index/getSystemAnnouncementList',
        method: 'post',
        data
    })
}
// 获取工作通知
export function getStaffNotice(params) {
    return request({
        url: 'StaffNotice/index',
        method: 'get',
        params
    })
}
// 工作通知-标为已读
export function readStaffNotice(params) {
    return request({
        url: 'StaffNotice/read',
        method: 'get',
        params
    })
}
// 获取查看数据范围选项
export function getGroupWithUser(params) {
    return request({
        url: '/index/getGroupWithUser',
        method: 'get',
        params
    })
}
// 根据数据范围选项查询用户ID
export function getUserId(data) {
    return request({
        url: 'index/getUserId',
        method: 'post',
        data
    })
}
// 通知
export function getNoticeData(params) {
    return request({
        url: 'StaffNotice/notice',
        method: 'get',
        params
    })
}
// 获取职业教育列表
export function getJobTitleList(data) {
    return request({
        url: '/index/jobTitleList',
        method: 'post',
        data
    })
}
// 获取职业教育详情
export function getJobTitleDetail(data) {
    return request({
        url: '/index/jobTitleDetail',
        method: 'post',
        data
    })
}
// 获取学历教育列表
export function getEducationList(data) {
    return request({
        url: '/index/educationList',
        method: 'post',
        data
    })
}
// 获取学历教育详情
export function getEducationDetail(data) {
    return request({
        url: '/index/educationDetail',
        method: 'post',
        data
    })
}
// 获取机构学费金额排行
export function getOrgTuitionRank(data) {
    return request({
        url: '/index/orgTuitionRank',
        method: 'post',
        data
    })
}
// 获取机构其他金额排行
export function getOrgOtherMoneyRank(data) {
    return request({
        url: '/index/orgOtherMoneyRank',
        method: 'post',
        data
    })
}
// 获取机构销售数据排行
export function getOrgSalesRank(data) {
    return request({
        url: '/index/orgSalesRank',
        method: 'post',
        data
    })
}
// 获取机构学生数据排行
export function getOrgStudentRank(data) {
    return request({
        url: '/index/orgStudentRank',
        method: 'post',
        data
    })
}
// 获取部门销售数据排行
export function getDepartmentRank(data) {
    return request({
        url: '/index/departmentRank',
        method: 'post',
        data
    })
}
// 获取校区销售数据排行
export function getSchoolRank(data) {
    return request({
        url: '/index/schoolRank',
        method: 'post',
        data
    })
}
// 获取入账列表
export function getPayLogList(data) {
    return request({
        url: '/index/payLogList',
        method: 'post',
        data
    })
}