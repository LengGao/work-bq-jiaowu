import request from '@/utils/request'
// 业绩目标列表
export function getPerformanceTargetList(params) {
    return request({
        url: '/PerformanceTargets/lists',
        method: 'get',
        params
    })
}
// 业绩目标列表-获取年
export function getYear(params) {
    return request({
        url: 'PerformanceTargets/getYear',
        method: 'get',
        params
    })
}
// 业绩目标列表-添加年度目标
export function createYearRecord(data) {
    return request({
        url: 'PerformanceTargets/createYearRecord',
        method: 'post',
        data
    })
}
// 业绩目标列表-启用年度目标
export function modifyYearStatus(data) {
    return request({
        url: 'PerformanceTargets/modifyYearStatus',
        method: 'post',
        data
    })
}
// 业绩目标列表-复制
export function copyYearRecord(data) {
    return request({
        url: 'PerformanceTargets/copy',
        method: 'post',
        data
    })
}
// 业绩目标列表-删除
export function deletedYearRecord(data) {
    return request({
        url: 'PerformanceTargets/deletedYearRecord',
        method: 'post',
        data
    })
}
// 业绩目标-获取部门列表
export function getGroup(params) {
    return request({
        url: 'PerformanceTargets/getGroup',
        method: 'get',
        params
    })
}
// 业绩目标-获取员工列表
export function getStaff(params) {
    return request({
        url: 'PerformanceTargets/getStaff',
        method: 'get',
        params
    })
}
// 业绩目标-获取详情
export function getPerformanceTargetsInfo(params) {
    return request({
        url: 'PerformanceTargets/getInfo',
        method: 'get',
        params
    })
}
// 业绩目标-修改员工业绩目标
export function updateStaffTarget(data) {
    return request({
        url: 'PerformanceTargets/updateStaffTarget',
        method: 'post',
        data
    })
}
// 审批设置
export function setApproveConfig(data) {
    return request({
        url: '/OrderReview/setConfig',
        method: 'post',
        data
    })
}
// 获取审批设置
export function getApproveConfig(params) {
    return request({
        url: 'OrderReview/getConfig',
        method: 'get',
        params
    })
}
// 获取公海配置
export function getInternationalWatersConfig(params) {
    return request({
        url: '/SystemConfig/getConfig',
        method: 'get',
        params
    })
}
// 获取公海配置
export function setInternationalWatersConfig(data) {
    return request({
        url: '/SystemConfig/setConfig',
        method: 'post',
        data
    })
}
// 获取东培公海客户列表
export function getDpAppletList(params) {
    return request({
        url: 'HighSeas/dpApplet',
        method: 'get',
        params
    })
}
// 获取机构公海客户列表
export function getOrgAppletList(params) {
    return request({
        url: 'HighSeas/orgApplet',
        method: 'get',
        params
    })
}
// 获取crm公海客户列表
export function getCrmList(params) {
    return request({
        url: 'HighSeas/getCrmList',
        method: 'get',
        params
    })
}
// 获取东培公海客户列表-删除
export function deleteDpApplet(data) {
    return request({
        url: 'HighSeas/deleteDpApplet',
        method: 'post',
        data
    })
}
// 获取东培公海客户列表-领取
export function receive(data) {
    return request({
        url: 'HighSeas/receive',
        method: 'post',
        data
    })
}
// 获取自定义字段列表-不分页
export function getCustomfieldList(params) {
    return request({
        url: '/Customfield/getList',
        method: 'get',
        params
    })
}
// 获取自定义字段列表-分页
export function getCustomfieldPage(params) {
    return request({
        url: '/Customfield/getPage',
        method: 'get',
        params
    })
}
// 获取自定义字段列表-添加
export function createCustomfield(data) {
    return request({
        url: '/Customfield/createCustom',
        method: 'post',
        data
    })
}
// 获取自定义字段列表-修改
export function modifyCustomfield(data) {
    return request({
        url: '/Customfield/modifyCustom',
        method: 'post',
        data
    })
}
// 获取自定义字段列表-字段详情
export function getCustomfieldInfo(params) {
    return request({
        url: '/Customfield/getCustomInfo',
        method: 'get',
        params
    })
}
// 获取自定义字段列表-字段删除
export function deletedCustomfield(data) {
    return request({
        url: '/Customfield/deletedCustom',
        method: 'post',
        data
    })
}
// 获取自定义字段列表-修改字段信息
export function modifyCustomfieldInfo(data) {
    return request({
        url: '/Customfield/modifyInfo',
        method: 'post',
        data
    })
}
// crm添加客户
export function createCrmCustomer(data) {
    return request({
        url: 'CrmCustomer/create',
        method: 'post',
        data
    })
}
// crm报名 
export function createCrmOrder(data) {
    return request({
        url: 'CrmOrder/create',
        method: 'post',
        data
    })
}
// crm添加客户-获取标签
export function getCrmTags(params) {
    return request({
        url: 'CrmTags/index',
        method: 'get',
        params
    })
}
// crm创建回款计划
export function createOrderPayPlan(data) {
    return request({
        url: 'OrderPayPlan/create',
        method: 'post',
        data
    })
}
// crm订单列表
export function getCrmOrderList(data) {
    return request({
        url: 'CrmOrder/index',
        method: 'post',
        data
    })
}
// crm订单详情
export function getCrmOrderDetail(params) {
    return request({
        url: 'CrmOrder/detail',
        method: 'get',
        params
    })
}
