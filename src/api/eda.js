/**
 * 教务相关
 */
import request from '@/utils/request'

// 教材发放=======
/**
 * 获取教材发放列表
 */
export function dispenseList(params) {
    return request({
        url: '/books/dispenseList',
        method: 'get',
        params,
    })
}
/**
 * 发放教材
 * @param {*} data
 */
export function dispenseBooks(data) {
    return request({
        url: '/books/dispenseBooks',
        method: 'post',
        data,
    })
}
/**
 * 发放日志
 * @param {} params
 */
export function dispenseLog(params) {
    return request({
        url: '/books/dispenseLog',
        method: 'get',
        params,
    })
}
/**
 * 获取项目下拉菜单
 * @param {*} params
 */
export function getproject(params) {
    return request({
        url: '/project/getproject',
        method: 'get',
        params,
    })
}
/**
 * 获取班级下拉
 * @param {*} params
 */
export function getcourseallclass(params) {
    return request({
        url: '/classroom/getcourseallclass',
        method: 'get',
        params,
    })
}
// 学生中心====================
/**
 * 学生列表
 * @param {*} params
 */
export function getStudentList(params) {
    return request({
        url: '/classstudents/studentmanage',
        method: 'get',
        params,
    })
}
/**
 * 批量分班
 * @param {*} data
 */
export function addstudents(data) {
    return request({
        url: '/classstudents/addstudents',
        method: 'post',
        data,
    })
}
/**
 * 学生详情-基本信息
 * @param {*} params
 */
export function getStudentBasicDetail(params) {
    return request({
        url: '/UserArchives/detail',
        method: 'get',
        params,
    })
}
/**
 * 修改学生基本信息
 * @param {*} params
 */
export function updateStudentBasicInfo(data) {
    return request({
        url: '/UserArchives/modify',
        method: 'post',
        data,
    })
}
/**
 * 学习轨迹
 * @param {*} params
 */
export function studentBehaviorRecord(params) {
    return request({
        url: 'StudentBehaviorRecord/index',
        method: 'get',
        params,
    })
}
/**
 * 学生跟进记录
 * @param {*} params
 */
export function userArchivesRecord(params) {
    return request({
        url: '/UserArchivesRecord/index',
        method: 'get',
        params,
    })
}
/**
 * 添加跟进记录
 * @param {*} data
 */
export function addUserArchivesRecord(data) {
    return request({
        url: '/UserArchivesRecord/add',
        method: 'post',
        data,
    })
}
/**
 * 获取订单列表
 * @param {*} params
 */
export function getOrderList(params) {
    return request({
        url: '/order/index',
        method: 'get',
        params,
    })
}
// 获取班级列表
export function getClassList(params) {
    return request({
        url: '/classroom/index',
        method: 'get',
        params,
    })
}
/**
 * 获取班主任下拉列表
 * @param {*} params
 */
export function getHeadMasters(params) {
    return request({
        url: '/staff/headMasters',
        method: 'get',
        params,
    })
}
/**
 * 添加班级
 * @param {*} data
 */
export function addClassroom(data) {
    return request({
        url: '/classroom/add',
        method: 'post',
        data,
    })
}
/**
 * 编辑编辑
 * @param {*} data
 */
export function editClassroom(data) {
    return request({
        url: '/classroom/edit',
        method: 'post',
        data,
    })
}
/**
 * 班级详情
 * @param {*} params 
 */
export function getClassroomDetail(params) {
    return request({
        url: '/classroom/edit',
        method: 'get',
        params,
    })
}
/**
 * 获取学生所有班级
 * @param {*} params 
 */
export function getstudendclass(params) {
    return request({
        url: '/classstudents/getstudendclass',
        method: 'get',
        params,
    })
}
//个人考勤统计列表
export function getAttendanceList(params) {
    return request({
        url: 'classstudents/personalAttendanceStatistics',
        method: 'get',
        params,
    })
}
// 个人考勤统计汇总
export function personalAttendanceSummary(params) {
    return request({
        url: 'classstudents/personalAttendanceSummary',
        method: 'get',
        params,
    })
}
// 个人教材发放列表
export function getMaterial(params) {
    return request({
        url: 'UserArchives/getMaterial',
        method: 'get',
        params,
    })
}
// 个人课表
export function getTable(params) {
    return request({
        url: '/UserArchives/getTable',
        method: 'get',
        params,
    })
}
/**
 * 获取学生项目列表
 * @param {*} params 
 */
export function getuserproject(params) {
    return request({
        url: '/classstudents/getuserproject',
        method: 'get',
        params,
    })
}
/**
 * 获取班级学生
 * @param {*} params 
 */
export function getClassstudentList(params) {
    return request({
        url: '/classstudents/index',
        method: 'get',
        params,
    })
}
/**
 * 班级考勤统计
 * @param {*} params 
 */
export function classAttendanceStatistics(params) {
    return request({
        url: '/classroom/attendanceStatistics',
        method: 'get',
        params,
    })
}
/**
 * 班级排课列表
 * @param {*} params 
 */
export function getClassArrangeList(params) {
    return request({
        url: '/arrange/getList',
        method: 'get',
        params,
    })
}
//课节列表
export function getClassOurList(params) {
    return request({
        url: 'arrange/getClassOurList',
        method: 'get',
        params,
    })
}
// 上课老师下拉列表
export function getTeacherList(params) {
    return request({
        url: 'teacher/getList',
        method: 'get',
        params,
    })
}
// 学生详情-个人成绩统计
export function getSubjectListByUser(params) {
    return request({
        url: '/Graduation/getSubjectListByUser',
        method: 'get',
        params,
    })
}
// 学生详情-个人成绩统计-历史成绩
export function getHistoryGradeList(params) {
    return request({
        url: '/Graduation/getHistoryGradeList',
        method: 'get',
        params,
    })
}

