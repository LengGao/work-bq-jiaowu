import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Layout from '../views/layout/Layout'

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
    // name: 'pms',
    children: [
      {
        path: 'visualization',
        name: 'visualization',
        component: () => import('@/views/pms/visualization.vue'),
        meta: { title: '数据看板', icon: 'shujukanban' },
      },
    ],
  },
]
export const asyncRouterMap = [
  {
    path: '/sou',
    component: Layout,
    redirect: '/sou/classifiSetting',
    meta: { title: '资源配置', icon: 'zhaoshengguanli' },
    name: 'sou',
    children: [
      {
        path: 'classifiSetting',
        name: 'classifiSetting',
        component: () => import('@/views/sou/classifiSetting.vue'),
        meta: { title: '分类设置', icon: 'product-add' },
      },
      {
        path: 'courseManage',
        name: 'courseManage',
        component: () => import('@/views/sou/courseManage.vue'),
        meta: { title: '课程管理', icon: 'product-add' },
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
        component: () =>
          import('@/views/sou/courseManage/configureCourses.vue'),
        meta: { title: '配置课程 ', icon: 'product-cate' },
        hidden: true,
      },
      //课程管理组件结束
      {
        path: 'textbookManage',
        name: 'textbookManage',
        component: () => import('@/views/sou/textbookManage.vue'),
        meta: { title: '教材管理', icon: 'product-add' },
      },
      //教材管理组件开始
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
        component: () => import('@/views/sou/agency.vue'),
        meta: { title: '推荐机构', icon: 'product-add' },
      },
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
    ],
  },
  {
    path: '/etm',
    component: Layout,
    redirect: '/etm/enrollmentManagement',
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
        path: 'customeRegist',
        name: 'customeRegist',
        component: () => import('@/views/etm/customerManage/customeRegist.vue'),
        meta: { title: '客户报名', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'onlineStudents',
        name: 'onlineStudents',
        component: () =>
          import('@/views/etm/customerManage/onlineStudents.vue'),
        meta: { title: '网课学生', icon: 'product-cate' },
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
        path: 'studentCenter',
        name: 'studentCenter',
        component: () => import('@/views/eda/studentCenter.vue'),
        meta: { title: '学生中心', icon: 'product-cate' },
      },
      //学生中心组件开始
      {
        path: 'studentDetail',
        name: 'studentDetail',
        component: () => import('@/views/eda/studentCenter/studentDetail.vue'),
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

      //学生中心组件结束
      {
        path: 'classManage',
        name: 'classManage',
        component: () => import('@/views/eda/classManage.vue'),
        meta: { title: '班级管理', icon: 'product-cate' },
      },
      //班级管理组件开始
      {
        path: 'learnerManage',
        name: 'learnerManage',
        component: () => import('@/views/eda/classManage/learnerManage.vue'),
        meta: { title: '学生管理', icon: 'product-cate' },
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
        meta: { title: '', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'classDetail',
        name: 'classDetail',
        component: () => import('@/views/eda/classManage/classDetail.vue'),
        meta: { title: '', icon: 'product-cate' },
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
        meta: { title: '全部排课', icon: 'product-cate' },
        hidden: true,
      },
      //排课管理结束
    ],
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/notice',
    meta: { title: '系统配置', icon: 'xitongpeizhi' },
    name: 'sys',
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/sys/notice.vue'),
        meta: { title: '通知公告', icon: 'imgSpace' },
      },
    ],
  },

  // {
  //   path: '/extra',
  //   component: Layout,
  //   redirect: '/extra/imgSpace',
  //   meta: { title: '系统配置', icon: 'xitongpeizhi' },
  //   name: 'pms',
  //   children: [
  //     {
  //       path: 'imgSpace',
  //       name: 'imgSpace',
  //       component: () => import('@/views/extra/imgSpace.vue'),
  //       meta: { title: '图片空间', icon: 'imgSpace' },
  //     },
  //     {
  //       path: 'videoWaterMark',
  //       name: 'videoWaterMark',
  //       component: () => import('@/views/extra/videoWaterMark.vue'),
  //       meta: { title: '视频水印', icon: 'videoConfirm' },
  //     },
  //     {
  //       path: 'miniProgram',
  //       name: 'miniProgram',
  //       component: () => import('@/views/extra/miniProgram.vue'),
  //       meta: { title: '小程序', icon: 'miniPro', keepAlive: true },
  //     },
  //     {
  //       path: 'onlineSchool',
  //       name: 'onlineSchool',
  //       component: () => import('@/views/extra/onlineSchool.vue'),
  //       meta: { title: 'PC网校', icon: 'onlinePC', keepAlive: true },
  //     },
  //     {
  //       path: 'menuManage',
  //       name: 'menuManage',
  //       component: () => import('@/views/extra/menuManage.vue'),
  //       meta: { title: '菜单管理', icon: 'onlinePC', keepAlive: true },
  //     },
  //     //pc网课组件开始
  //     {
  //       path: 'pageDesign',
  //       name: 'pageDesign',
  //       component: () => import('@/views/extra/onlineSchool/pageDesign.vue'),
  //       meta: { title: '首页装修', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'pageAdvert',
  //       name: 'pageAdvert',
  //       component: () => import('@/views/extra/onlineSchool/pageAdvert.vue'),
  //       meta: { title: '子页面广告位', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'aboutUs',
  //       name: 'aboutUs',
  //       component: () => import('@/views/extra/onlineSchool/aboutUs.vue'),
  //       meta: { title: '关于我们页面', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'contactUs',
  //       name: 'contactUs',
  //       component: () => import('@/views/extra/onlineSchool/contactUs.vue'),
  //       meta: { title: '联系我们页面', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     //pc网课组件结束
  //     {
  //       path: 'messageInter',
  //       name: 'messageInter',
  //       component: () => import('@/views/extra/messageInter.vue'),
  //       meta: { title: '消息互动', icon: 'messageInter' },
  //     },
  //     {
  //       path: 'smsRecord',
  //       name: 'smsRecord',
  //       component: () => import('@/views/extra/smsRecord.vue'),
  //       meta: { title: '短信记录', icon: 'messageInter' },
  //     },
  //   ],
  // },
  {
    path: '/exa',
    component: Layout,
    redirect: '/exa/examination',
    meta: { title: '考务管理', icon: 'zhaoshengguanli' },
    name: 'exa',
    children: [
      {
        path: 'examination',
        name: 'examination',
        component: () => import('@/views/exa/examination.vue'),
        meta: { title: '考试计划', icon: 'product-add' },
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('@/views/exa/apply.vue'),
        meta: { title: '报考管理', icon: 'product-add' },
      },
      {
        path: 'achievement',
        name: 'achievement',
        component: () => import('@/views/exa/achievement.vue'),
        meta: { title: '成绩管理', icon: 'product-add' },
      },
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
  { path: '*', redirect: '/404' },
]
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})
