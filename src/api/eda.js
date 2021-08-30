
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
    url: '/classstudents/studentlist',
    method: 'get',
    params,
  })
}
/**
 * 获取所属老师
 * @param {*} params 
 */
export function getAdminSelect(params) {
  return request({
    url: '/classstudents/getAdminSelect',
    method: 'get',
    params,
  })
}
// 更换所属老师
export function changeUserAdminId(params) {
  return request({
    url: '/classstudents/changeUserAdminId',
    method: 'get',
    params,
  })
}
// 将一个账号下的学生数据迁移至另一个账号下
export function moveUserToNewStaff(params) {
  return request({
    url: '/staff/moveUserToNewStaff',
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
 * 客户历史
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
 * 学生跟进记录
 * @param {*} params
 */
export function getFollowPage(params) {
  return request({
    url: '/StaffFollow/getFollowPage',
    method: 'get',
    params,
  })
}
/**
 * 添加跟进记录
 * @param {*} data
 */
export function insertTeachFollow(data) {
  return request({
    url: 'staffFollow/insertTeachFollow',
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
 * 根据项目获取课程
 * @param {*} params 
 */
export function getCourseOptions(data) {
  return request({
    url: 'course/project',
    method: 'post',
    data,
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
export function dispenseBooksLog(params) {
  return request({
    url: '/books/dispenseBooksLog',
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
 * 获取未分班学生
 * @param {*} params
 */
export function unClassCourse(params) {
  return request({
    url: 'classstudents/unClassCourse',
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
// 获取教室选择列表
export function getRoomSelect(params) {
  return request({
    url: '/Schoolroom/getRoomSelect',
    method: 'get',
    params,
  })
}
// 排课管理=======
/**
 * 获取教材发放列表
 */
export function getAllForPageList(params) {
  return request({
    url: 'arrange/getAllForPageList',
    method: 'get',
    params,
  })
}
// 考勤管理=======
/**
 * 排课分页列表
 */
export function getWorkPageList(params) {
  return request({
    url: '/arrange/getPageList',
    method: 'get',
    params,
  })
}

/**
 * 签到学生列表
 */
export function getSignList(params) {
  return request({
    url: 'arrange/signList',
    method: 'get',
    params,
  })
}
/**
 * 生成签到二维码
 */
export function createQrcode(data) {
  return request({
    url: 'arrange/createQrcode',
    method: 'post',
    data,
  })
}
/**
 * 手动签到
 */
export function batchSign(data) {
  return request({
    url: 'arrange/batchSign',
    method: 'post',
    data,
  })
}
/**
 * 课节基础统计
 */
export function getClassHourStatistics(params) {
  return request({
    url: 'arrange/ClassHourStatistics',
    method: 'get',
    params,
  })
}
/**
 * 课节学生签到数据
 */
export function ClassHourStudentStatistics(params) {
  return request({
    url: 'arrange/ClassHourStudentStatistics',
    method: 'get',
    params,
  })
}
/**
 * 导出考勤
 */
export function classroomSignExportExcel(params) {
  return request({
    url: 'arrange/classroomSignExportExcel',
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
// 学生详情-课程进度列表
export function userCourseVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/userCourseVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 学生详情-直播统计列表
export function userCenterLiveList(params) {
  return request({
    url: '/LiveStatistic/userCenterLiveList',
    method: 'get',
    params,
  })
}
// 学生详情-直播统计列表-数据
export function userCenterLiveData(params) {
  return request({
    url: '/LiveStatistic/userCenterLiveData',
    method: 'get',
    params,
  })
}
// 学生详情-回顾统计列表-数据
export function userCenterClassroomVideoData(params) {
  return request({
    url: '/ClassroomVideo/userCenterClassroomVideoData',
    method: 'get',
    params,
  })
}
// 学生详情-回顾统计列表
export function userCenterClassroomVideoList(params) {
  return request({
    url: '/ClassroomVideo/userCenterClassroomVideoList',
    method: 'get',
    params,
  })
}
// 学生详情-回顾统计列表-学生班级下拉
export function getUserClassroomSelect(params) {
  return request({
    url: 'ClassroomVideo/getUserClassroomSelect',
    method: 'get',
    params,
  })
}



// 做题详情-每日打卡
export function dailyClockIn(params) {
  return request({
    url: '/TopicStatistics/dailyClockIn',
    method: 'get',
    params,
  })
}
// 做题详情-章节练习
export function chapterExercises(params) {
  return request({
    url: '/TopicStatistics/chapterExercises',
    method: 'get',
    params,
  })
}
// 做题详情-历年真题
export function pastRealQuestions(params) {
  return request({
    url: '/TopicStatistics/pastRealQuestions',
    method: 'get',
    params,
  })
}
// 做题详情-模拟考试
export function mockExam(params) {
  return request({
    url: '/TopicStatistics/mockExam',
    method: 'get',
    params,
  })
}
// 做题详情-刷题挑战
export function challenge(params) {
  return request({
    url: '/TopicStatistics/challenge',
    method: 'get',
    params,
  })
}

// 做题详情-面授约课
export function FaceToFaceLesson(params) {
  return request({
    url: '/ScheduledCourseStatistics/FaceToFaceLesson',
    method: 'get',
    params,
  })
}

// 做题详情-自主出题
export function selfProposed(params) {
  return request({
    url: '/TopicStatistics/selfProposed',
    method: 'get',
    params,
  })
}
// 做题详情-收藏夹+做题集的章节列表
export function favoritesChapter(params) {
  return request({
    url: '/topicStatistics/favoritesChapter',
    method: 'get',
    params,
  })
}
// 做题详情-收藏夹+做题集的题目列表
export function favoritesTopic(params) {
  return request({
    url: '/topicStatistics/favoritesTopic',
    method: 'get',
    params,
  })
}
// 学生详情-学习记录-题库进度
export function getBuyQuestionBank(params) {
  return request({
    url: '/questionBank/getBuyQuestionBank',
    method: 'get',
    params,
  })
}









// 移除班级学生
export function classstudentsBatchRemove(data) {
  return request({
    url: '/classstudents/batchremove',
    method: 'post',
    data,
  })
}
// 学生批量转班
export function batchchangestudents(data) {
  return request({
    url: '/classstudents/batchchangestudents',
    method: 'post',
    data,
  })
}
// 获取未分班的学生
export function getbycoursestudet(params) {
  return request({
    url: '/classstudents/getbycoursestudent',
    method: 'get',
    params,
  })
}
// 获取回访列表
export function getReturnVisit(params) {
  return request({
    url: '/classroom/getReturnVisit',
    method: 'get',
    params,
  })
}
// 回访详情-班级信息
export function followClassroomInfo(params) {
  return request({
    url: '/classroom/followClassroomInfo',
    method: 'get',
    params,
  })
}
// 添加回访
export function createReturnVisit(data) {
  return request({
    url: '/classroom/createReturnVisit',
    method: 'post',
    data,
  })
}
// 回访详情列表
export function getReturnVisitDetail(params) {
  return request({
    url: '/classroom/followStudentsReturnVisitList',
    method: 'get',
    params,
  })
}
// 更新回访记录
export function updateFollow(data) {
  return request({
    url: '/classroom/updateFollow',
    method: 'post',
    data,
  })
}
// 班级直播列表
export function classLiveList(params) {
  return request({
    url: '/NewLive/classLiveList',
    method: 'get',
    params,
  })
}
// 班级直播 -添加直播-教师选项
export function getTeacherSelect(params) {
  return request({
    url: '/NewLive/getTeacherSelect',
    method: 'get',
    params,
  })
}
// 班级直播 -添加直播-课程选项
export function getCourseSelect(params) {
  return request({
    url: '/NewLive/getCourseSelect',
    method: 'get',
    params,
  })
}
// 班级直播 -添加直播-班级选项
export function getClassroomSelect(params) {
  return request({
    url: '/NewLive/getClassroomSelect',
    method: 'get',
    params,
  })
}
// 班级直播 -添加直播
export function createClassLive(data) {
  return request({
    url: '/NewLive/createClassLive',
    method: 'post',
    data,
  })
}
// 班级直播 -修改直播
export function updateClassLive(data) {
  return request({
    url: '/NewLive/updateClassLive',
    method: 'post',
    data,
  })
}
// 班级直播 -修改直播-获取直播详情
export function classLiveInfo(params) {
  return request({
    url: '/NewLive/classLiveInfo',
    method: 'get',
    params,
  })
}
// 班级直播 -删除直播
export function deleteClassLive(data) {
  return request({
    url: '/NewLive/deleteClassLive',
    method: 'post',
    data,
  })
}
// 班级直播 -开始直播
export function livestart(data) {
  return request({
    url: '/plwlive/livestart',
    method: 'post',
    data,
  })
}
// 班级直播 -关闭直播
export function closelive(data) {
  return request({
    url: '/live/closelive',
    method: 'post',
    data,
  })
}
// 班级直播 -直播链接
export function liveLinkdetail(params) {
  return request({
    url: '/plwlive/livedetail',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表
export function liveSessionList(params) {
  return request({
    url: '/NewLive/liveList',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情
export function getLiveDetail(params) {
  return request({
    url: '/LiveStatistic/getLiveDetail',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情-直播概况
export function getLiveSummary(params) {
  return request({
    url: '/LiveStatistic/getLiveSummary',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情-直播统计
export function getLiveStatisticForAdmin(params) {
  return request({
    url: '/LiveStatistic/getLiveStatisticForAdmin',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情-直播统计-班级选项
export function getClassroomSelectByLiveId(params) {
  return request({
    url: '/LiveStatistic/getClassroomSelect',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情-直播统计-导出
export function exportLiveStatisticForAdmin(params) {
  return request({
    url: '/LiveStatistic/exportLiveStatisticForAdmin',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-直播详情-回播统计
export function livevideocount(params) {
  return request({
    url: '/live/livevideocount',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-回顾视频列表
export function livevideolist(params) {
  return request({
    url: '/live/livevideolist',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-回顾视频列表-添加视频
export function addlivevideo(data) {
  return request({
    url: '/live/addlivevideo',
    method: 'post',
    data,
  })
}
// 班级直播 -直播场次列表-回顾视频列表-编辑视频
export function editlivevideo(data) {
  return request({
    url: '/live/editlivevideo',
    method: 'post',
    data,
  })
}
// 班级直播 -直播场次列表-回顾视频列表-视频详情
export function getlivevideoDetail(params) {
  return request({
    url: '/live/editlivevideo',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-回顾视频列表-删除视频
export function deletelivevideo(data) {
  return request({
    url: '/live/deletelivevideo',
    method: 'post',
    data,
  })
}
// 班级直播 -直播场次列表-回顾视频列表-下载视频
export function getVideoUrl(params) {
  return request({
    url: '/NewLive/getVideoUrl',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-学习资料列表
export function getLiveDataList(params) {
  return request({
    url: '/LiveData/getLiveDataList',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次-学习资料列表-删除资料
export function deleteLiveData(data) {
  return request({
    url: '/LiveData/deleteLiveData',
    method: 'post',
    data,
  })
}
//
export const downloadBaseUrl = process.env.VUE_APP_DOWNLOAD
// 班级直播 -直播场次列表-学习资料列表-添加资料
export function createLiveData(data) {
  return request({
    url: '/LiveData/createLiveData',
    method: 'post',
    data,
  })
}
// 班级直播 -直播场次列表-学习资料列表-修改资料
export function updateLiveData(data) {
  return request({
    url: '/LiveData/updateLiveData',
    method: 'post',
    data,
  })
}
// 班级直播 -直播场次列表-学习资料列表-资料详情
export function getliveDataInfo(params) {
  return request({
    url: '/LiveData/liveDataInfo',
    method: 'get',
    params,
  })
}
// 班级直播 -直播场次列表-学习资料列表-获取上传凭证
export function recordForUpload(data) {
  return request({
    url: '/LiveData/recordForUpload',
    method: 'post',
    data,
  })
}

// 班级直播 -直播场次列表-学习资料列表-切片上传
export function liveDataUpload(data, cancelToken) {
  return request({
    cancelToken,
    url: '/LiveData/upload',
    method: 'post',
    data,
    timeout: 60 * 1000
  })
}
// 公开课直播列表
export function publicLiveList(params) {
  return request({
    url: '/NewLive/publicLiveList',
    method: 'get',
    params,
  })
}
// 公开课直播列表-修改直播展示状态
export function updatePublicLiveShowStatus(params) {
  return request({
    url: '/NewLive/updatePublicLiveShowStatus',
    method: 'get',
    params,
  })
}
// 公开课直播列表-添加
export function createPublicLive(data) {
  return request({
    url: '/NewLive/createPublicLive',
    method: 'post',
    data,
  })
}
// 公开课直播列表-修改
export function updatePublicLive(data) {
  return request({
    url: '/NewLive/updatePublicLive',
    method: 'post',
    data,
  })
}
// 学历订单列表
export function getEduList(params) {
  return request({
    url: '/EduOrder/order',
    method: 'get',
    params,
  })
}
// 班级视频-章节列表
export function getChapterList(data) {
  return request({
    url: '/ClassroomVideo/getChapterList',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-添加章节
export function createChapter(data) {
  return request({
    url: '/ClassroomVideo/createChapter',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-修改章节
export function updateChapter(data) {
  return request({
    url: '/ClassroomVideo/updateChapter',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-删除章节
export function deleteChapter(data) {
  return request({
    url: '/ClassroomVideo/deleteChapter',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-添加课时
export function createLesson(data) {
  return request({
    url: '/ClassroomVideo/createLesson',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-修改课时
export function updateLesson(data) {
  return request({
    url: '/ClassroomVideo/updateLesson',
    method: 'post',
    data,
  })
}
// 班级异常数据
export function getFailDataClass(params) {
  return request({
    url: '/FailData/classroom',
    method: 'get',
    params,
  })
}
// 班级异常数据-保留
export function classRemoveStudent(data) {
  return request({
    url: '/FailData/classRemoveStudent',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-课时列表
export function getLessonList(data) {
  return request({
    url: '/ClassroomVideo/getLessonList',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-删除课时
export function deleteLesson(data) {
  return request({
    url: '/ClassroomVideo/deleteLesson',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-批量排序
export function batchSortChapter(data) {
  return request({
    url: '/ClassroomVideo/batchSortChapter',
    method: 'post',
    data,
  })
}
// 班级视频-章节列表-课时视频批量排序
export function batchSortLesson(data) {
  return request({
    url: '/ClassroomVideo/batchSortLesson',
    method: 'post',
    data,
  })
}
// 班级视频-视频统计列表
export function classroomVideoStatisticsList(data) {
  return request({
    url: '/ClassroomVideo/classroomVideoStatisticsList',
    method: 'post',
    data,
  })
}
// 班级视频-视频统计列表-导出
export function exportClassroomVideoStatistics(data) {
  return request({
    url: '/ClassroomVideo/exportClassroomVideoStatistics',
    method: 'post',
    data,
  })
}
// 意向异常数据
export function getFailDataIntent(params) {
  return request({
    url: '/FailData/intent',
    method: 'get',
    params,
  })
}
// 意向异常数据-移除
export function intentRemoveData(data) {
  return request({
    url: '/FailData/intentRemoveData',
    method: 'post',
    data,
  })
}
// 认证记录-课程下拉选项
export function getFaceCourseSelect(params) {
  return request({
    url: '/FaceDetect/getCourseSelect',
    method: 'get',
    params,
  })
}
// 认证记录列表
export function getFaceDetectList(params) {
  return request({
    url: '/FaceDetect/getFaceDetectList',
    method: 'get',
    params,
  })
}
// 学生中心认证记录列表
export function getFaceDetectListForUser(params) {
  return request({
    url: '/FaceDetect/getFaceDetectListForUser',
    method: 'get',
    params,
  })
}
// 课程笔记列表
export function getCourseNoteList(params) {
  return request({
    url: '/NewsInteraction/getCourseNoteList',
    method: 'get',
    params,
  })
}
// 课程笔记列表-修改状态
export function updateCourseNoteStatus(data) {
  return request({
    url: '/NewsInteraction/updateCourseNoteStatus',
    method: 'post',
    data,
  })
}
// 课程笔记列表-删除
export function deleteCourseNote(data) {
  return request({
    url: '/NewsInteraction/deleteCourseNote',
    method: 'post',
    data,
  })
}
// 班级详情-课程进度
export function courseUserVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/courseUserVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 班级详情-课程进度-导出
export function exportCourseUserVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/exportCourseUserVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 班级详情-更换所属机构
export function updateUserFromOrgId(data) {
  return request({
    url: '/classroom/updateUserFromOrgId',
    method: 'post',
    data,
  })
}
// 学历列表-树形数据
export function getTreeCategory(params) {
  return request({
    url: '/EduOrder/category',
    method: 'get',
    params,
  })
}
// 学历列表-追加教材列表
export function getAdditionalTextbook(params) {
  return request({
    url: '/books/getAdditionalTextbook',
    method: 'get',
    params,
  })
}
// 学历列表-追加教材列表
export function issueAdditionalTextbook(data) {
  return request({
    url: '/books/issueAdditionalTextbook',
    method: 'post',
    data,
  })
}
// 学历列表-追加教材-日志
export function getAdditionalTextbookLog(params) {
  return request({
    url: '/books/getAdditionalTextbookLog',
    method: 'get',
    params,
  })
}
// 班级详情-题库进度
export function getClassQuestionStatistics(params) {
  return request({
    url: '/questionBank/getClassStatistics',
    method: 'get',
    params,
  })
}
// 班级详情-班级学生
export function classroomUserList(params) {
  return request({
    url: '/classroom/classroomUserList',
    method: 'get',
    params,
  })
}
// 班级详情-班级学生-导出
export function exportClassroomUserList(params) {
  return request({
    url: '/classroom/exportClassroomUserList',
    method: 'get',
    params,
  })
}
// 学历列表-导出
export function exportEduList(params) {
  return request({
    url: '/EduOrder/export',
    method: 'get',
    params,
  })
}
