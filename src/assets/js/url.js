export default {
  //招生管理
  getCustomerList: '/UserArchives/index',
  addCustomers: '/UserArchives/add',
  createOrder: '/order/create',
  getCommonUserList: '/Enrollment/commonUserList',
  onlineUserList: '/Enrollment/onlineUserList',
  getSchoolList: '/School/list',
  changeUpdateSort: '/School/updateSort',
  getUserDetail: '/UserArchives/detail',
  modifyUserDetail: '/UserArchives/modify',
  getUserRecord: '/UserArchivesRecord/index',
  getProinvceList: '/region/element.json',
  getfieldinfo: '/Customfield/getfieldinfo',
  //资源配置
  getCategoryList: '/courseCategory/getCategoryList',
  updateCategorySort: '/courseCategory/updateCategorySort',
  insertCategory: '/courseCategory/insertCategory',
  getTeachBooksList: '/books/index',
  getRoomList: '/Schoolroom/roomList',

  createRoom: '/Schoolroom/createRoom',
  updateRoom: '/Schoolroom/updateRoom',
  deleteRoom: '/Schoolroom/deleteRoom',
  updateRoomStatus: '/Schoolroom/updateRoomStatus',
  changeUpdateStatus: '/School/updateStatus',
  getProjectList: '/project/index',
  createProject: '/project/create',
  deleteproject: '/project/deleteproject',
  editProject: '/project/edit',
  getCourseManage: '/course/index',
  getHomeclassifiList: '/indexCategory/index.html',
  videocollectionlist: '/video/videocollectionlist',
  getProblemCourseList: '/problem/getProblemCourseList',

  getRecommender: 'institution/index',
  doAccount: 'institution/doAccount',
  addorGanization: '/institution/add',
  deleteInstitution: '/institution/delete',
  addBlock: '/institution/addBlock',
  organizationDetail: '/institution/info',
  modifyOrganization: '/institution/modify',
  modifyBlock: '/institution/modifyBlock',
  getFileList: '/courseFile/fileList',
  courseFileSort: '/batchSort/CourseFile',
  alterFileList: '/courseFile/updateFile',
  flieInfo: '/courseFile/flieInfo',
  deleteFile: 'courseFile/deleteFile',
  getvideochapter: '/video/getvideochapter',
  addvideochapter: '/video/addvideochapter',
  editvideochapter: '/video/editvideochapter',
  deletevideochapter: '/video/deletevideochapter',
  getvideoclass: '/video/getvideoclass',
  videoChapterSort: '/batchSort/VideoChapter',
  addvideo: '/video/addvideoclass', //新增课时
  editvideoclass: '/video/editvideoclass',
  deletevideoclass: '/video/deletevideoclass',
  batchmovevideoclass: '/video/batchmovevideoclass',
  addvideochapterfree: '/video/editvideoclass',
  getTeachCateList: '/courseCategory/getCateList',
  getTeacherInfo: '/teacher/info',
  modifyTeacher: '/teacher/modify',
  updateTeacherSort: '/teacher/updateTeacherSort',
  getSingleCourses: '/course/getSingleCourses',
  getCoursesDetail: '/course/info',

  //视频上传凭据
  refreshUploadVideo: '/live/refreshuploadvideo', //刷新视频上传凭据
  updatecreate: '/live/updatecreate', //获取视频上传凭据

  //教务管理
  getStudentManage: '/classstudents/studentmanage',
  getClassroomList: '/classroom/index',
  addClasses: 'classroom/add',
  modifyClasses: '/classroom/edit',
  dispenseList: '/books/dispenseList',
  getDispenseLog: '/books/dispenseLog',
  classroomList: 'arrange/classroomList',
  getTeacherList: '/teacher/index',

  changeTeacherStatus: '/teacher/ajaxStatus',
  getTeacherDrop: '/teacher/getList',
  addTeacher: '/teacher/add',
  deleteTeacher: '/teacher/delete',
  getTeacherInfo: '/teacher/info',
  addScheduling: '/arrange/insert',
  getClassScheduling: '/arrange/getList',
  getTimetableList: 'arrange/classroomList',
  getAllForPageList: 'arrange/getAllForPageList',
  exportExcelSchedule: '/arrange/exportExcel',
  deleteClass: '/arrange/deleted',
  getclasstudents: '/classstudents/index',
  getMessageInfo: '/classroom/getMessageInfo',
  sendMessage: '/classroom/sendMessage',

  //系统配置
  getBucketList: '/oss/getBucketList',
  getImagesList: '/oss/getImagesList',
  uploadImage: '/oss/uploadImage',
  appendFile: '/courseFile/appendFile',
  deleteImages: '/oss/deleteImages',
  insertBucket: '/oss/insertBucket',
  updateBucket: '/oss/updateBucket',
  downloadImages: '/oss/downloadImages',
  deleteBucket: '/oss/deleteBucket',
  mvImages: '/oss/mvImages',
  updateImage: '/oss/updateImage',
  getTotalConfigInfo: '/PcPagesConfig/getTotalConfigInfo',
  getSmsList: '/SystemSms/getSmsList',
  getConfigDetail: '/PcPagesConfig/getConfigDetail',
  updateConfig: '/PcPagesConfig/updateConfig',
  getMenuList: '/AdminMenu/getMenuList',
  getMenuDetail: 'AdminMenu/detail',
  getThumbMenuList: '/AdminMenu/getThumbMenuList',
  createMenuData: '/AdminMenu/createMenuData',
  deleteMenuData: '/AdminMenu/deleteMenuData',
  updateMenuData: '/AdminMenu/updateMenuData',
  getadminLogList: 'adminLog/index',
  getAdminOperationRecordList:
    '/AdminOperationRecord/getAdminOperationRecordList',
  getAdminOperationDetail: '/AdminOperationRecord/getAdminOperationDetail',
  rollBackOperation: '/AdminOperationRecord/rollBackOperation',
  getActionSelectList: '/AdminOperationRecord/getActionSelectList',
  getMenuList: '/AdminMenu/getMenuList',
  getMenuDetail: 'AdminMenu/detail',
  getThumbMenuList: '/AdminMenu/getThumbMenuList',
  createMenuData: '/AdminMenu/createMenuData',
  deleteMenuData: '/AdminMenu/deleteMenuData',
  updateMenuData: '/AdminMenu/updateMenuData',
  updateStatus: '/AdminMenu/updateStatus',
  updateSort: '/AdminMenu/updateSort',

  //清除缓存
  clearCache: '/passport/clearCache',
  //退出登录
  logout: '/passport/logout',
  //登录接口
  login: '/passport/login',
  verifyCode: '/passport/verifyCode',
  sendEmail: '/passport/sendEmail',
  resetPassword: '/passport/resetPassword',

  //权限菜单
  getMenu: '/staff/getMenu',
  //意见反馈
  getOpinionList: '/NewsInteraction/getOpinionList',
  changeOpinionStatus: '/NewsInteraction/changeOpinionStatus',
  //笔记管理
  getNoteList: '/NewsInteraction/getNoteList',
  publishNotes: '/NewsInteraction/publishNotes',
  deleteNotes: '/NewsInteraction/deleteNotes',
  //订单统计
  payOrderNum: '/order/payOrderNum',
  //访问量
  getVisitNumChart: '/DataBoard/getVisitNumChart',
  //销售额
  MountQuota: '/order/monthQuota',
  //销售排名
  salesRanking: '/order/salesRanking',
  //新增用户数据
  getRegisterNum: '/DataBoard/getRegisterNum',
  //今日销售总额
  quotaCensus: '/order/quotaCensus',
  //实时访问量数据
  getVisitNum: '/DataBoard/getVisitNum',
  courseScoreBashDelete: '/courseScore/bashDelete',
  courseScoreBashPublish: '/courseScore/bashPublish',
  //直播统计接口
  livecount: '/live/livecount',
  getLiveStatisticForAdmin: '/LiveStatistic/getLiveStatisticForAdmin',
  //直播概况
  getLiveSummary: '/LiveStatistic/getLiveSummary',
  //编辑公开课
  editorOpen: '/LiveClass/info',
  //修改公开课
  modifyOpen: '/LiveClass/modify',
  //考试科目
  subjectList: '/Examination/subjectList',
  //报考规则
  ruleList: '/Examination/ruleList',
  //添加报考规则
  createRule: '/Examination/createRule',
  //删除报考规则
  deleteRule: '/Examination/deleteRule',
  //添加科目
  createSubject: '/Examination/createSubject',
  //编辑科目
  updateSubject: '/Examination/updateSubject',
  //删除科目
  deleteSubject: '/Examination/deleteSubject',

  //财务订单管理
  orderindex: '/order/index',
  //订单详情
  orderdetail: '/order/detail',
  getOrderDetail: '/order/detail',
  //角色权限
  roleperm: '/role/index',
  //通知公告
  noticelist: '/SystemAnnouncement/list',
  //添加公告
  createlist: '/SystemAnnouncement/create',
  //删除公告
  deletenoticelist: '/SystemAnnouncement/delete',
  //编辑公告
  updatenoticelist: '/SystemAnnouncement/update',

  getStaffList: '/staff/index',
  getRoleSelectData: '/staff/getRoleSelectData',
  getIdentitySelect: '/staff/getIdentitySelect',
  getInstitutionSelectData: '/staff/getInstitutionSelectData',
  addStaff: '/staff/add',
  deleteStaff: '/staff/delete',
  ajaxStatusStaff: '/staff/ajaxStatus',
  updateSuperStaff: '/staff/updateSuper',
  updateMasterStaff: '/staff/updateMaster',
  getStaffInfo: '/staff/info',
  modifyStaff: '/staff/modify',

  //搜索不带分页
  getProjectSub: '/project/getproject', //项目
  getTeacherSublist: '/teacher/getList', //老师
  getStaffSelect: '/staff/getStaffSelect', //员工
  getcourseallclass: '/classroom/getcourseallclass', ///班级
  getRoomSelect: '/Schoolroom/getRoomSelect', //教室
  getcategorytree: '/courseCategory/getcategorytree', //分类
  // 面授约课
  addSubscribeClassroom: '/subscribe/addSubscribeClassroom',
  getCourseList: '/statistics/getCourseList',
  getBlackStudentsList: '/subscribe/getBlackStudentsList',
  getRecommender: 'institution/index',
  insertBlacklist: '/subscribe/insertBlacklist',
  getAdditionalStudentList: '/subscribe/getAdditionalStudentList',
  insertStudent: '/subscribe/insertStudent',
  getPracticeList: '/statistics/getPracticeList',
  getTeacherList: '/teacher/index',
  getSubscribeClassroomInfo: '/subscribe/getSubscribeClassroomInfo',
  saveSubscribeClassroom: '/subscribe/saveSubscribeClassroom',
  getBlacklist: '/subscribe/getBlacklist',
  removeBlacklist: '/subscribe/removeBlacklist',
  getSubscribeClassroomList: '/subscribe/getSubscribeClassroomList',
  getSubMessageInfo: '/subscribe/getSubMessageInfo',
  sendSubMessage: '/subscribe/sendSubMessage',
  getQrCode: '/subscribe/getQrCode',
  getStudentList: '/subscribe/getStudentList',
  updateStudentStatus: '/subscribe/updateStudentStatus',
}
