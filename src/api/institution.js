import request from '@/utils/request'
// 机构管理相关

// 机构列表
export function getInstitutionList(params) {
    return request({
        url: '/Organization/lists',
        method: 'get',
        params,
    })
}
// 机构列表-开关
export function modifyInstitutionOther(data) {
    return request({
        url: 'Organization/modifyOther',
        method: 'post',
        data,
    })
}
// 机构列表-添加
export function createInstitution(data) {
    return request({
        url: 'Organization/create',
        method: 'post',
        data,
    })
}
// 机构列表-修改
export function modifyInstitution(data) {
    return request({
        url: 'Organization/modify',
        method: 'post',
        data,
    })
}
// 机构列表-详情
export function getInstitutionDetail(params) {
    return request({
        url: 'Organization/info',
        method: 'get',
        params,
    })
}
// 机构列表-删除
export function deletedInstitution(data) {
    return request({
        url: 'Organization/deleted',
        method: 'post',
        data,
    })
}
// 机构列表-获取省市区
export function getRegionOptions(params) {
    return request({
        url: 'Organization/region',
        method: 'get',
        params,
    })
}
// 机构用户列表
export function getInstitutionUserList(params) {
    return request({
        url: 'OrganizationAccount/lists',
        method: 'get',
        params,
    })
}
// 机构用户列表-添加
export function createInstitutionUser(data) {
    return request({
        url: 'OrganizationAccount/create',
        method: 'post',
        data,
    })
}
// 机构用户列表-修改
export function modifyInstitutionUser(data) {
    return request({
        url: 'OrganizationAccount/modify',
        method: 'post',
        data,
    })
}
// 机构用户列表-获取用户信息
export function getInstitutionUserInfo(params) {
    return request({
        url: '/OrganizationAccount/info',
        method: 'get',
        params,
    })
}
// 机构用户列表-修改用户状态，是否超管
export function modifyInstitutionUserOther(data) {
    return request({
        url: 'OrganizationAccount/modifyOther',
        method: 'post',
        data,
    })
}
// 机构用户列表-修改用户状态，是否超管
export function modifyInstitutionConfig(data) {
    return request({
        url: 'Organization/configuration',
        method: 'post',
        data,
    })
}
// 机构列表-充值
export function institutionRecharge(data) {
    return request({
        url: 'Organization/recharge',
        method: 'post',
        data,
    })
}
// 班型列表
export function getClassTypeList(params) {
    return request({
        url: '/Merchant/classTypeList',
        method: 'get',
        params,
    })
}
// 班型列表-添加
export function createClassType(data) {
    return request({
        url: '/Merchant/createClassType',
        method: 'post',
        data,
    })
}
// 班型列表-修改
export function updateClassType(data) {
    return request({
        url: '/Merchant/updateClassType',
        method: 'post',
        data,
    })
}
// 班型列表-删除
export function deleteClassType(data) {
    return request({
        url: '/Merchant/deleteClassType',
        method: 'post',
        data,
    })
}
// 班型列表-启用禁用
export function updateClassTypeStatus(data) {
    return request({
        url: '/Merchant/updateClassTypeStatus',
        method: 'post',
        data,
    })
}
// 班型列表-排序
export function updateClassTypeSort(data) {
    return request({
        url: '/Merchant/updateClassTypeSort',
        method: 'post',
        data,
    })
}
// 分发课程-课程列表
export function getDistributeCourseList(params) {
    return request({
        url: '/Merchant/courseList',
        method: 'get',
        params,
    })
}
// 分发课程-机构列表
export function getOrgList(params) {
    return request({
        url: '/Merchant/orgList',
        method: 'get',
        params,
    })
}
// 分发课程
export function assignOrgCourse(data) {
    return request({
        url: '/Merchant/assignOrgCourse',
        method: 'post',
        data,
    })
}
// 分发题库
export function assignOrgQuestionBank(data) {
    return request({
        url: 'OrganizationQuestionBankRelation/authorization',
        method: 'post',
        data,
    })
}