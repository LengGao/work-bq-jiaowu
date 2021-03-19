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
        meta: { title: '工作台', icon: 'shujukanban' },
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
      //教材发放组件开始
      {
        path: 'materialJournal',
        name: 'materialJournal',
        component: () =>
          import('@/views/eda/teachMaterial/materialJournal.vue'),
        meta: { title: '日志', icon: 'product-cate' },
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
        meta: { title: '全部排课', icon: 'product-cate' },
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
        meta: { title: '日志', icon: 'product-cate' },
        hidden: true,
      },
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
      {
        path: 'examination',
        name: 'examination',
        component: () => import('@/views/exa/examination.vue'),
        meta: { title: '考试配置', icon: 'product-add' },
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
        path: 'orderdetail',
        name: 'orderdetail',
        component: () => import('@/views/fina/order/orderDetail.vue'),
        meta: { title: '订单详情', icon: 'product-add' },
        hidden: true,
      },
      {
        path: 'cusdetail',
        name: 'cusdetail',
        component: () => import('@/views/fina/finance/cusdetail.vue'),
        meta: { title: '客户详情', icon: 'product-cate' },
        hidden: true,
      },
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
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})
