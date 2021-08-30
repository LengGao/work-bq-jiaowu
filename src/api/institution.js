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
// 机构列表-修改
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