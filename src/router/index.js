import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'
import Layout from '../views/layout/Layout'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    hidden: true,
    meta: { title: '忘记密码' },
  },
  // {
  //   path: '/resetpage',
  //   component: () => import('@/views/login/resetpage'),
  //   hidden: true,
  //   meta: { title: '重置密码' },
  // },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/visualization',
    children: [
      {
        path: 'visualization',
        name: 'visualization',
        component: () => import('@/views/pms/visualization.vue'),
        meta: { title: '工作台', icon: 'shujukanban' },
      },
      {
        path: 'cusdetail',
        name: 'cusdetail',
        component: () => import('@/views/fina/finance/index.vue'),
        meta: { title: '客户详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'orderdetail',
        name: 'orderdetail',
        component: () => import('@/views/fina/order/orderDetail.vue'),
        meta: { title: '订单详情', icon: 'product-add' },
        hidden: true,
      },
    ],
  },
]

export const asyncRouter = [
  {
    path: '/sou',
    component: Layout,
    redirect: '/sou/classifiSetting',
    meta: { title: '资源配置', icon: 'zhaoshengguanli' },
    name: 'sou',
    children: [
      {
        path: 'aliVideo',
        name: 'aliVideo',
        component: () => import('@/views/sou/aliVideo/index.vue'),
        meta: { title: '阿里源视频', icon: 'product-add' },
      },
      {
        path: 'videoLibrary',
        name: 'videoLibrary',
        component: () => import('@/views/sou/videoLibrary/index.vue'),
        meta: { title: '视频库', icon: 'product-add' },
      },
      {
        path: 'collegeMajor',
        name: 'collegeMajor',
        component: () => import('@/views/sou/collegeMajor/index.vue'),
        meta: { title: '院校专业', icon: 'product-add' },
      },
      {
        path: 'classifiSetting',
        name: 'classifiSetting',
        component: () => import('@/views/sou/classifiSetting.vue'),
        meta: { title: '分类设置', icon: 'product-add' },
      },
      {
        path: 'homeClassifi',
        name: 'homeClassifi',
        component: () => import('@/views/sou/homeClassifi.vue'),
        meta: { title: '首页分类', icon: 'product-add' },
      },
      {
        path: 'courseManage',
        name: 'courseManage',
        component: () => import('@/views/sou/courseManage.vue'),
        meta: { title: '课程管理', icon: 'product-add' },
      },
      {
        path: 'questionBank',
        name: 'questionBank',
        component: () => import('@/views/sou/questionBankManagement/index.vue'),
        meta: { title: '题库管理', icon: 'product-add' },
      },
      {
        path: 'allQuestionList',
        name: 'allQuestionList',
        component: () => import('@/views/sou/questionBankManagement/allQuestionList.vue'),
        meta: { title: '所有题目', icon: 'product-add' },
      },
      {
        path: 'configureQuestionBank',
        name: 'configureQuestionBank',
        component: () => import('@/views/sou/questionBankManagement/configureQuestionBank/index.vue'),
        meta: { title: '配置题库', icon: 'product-add' },
      },
      {
        path: 'questionConfigure',
        name: 'questionConfigure',
        component: () => import('@/views/sou/questionBankManagement/configureQuestionBank/questionConfigure/index.vue'),
        meta: { title: '题目配置', icon: 'product-add' },
      },
      {
        path: 'configureScore',
        name: 'configureScore',
        component: () => import('@/views/sou/questionBankManagement/configureScore/index.vue'),
        meta: { title: '配置分数', icon: 'product-add' },
      },
      //课程管理组件开始
      {
        path: 'createClass',
        name: 'createClass',
        component: () => import('@/views/sou/courseManage/createClass.vue'),
        meta: { title: '添加课程', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'configureCourses',
        name: 'configureCourses',
        component: () => import('@/views/sou/courseManage/index.vue'),
        meta: { title: '配置课程 ', icon: 'product-cate' },
        hidden: true,
      },
      //课程管理组件结束

      //教材管理组件开始
      {
        path: 'textbookManage',
        name: 'textbookManage',
        component: () => import('@/views/sou/textbookManage.vue'),
        meta: { title: '教材管理', icon: 'product-add' },
      },
      {
        path: 'inventoryDetails',
        name: 'inventoryDetails',
        component: () => import('@/views/sou/inventoryDetails/index.vue'),
        meta: { title: '库存详情', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'textbookRecord',
        name: 'textbookRecord',
        component: () =>
          import('@/views/sou/textbookManage/textbookRecord.vue'),
        meta: { title: '教材记录', icon: 'product-cate' },
        hidden: true,
      },
      //教材管理组件结束
      {
        path: 'projectManage',
        name: 'projectManage',
        component: () => import('@/views/sou/projectManage.vue'),
        meta: { title: '项目管理', icon: 'product-add' },
      },
      {
        path: 'agency',
        name: 'agency',
        component: () => import('@/views/sou/recommender.vue'),
        meta: { title: '推荐机构', icon: 'product-add' },
      },
      //推荐机构组件开始
      {
        path: 'editOrgan',
        name: 'editOrgan',
        component: () => import('@/views/sou/recommender/editOrgan.vue'),
        meta: { title: '编辑机构', icon: 'product-list' },
        hidden: true,
      },
      //推荐机构组件结束
      {
        path: 'schoolManage',
        name: 'schoolManage',
        component: () => import('@/views/sou/schoolManage.vue'),
        meta: { title: '校区管理', icon: 'product-add' },
      },
      {
        path: 'classroomManage',
        name: 'classroomManage',
        component: () => import('@/views/sou/classroomManage.vue'),
        meta: { title: '教室管理', icon: 'product-add' },
      },
      //教室管理组件开始
      {
        path: 'classroomUsage',
        name: 'classroomUsage',
        component: () =>
          import('@/views/sou/classroomManage/classroomUsage.vue'),
        meta: { title: '使用情况', icon: 'product-add' },
        hidden: true,
      },
      //教室管理组件结束
      {
        path: 'customField',
        name: 'customField',
        component: () => import('@/views/sou/customField.vue'),
        meta: { title: '自定义字段', icon: 'product-add' },
      },
      {
        path: 'businessTemplate',
        name: 'businessTemplate',
        component: () => import('@/views/sou/businessTemplate.vue'),
        meta: { title: '业务模板', icon: 'product-add' },
      },
      {
        path: 'warehouseManage',
        name: 'warehouseManage',
        component: () => import('@/views/sou/warehouseManage.vue'),
        meta: { title: '仓库管理', icon: 'product-add' },
      },
      {
        path: 'textbookDetails',
        name: 'textbookDetails',
        component: () => import('@/views/sou/textbookDetails/index.vue'),
        meta: { title: '教材详情', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'storageLog',
        name: 'storageLog',
        component: () => import('@/views/sou/storageLog/index.vue'),
        meta: { title: '仓库日志', icon: 'product-add' },
        hidden: true,
      },
      //仓库管理组件开始
      {
        path: 'warehouseRecord',
        name: 'warehouseRecord',
        component: () =>
          import('@/views/sou/warehouseManage/warehouseRecord.vue'),
        meta: { title: '出入库记录', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'textbookDetail',
        name: 'textbookDetail',
        component: () =>
          import('@/views/sou/warehouseManage/textbookDetail.vue'),
        meta: { title: '教材详情', icon: 'product-cate' },
        hidden: true,
      },
      //仓库管理组件结束
    ],
  },
  {
    path: '/etm',
    component: Layout,
    redirect: '/etm/customerManage',
    meta: { title: '招生管理', icon: 'zhaoshengguanli' },
    name: 'etm',
    children: [
      {
        path: 'customerManage',
        name: 'customerManage',
        component: () => import('@/views/etm/customerManage.vue'),
        meta: { title: '客户管理', icon: 'product-add' },
      },
      //客户管理组件开始

      {
        path: 'onlineStudents',
        name: 'onlineStudents',
        component: () =>
          import('@/views/etm/customerManage/onlineStudents.vue'),
        meta: { title: '学生导入', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'customeDetail',
        name: 'customeDetail',
        component: () => import('@/views/etm/customerManage/customeDetail.vue'),
        meta: { title: '客户详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'seaCustomer',
        name: 'seaCustomer',
        component: () => import('@/views/etm/seaCustomer.vue'),
        meta: { title: '公海客户', icon: 'product-cate' },
      },
      {
        path: 'recentLogin',
        name: 'recentLogin',
        component: () => import('@/views/etm/recentLogin.vue'),
        meta: { title: '最近登录', icon: 'product-cate' },
      },
    ],
  },
  {
    path: '/eda',
    component: Layout,
    redirect: '/eda/studentCenter',
    meta: { title: '教务管理', icon: 'zhaoshengguanli' },
    name: 'eda',
    children: [
      {
        path: 'abnormalData',
        name: 'abnormalData',
        component: () => import('@/views/eda/abnormalData/index.vue'),
        meta: { title: '异常数据', icon: 'product-cate' },
      },
      {
        path: 'studentCenter',
        name: 'studentCenter',
        component: () => import('@/views/eda/studentCenter.vue'),
        meta: { title: '学生中心', icon: 'product-cate' },
      },
      {
        path: 'collegeStudentList',
        name: 'collegeStudentList',
        component: () => import('@/views/eda/collegeStudentList.vue'),
        meta: { title: '学历列表', icon: 'product-cate' },
      },
      //学生中心组件开始
      {
        path: 'studentDetail',
        name: 'studentDetail',
        component: () => import('@/views/eda/studentCenter/index.vue'),
        meta: { title: '学生详情', icon: 'product-cate' },
        hidden: true,
      },

      {
        path: 'orderManage',
        name: 'orderManage',
        component: () => import('@/views/eda/studentCenter/orderManage.vue'),
        meta: { title: '订单管理', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'classVideo',
        name: 'classVideo',
        component: () => import('@/views/eda/classVideo/index.vue'),
        meta: { title: '班级视频', icon: 'product-cate' },
      },
      {
        path: 'videoPlaybackStatistics',
        name: 'videoPlaybackStatistics',
        component: () => import('@/views/eda/classVideo/videoPlaybackStatistics.vue'),
        meta: { title: '视频统计', icon: 'product-cate' },
      },
      {
        path: 'classManage',
        name: 'classManage',
        component: () => import('@/views/eda/classManage.vue'),
        meta: { title: '班级管理', icon: 'product-cate' },
      },
      {
        path: 'livePublicClass',
        name: 'livePublicClass',
        component: () => import('@/views/eda/livePublicClass/index.vue'),
        meta: { title: '公开课直播', icon: 'product-cate' },
      },
      {
        path: 'classLive',
        name: 'classLive',
        component: () => import('@/views/eda/classLive/index.vue'),
        meta: { title: '班级直播', icon: 'product-cate' },
      },
      {
        path: 'liveSessions',
        name: 'liveSessions',
        component: () => import('@/views/eda/liveSessions/index.vue'),
        meta: { title: '直播场次', icon: 'product-cate' },
      },
      {
        path: 'playbackVideo',
        name: 'playbackVideo',
        component: () => import('@/views/eda/liveSessions/playbackVideo/index.vue'),
        meta: { title: '回顾视频', icon: 'product-cate' },
      },
      {
        path: 'learningMaterials',
        name: 'learningMaterials',
        component: () => import('@/views/eda/liveSessions/learningMaterials/index.vue'),
        meta: { title: '学习资料', icon: 'product-cate' },
      },
      {
        path: 'liveDetails',
        name: 'liveDetails',
        component: () => import('@/views/eda/liveDetails/index.vue'),
        meta: { title: '直播详情', icon: 'product-cate' },
      },
      {
        path: 'learnerManage',
        name: 'learnerManage',
        component: () => import('@/views/eda/classManage/learnerManage.vue'),
        meta: { title: '学生管理', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'shift',
        name: 'shift',
        component: () => import('@/views/eda/classManage/shift.vue'),
        meta: { title: '学生转班', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'addStudent',
        name: 'addStudent',
        component: () => import('@/views/eda/classManage/addStudent.vue'),
        meta: { title: '添加学生', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'massMessage',
        name: 'massMessage',
        component: () => import('@/views/eda/classManage/massMessage.vue'),
        meta: { title: '群发信息', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'classDetail',
        name: 'classDetail',
        component: () => import('@/views/eda/classManage/classDetail.vue'),
        meta: { title: '班级详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'returnVisit',
        name: 'returnVisit',
        component: () => import('@/views/eda/classManage/returnVisit.vue'),
        meta: { title: '学习回访', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'returnVisitDetail',
        name: 'returnVisitDetail',
        component: () =>
          import('@/views/eda/classManage/returnVisitDetail.vue'),
        meta: { title: '回访详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'examStatis',
        name: 'examStatis',
        component: () => import('@/views/eda/classManage/examStatis.vue'),
        meta: { title: '考勤统计', icon: 'product-cate' },
        hidden: true,
      },
      //班级管理组件结束
      {
        path: 'teachMaterial',
        name: 'teachMaterial',
        component: () => import('@/views/eda/teachMaterial.vue'),
        meta: { title: '教材发放', icon: 'product-cate' },
      },
      //教材发放组件开始
      {
        path: 'materialJournal',
        name: 'materialJournal',
        component: () =>
          import('@/views/eda/teachMaterial/materialJournal.vue'),
        meta: { title: '教材发放日志', icon: 'product-cate' },
        hidden: true,
      },
      //教材发放组件结束
      {
        path: 'attendanceManage',
        name: 'attendanceManage',
        component: () => import('@/views/eda/attendanceManage.vue'),
        meta: { title: '考勤管理', icon: 'product-cate' },
      },
      //考勤管理组件开始
      {
        path: 'callinClass',
        name: 'callinClass',
        component: () => import('@/views/eda/attendanceManage/callinClass.vue'),
        meta: { title: '上课点名', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'sinCode',
        name: 'sinCode',
        component: () => import('@/views/eda/attendanceManage/sinCode.vue'),
        meta: { title: '签到码', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'attendanceStatistics',
        name: 'attendanceStatistics',
        component: () =>
          import('@/views/eda/attendanceManage/attendanceStatistics.vue'),
        meta: { title: '考勤统计', icon: 'product-cate' },
        hidden: true,
      },
      //考勤管理组件结束
      {
        path: 'teachSchedule',
        name: 'teachSchedule',
        component: () => import('@/views/eda/teachSchedule.vue'),
        meta: { title: '排课管理', icon: 'product-cate' },
      },
      //排课管理开始
      {
        path: 'addSchedule',
        name: 'addSchedule',
        component: () => import('@/views/eda/teachSchedule/addSchedule.vue'),
        meta: { title: '添加排课', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'allSchedule',
        name: 'allSchedule',
        component: () => import('@/views/eda/teachSchedule/allSchedule.vue'),
        meta: { title: '全部排课', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'timetablePreview',
        name: 'timetablePreview',
        component: () =>
          import('@/views/eda/teachSchedule/timetablePreview.vue'),
        meta: { title: '课程预览', icon: 'product-cate' },
        hidden: true,
      },
      //排课管理结束
      // 证件资料开始
      {
        path: 'certificates',
        name: 'certificates',
        component: () => import('@/views/eda/certificates/index.vue'),
        meta: { title: '证件资料', icon: 'product-cate' },
      },
      {
        path: 'certificatesLog',
        name: 'certificatesLog',
        component: () =>
          import('@/views/eda/certificates/certificatesLog/index.vue'),
        meta: { title: '证件资料日志', icon: 'product-cate' },
        hidden: true,
      },
      //面授约课组件开始
      {
        path: 'faceTeach',
        name: 'faceTeach',
        component: () => import('@/views/eda/faceTeach.vue'),
        meta: { title: '面授约课', icon: 'mianshouyueke' },
      },
      {
        path: 'faceMessage',
        name: 'faceMessage',
        component: () => import('@/views/eda/faceTeach/faceMessage.vue'),
        meta: { title: '面授课程管理', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'editFaceCourse',
        name: 'editFaceCourse',
        component: () => import('@/views/eda/faceTeach/editFaceCourse.vue'),
        meta: { title: '编辑面授课', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'faceTeachStudent',
        name: 'faceTeachStudent',
        component: () => import('@/views/eda/faceTeach/studentDetail.vue'),
        meta: { title: '学生详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'learningDetails',
        name: 'learningDetails',
        component: () => import('@/views/eda/faceTeach/learningDetails.vue'),
        meta: { title: '学习详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'signCode',
        name: 'signCode',
        component: () => import('@/views/eda/faceTeach/signCode.vue'),
        meta: { title: '签到码', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'addFaceTeachStudent',
        name: 'addFaceTeachStudent',
        component: () => import('@/views/eda/faceTeach/addStudent.vue'),
        meta: { title: '添加学员', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'addTrainee',
        name: 'addTrainee',
        component: () => import('@/views/eda/faceTeach/addTrainee.vue'),
        meta: { title: '添加学员', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'GroupSms',
        name: 'GroupSms',
        component: () => import('@/views/eda/faceTeach/GroupSms.vue'),
        meta: { title: '群发短信', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'faceBlacklist',
        name: 'faceBlacklist',
        component: () => import('@/views/eda/faceTeach/faceBlacklist.vue'),
        meta: { title: '面授黑名单', icon: 'product-list' },
        hidden: true,
      },
    ],
  },
  {
    path: '/exa',
    component: Layout,
    redirect: '/exa/examination',
    meta: { title: '考务管理', icon: 'zhaoshengguanli' },
    name: 'exa',
    children: [
      {
        path: 'teachingManage',
        name: 'teachingManage',
        component: () => import('@/views/exa/teachingManage.vue'),
        meta: { title: '授课老师', icon: 'product-add' },
      },
      //授课老师组件开始
      {
        path: 'addTeacher',
        name: 'addTeacher',
        component: () => import('@/views/exa/teachingManage/addTeacher.vue'),
        meta: { title: '添加老师', icon: 'product-add' },
      },
      //授课老师组件结束
      {
        path: 'examination',
        name: 'examination',
        component: () => import('@/views/exa/examinationConfig/index.vue'),
        meta: { title: '考试配置', icon: 'product-add' },
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('@/views/exa/apply.vue'),
        meta: { title: '报考管理', icon: 'product-add' },
      },
      {
        path: 'projectDetails',
        name: 'projectDetails',
        component: () => import('@/views/exa/projectDetails/index.vue'),
        meta: { title: '报考详情', icon: 'product-add' },
      },
      {
        path: 'examinationSMS',
        name: 'examinationSMS',
        component: () => import('@/views/exa/examinationSMS/index.vue'),
        meta: { title: '考务群发短信', icon: 'product-add' },
      },
      {
        path: 'achievement',
        name: 'achievement',
        component: () => import('@/views/exa/achievement.vue'),
        meta: { title: '成绩管理', icon: 'product-add' },
      },
      //成绩管理组件开始
      {
        path: 'achieveDetails',
        name: 'achieveDetails',
        component: () => import('@/views/exa/achievement/achieveDetail.vue'),
        meta: { title: '成绩详情', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'allResult',
        name: 'allResult',
        component: () => import('@/views/exa/achievement/allResults.vue'),
        meta: { title: '全部成绩', icon: 'product-add' },
        hidden: true,
      },
      //成绩管理组件开始
      {
        path: 'graduation',
        name: 'graduation',
        component: () => import('@/views/exa/graduation.vue'),
        meta: { title: '毕业管理', icon: 'product-add' },
      },
      {
        path: 'createplan',
        name: 'createplan',
        component: () => import('@/views/exa/examination/createplan.vue'),
        meta: { title: '添加考试计划', icon: 'product-cate' },
        hidden: true,
      },
    ],
  },

  {
    path: '/fina',
    component: Layout,
    redirect: '/fina/finance',
    meta: { title: '财务管理', icon: 'zhaoshengguanli' },
    name: 'fina',
    children: [
      {
        path: 'finance',
        name: 'finance',
        component: () => import('@/views/fina/finance.vue'),
        meta: { title: '订单管理', icon: 'product-add' },
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/fina/order.vue'),
        meta: { title: '订单审批', icon: 'product-add' },
      },
      {
        path: 'contract ',
        name: 'contract',
        component: () => import('@/views/fina/contract.vue'),
        meta: { title: '合同审核', icon: 'product-add' },
      }
    ],
  },

  {
    path: '/set',
    component: Layout,
    redirect: '/set/role',
    meta: { title: '系统设置', icon: 'zhaoshengguanli' },
    name: 'set',
    children: [
      {
        path: 'contracttemp',
        name: 'contracttemp',
        component: () => import('@/views/set/contracttemp.vue'),
        meta: { title: '合同模板', icon: 'product-add' },
      },
      {
        path: 'imgSpace',
        name: 'imgSpace',
        component: () => import('@/views/set/imgSpace.vue'),
        meta: { title: '图片空间', icon: 'product-add' },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/set/role.vue'),
        meta: { title: '角色权限', icon: 'product-add' },
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/set/staff.vue'),
        meta: { title: '员工管理', icon: 'product-add' },
      },
      {
        path: 'menumanage',
        name: 'menumanage',
        component: () => import('@/views/set/menumanage.vue'),
        meta: { title: '菜单管理', icon: 'product-add' },
      },
      {
        path: 'roledetail',
        name: 'roledetail',
        component: () => import('@/views/set/role/roledetail.vue'),
        meta: { title: '添加角色', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'toDoManagement',
        name: 'toDoManagement',
        component: () => import('@/views/set/toDoManagement.vue'),
        meta: { title: '待办管理', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/set/notice.vue'),
        meta: { title: '通知公告', icon: 'product-add' },
      },

      {
        path: 'operationLog',
        name: 'operationLog',
        component: () => import('@/views/set/operationLog.vue'),
        meta: { title: '操作日志', icon: 'product-add' },
      },
      //操作日志组件组件
      {
        path: 'logDetails',
        name: 'logDetails',
        component: () => import('@/views/set/operationLog/logDetails.vue'),
        meta: { title: '日志详情', icon: 'product-add' },
        hidden: true,
      },
      //操作日志组件结束
      {
        path: 'roledetail',
        name: 'roledetail',
        component: () => import('@/views/set/role/roledetail.vue'),
        meta: { title: '添加角色', icon: 'product-add' },
        hidden: true,
      },
      // {
      //   path: 'cusdetail',
      //   name: 'cusdetail',
      //   component: () => import('@/views/fina/finance/cusdetail.vue'),
      //   meta: { title: '客户详情', icon: 'product-cate' },
      //   hidden: true,
      // },
    ],
  },

  { path: '*', redirect: '/404' },
]
// 把路由表改成 键值对的形式
const routeToMap = (routers) => {
  const routerMap = {}
  const deep = (routers, routesMap) => {
    routers.forEach((route) => {
      const { children, ...reset } = route

      routesMap[route.name] = reset
      if (route.children && route.children.length) {
        deep(route.children, routesMap)
      }
    })
  }
  deep(routers, routerMap)

  return routerMap
}
const asyncRouterMap = routeToMap(asyncRouter)

// 根据接口返回的数据创建路由
export const createUserRouter = (data) => {
  const userRouter = []
  const menuList = []
  const deepCreate = (data, userRouter, menuList) => {
    data.forEach((item) => {
      // 获取asyncRouterMap里对应点路由
      const route = asyncRouterMap[item.node]
      if (route) {
        // 如果接口有返回icon,menu_name 就重写
        item.icon && (route.meta.icon = item.icon)
        item.menu_name && (route.meta.title = item.menu_name)
        // 设置菜单要用的数据
        const menu = {
          name: item.menu_name,
          path: route.path,
          icon: item.icon,
          id: item.id,
        }
        userRouter.push(route)
        // 添加到菜单 show_at_list ===1：在菜单中显示
        item.show_at_list === 1 && menuList.push(menu)
        // 递归子节点
        if (item.children && item.children.length) {
          route.children = []
          menu.children = []
          deepCreate(item.children, route.children, menu.children)
        }
      }
    })
  }
  deepCreate(data, userRouter, menuList)
  // 添加 重定向 404
  userRouter.push({ path: '*', redirect: '/404' })
  // 添加工作台
  menuList.unshift({
    name: '工作台',
    path: '/visualization',
    icon: 'icongongzuotai',
    id: 10000,
  })
  return { userRouter, menuList }
}

const createRouter = () => {
  return new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
  })
}
const router = createRouter()

// 重置路由
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
let currentCacheName = ''
router.beforeEach((to, from, next) => {
  const cacheViews = store.state.cacheView.cacheViews
  const cacheTo = store.state.cacheView.cacheTo

  //  如果去的页面不是缓存条件页面就清除 currentCacheName页面的缓存
  if (currentCacheName && to.name !== currentCacheName && cacheTo[currentCacheName] && !cacheTo[currentCacheName].includes(to.name)) {
    store.dispatch('delViewCache', from.name)
  }

  // 添加缓存
  if (cacheViews.includes(to.name)) {
    currentCacheName = to.name
    store.dispatch('setViewCache', to.name)
  }

  next()
})

export default router
