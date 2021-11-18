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
        url: 'Organization/updateOther',
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
        url: 'OrganizationAccount/modifyData',
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
// 机构用户列表-修改机构配置
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
/**
 * 获取模板列表
 */
export function getOrgWxTemplateConfigData(params) {
    return request({
        url: '/Merchant/getOrgWxTemplateConfigData',
        method: 'get',
        params,
    })
}

/**
 * 构建模板消息列表
 */
export function buildOrgWxTemplateConfigData(params) {
    return request({
        url: '/Merchant/buildOrgWxTemplateConfigData',
        method: 'get',
        params,
    })
}


// 小程序，公众号授权文件， 上传
export const uploadLocal = `${process.env.VUE_APP_LOACTION}/oss/uploadLocal `


//修改模板发送状态
export function updateOrgWxTemplateConfigStatus(data) {
    return request({
        url: '/Merchant/updateOrgWxTemplateConfigStatus',
        method: 'post',
        data
    })
}

//根据机构id获取token
export function getInstitutionToken(data) {
    return request({
        url: 'OrganizationAccount/getToken',
        method: 'post',
        data
    })
}

//机构小程序列表
export function appletManagement(params) {
    return request({
        url: '/Merchant/appletManagement',
        method: 'get',
        params
    })
}
//机构小程序列表-模板选项
export function templateSelect(params) {
    return request({
        url: '/Merchant/templateSelect',
        method: 'get',
        params
    })
}
//机构小程序列表-添加
export function batchCreateCode(data) {
    return request({
        url: 'Merchant/batchCreateCode',
        method: 'post',
        data
    })
}
//机构小程序列表-审核
export function batchAuditCode(data) {
    return request({
        url: 'Merchant/batchAuditCode',
        method: 'post',
        data
    })
}
//机构小程序列表-审核撤回
export function batchUndoCodeAudit(data) {
    return request({
        url: 'Merchant/batchUndoCodeAudit',
        method: 'post',
        data
    })
}
//机构小程序列表-发布
export function batchPublishCode(data) {
    return request({
        url: 'Merchant/batchPublishCode',
        method: 'post',
        data
    })
}
//机构小程序代码草稿箱
export function templateDraftList() {
    return request({
        url: '/Merchant/templateDraftList',
        method: 'get',
    })
}
//机构小程序代码草稿箱-添加到标准模板库
export function addToTemplate(data) {
    return request({
        url: '/Merchant/addToTemplate',
        method: 'post',
        data
    })
}


// ----------------------------- 机构详情接口 -----------------------------

/**
 * 机构学生列表
 */
export function Organizationstudents(params) {
    return request({
        url: '/Organization/studentsList',
        method: 'get',
        params,
    })
}

/**
 * 公海学员列表
 */
export function highSeasStudent(params) {
    return request({
        url: '/Organization/highSeasStudent',
        method: 'get',
        params,
    })
}

/**
 * 资金流水
 */
export function moneyFlowing(params) {
    return request({
        url: '/Organization/moneyFlowing',
        method: 'get',
        params,
    })
}

/**
 * 学生订单
 */
export function studentsOrder(params) {
    return request({
        url: '/Organization/studentsOrder',
        method: 'get',
        params,
    })
}

// 课程列表-树状数据
export function courseCateSelectTree(params) {
    return request({
        url: '/Merchant/courseCateSelectTree',
        method: 'get',
        params,
    })
}

// 机构课程列表
export function getCourseList(params) {
    return request({
        url: '/Merchant/orgCourseList',
        method: 'get',
        params,
    })
}

// 移除课程
export function deleteOrgCourse(params) {
    return request({
        url: '/Merchant/deleteOrgCourse',
        method: 'get',
        params,
    })
}

// 题库列表
export function questionBankList(params) {
    return request({
        url: '/Organization/questionBankList',
        method: 'get',
        params,
    })
}
// 题库分类列表
export function questionBankCategoryList(params) {
    return request({
        url: '/Organization/questionBankCategoryList',
        method: 'get',
        params,
    })
}

// 移除题库
export function BankRelationremove(data) {
    return request({
        url: 'OrganizationQuestionBankRelation/remove',
        method: 'post',
        data,
    })
}
// 学生对接列表
export function getOrgStudentReceptionList(params) {
    return request({
        url: '/Merchant/getOrgStudentReceptionList',
        method: 'get',
        params,
    })
}
// 机构详情-学生对接列表-获取员工选项
export function getStaffSelect(params) {
    return request({
        url: '/Merchant/getStaffSelect',
        method: 'get',
        params
    })
}
// 机构详情-学生对接列表-保存
export function setStudentReception(params) {
    return request({
        url: '/Merchant/setStudentReception',
        method: 'get',
        params
    })
}