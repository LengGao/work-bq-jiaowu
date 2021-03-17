export default {
  //招生管理
  getCustomerList: '/UserArchives/index',
  addCustomers: '/UserArchives/add',
  createOrder: '/order/create',
  getCommonUserList: '/Enrollment/commonUserList',
  onlineUserList: '/Enrollment/onlineUserList',
  getSchoolList: '/School/list',
  changeUpdateSort: '/School/updateSort',

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
  // updateStatus: '/AdminMenu/updateStatus',
  // updateSort: '/AdminMenu/updateSort',

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
  //考试计划
  planList: 'Examination/planList',
  //财务订单管理
  orderindex: '/order/index',
  //订单详情
  orderdetail: '/order/detail',
  //角色权限
  roleperm: '/role/index',
}
