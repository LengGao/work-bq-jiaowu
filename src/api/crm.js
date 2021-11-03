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
