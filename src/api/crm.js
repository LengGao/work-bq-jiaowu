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
// crm创建回款记录
export function payLogCreate(data) {
    return request({
        url: 'CrmOrder/payLogCreate',
        method: 'post',
        data
    })
}
// crm客户列表
export function getCrmCustomerList(data) {
    return request({
        url: 'CrmCustomer/index',
        method: 'post',
        data
    })
}
// crm获取自定义字段的选项
export function getCustomfieldOptions(params) {
    return request({
        url: '/Customfield/getInfo',
        method: 'get',
        params
    })
}
// 获取招生审批订单列表
export function getCrmApproveOrder(data) {
    return request({
        url: 'CrmOrder/authorize',
        method: 'post',
        data
    })
}
// 订单操作 1、通过，2：拒绝 , 3:撤销/作废订单，4、删除订单
export function crmOrderApprove(data) {
    return request({
        url: 'CrmOrder/approve',
        method: 'post',
        data
    })
}
// 招生回款列表
export function getReturnPaymentList(data) {
    return request({
        url: 'CrmOrder/log',
        method: 'post',
        data
    })
}
// 招生回款列表-入账、驳回
export function entryLog(data) {
    return request({
        url: 'CrmOrder/entryLog',
        method: 'post',
        data
    })
}
// 开课
export function eduOpenCourse(params) {
    return request({
        url: 'CrmOrder/eduOpenCourse',
        method: 'get',
        params
    })
}
// 分发项目列表
export function getProjectOrgList(params) {
    return request({
        url: 'ProjectOrg/projectIndex',
        method: 'get',
        params
    })
}
// 分发项目列表-分发
export function sendClassType(data) {
    return request({
        url: 'ProjectOrg/sendClassType',
        method: 'post',
        data
    })
}
// 教务开课，机构班型
export function getInstitutionClassType(data) {
    return request({
        url: 'CrmCourse/classType',
        method: 'post',
        data
    })
}

// 教务开课
export function orderOpen(data) {
    return request({
        url: 'CrmOrder/orderOpen',
        method: 'post',
        data
    })
}
// 教务开课列表
export function projectUser(data) {
    return request({
        url: 'CrmOrder/projectUser',
        method: 'post',
        data
    })
}

// 订单催办
export function hurryUp(data) {
    return request({
        url: 'CrmOrder/hurryUp',
        method: 'post',
        data
    })
}
// 渠道学生列表
export function getChannelStudentList(data) {
    return request({
        url: 'CrmOrder/archives',
        method: 'post',
        data
    })
}
// 更换所属老师
export function changeStaffId(data) {
    return request({
        url: 'CrmCustomer/changeStaffId',
        method: 'post',
        data
    })
}
// 迁移到公海
export function batchRemove(data) {
    return request({
        url: 'HighSeas/batchRemove',
        method: 'post',
        data
    })
}
// 教务开课-获取机构
export function switchList(params) {
    return request({
        url: 'Organization/switchList',
        method: 'get',
        params
    })
}

// 学生详情-修改共享老师
export function updateUnionStaffId(data) {
    return request({
        url: '/Crm/updateUnionStaffId',
        method: 'post',
        data
    })
}

// 学生详情-二次开发
export function secondDevelop(data) {
    return request({
        url: '/Crm/secondDevelop',
        method: 'post',
        data
    })
}
// 机构回款列表
export function getOrgReceivableList(params) {
    return request({
        url: '/OrgReceivable/getList',
        method: 'get',
        params
    })
}
// 机构回款列表-添加-获取订单
export function getOrder(data) {
    return request({
        url: '/OrgReceivable/getOrder',
        method: 'post',
        data
    })
}
// 机构回款列表-添加-获取分类
export function getCategory(params) {
    return request({
        url: '/OrgReceivable/getCategory',
        method: 'get',
        params
    })
}
// 机构回款列表-添加-获取项目
export function getProject(params) {
    return request({
        url: '/OrgReceivable/getProject',
        method: 'get',
        params
    })
}
// 机构回款列表-添加-获取机构
export function getOrgName(params) {
    return request({
        url: '/OrgReceivable/getOrgName',
        method: 'get',
        params
    })
}
// 机构回款列表-添加
export function addReceivable(data) {
    return request({
        url: '/OrgReceivable/receivable',
        method: 'post',
        data
    })
}
// 机构回款列表-入账状态
export function getReceivableStatus(params) {
    return request({
        url: '/OrgReceivable/getStatus',
        method: 'get',
        params
    })
}
// 机构回款列表-回款详情
export function getReceivableInfo(params) {
    return request({
        url: '/OrgReceivable/getInfo',
        method: 'get',
        params
    })
}
// 机构回款列表-业绩归属人
export function getBelongPeople(params) {
    return request({
        url: '/OrgReceivable/belongPeople',
        method: 'get',
        params
    })
}
// 机构回款审批
export function reviewReceivableOrder(data) {
    return request({
        url: '/OrgReceivable/reviewReceivableOrder',
        method: 'post',
        data
    })
}
// 更改业绩归属人
export function changeStaffOwner(data) {
    return request({
        url: 'CrmOrder/changeStaffOwner',
        method: 'post',
        data
    })
}
// 订单申请异动
export function orderReshuffle(data) {
    return request({
        url: 'CrmOrder/reshuffle',
        method: 'post',
        data
    })
}
// 订单异动申请列表
export function getUnusualList(data) {
    return request({
        url: 'CrmOrder/unusual',
        method: 'post',
        data
    })
}
// 订单异动-审批
export function orderUnusualApprove(data) {
    return request({
        url: 'CrmOrder/action',
        method: 'post',
        data
    })
}
// 机构回款模板导出
export function getExcelOrgReceivable(data) {
    return request({
        url: '/OrgReceivable/getExcel',
        method: 'post',
        data
    })
}
// 机构回款模板导入
export const orgReceivableImportUrl = `${process.env.VUE_APP_LOACTION}/OrgReceivable/importExcel`
// 订单异动重置
export function oneMoreReshuffle(params) {
    return request({
        url: '/CrmOrder/oneMoreReshuffle',
        method: 'get',
        params
    })
}
// 项目价格列表
export function getOrgClassType(params) {
    return request({
        url: '/project/getOrgClassType',
        method: 'get',
        params
    })
}
// 项目订单列表
export function getProjectOrder(params) {
    return request({
        url: '/project/getProjectOrder',
        method: 'get',
        params
    })
}
// 项目订单价格批量修改
export function modifyProjectOrder(data) {
    return request({
        url: '/project/modifyProjectOrder',
        method: 'post',
        data
    })
}
// 项目列表
export function getOrderProject(params) {
    return request({
        url: '/project/getOrderProject',
        method: 'get',
        params
    })
}
// 分发学历-分类
export function universityTypeSelect(params) {
    return request({
        url: 'Crm/universityTypeSelect',
        method: 'get',
        params
    })
}
// 分发学历-学校列表
export function universityMajorDetailList(params) {
    return request({
        url: 'Crm/universityMajorDetailList',
        method: 'get',
        params
    })
}
// 分发学历-分发
export function assignUniversity(data) {
    return request({
        url: 'Crm/assignUniversity',
        method: 'post',
        data
    })
}
// 学历类型
export function getDegreeType(params) {
    return request({
        url: 'project/getDegreeType',
        method: 'get',
        params
    })
}
// 学校列表
export function getUniversity(params) {
    return request({
        url: 'project/getUniversity',
        method: 'get',
        params
    })
}
// 专业列表
export function getProfessional(params) {
    return request({
        url: 'project/getProfessional',
        method: 'get',
        params
    })
}
// 层次列表
export function getAcademicLevel(params) {
    return request({
        url: 'project/getAcademicLevel',
        method: 'get',
        params
    })
}
// 层次列表
export function getDegreeProject(params) {
    return request({
        url: 'project/getDegreeProject',
        method: 'get',
        params
    })
}
// 层次列表
export function getDegreePrice(params) {
    return request({
        url: 'project/getDegreePrice',
        method: 'get',
        params
    })
}
// 学历订单列表
export function getDegreeOrder(params) {
    return request({
        url: 'project/getDegreeOrder',
        method: 'get',
        params
    })
}
// 重设学历订单价格
export function resetDegreeOrder(data) {
    return request({
        url: 'project/resetDegreeOrder',
        method: 'post',
        data
    })
}
// 清除机构订单回款记录
export function clearPayLog(data) {
    return request({
        url: '/OrgReceivable/clearPayLog',
        method: 'post',
        data
    })
}
// 修改机构订单金额
export function changeOrderMoney(data) {
    return request({
        url: '/OrgReceivable/changeOrderMoney',
        method: 'post',
        data
    })
}