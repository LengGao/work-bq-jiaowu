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
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' },
      },
    ],
  },
]

export const asyncRouterMap = [
  // {
  //   path: '/pms',
  //   component: Layout,
  //   redirect: '/pms/visualization',
  //   name: 'pms',
  //   children: [
  //     {
  //       path: 'visualization',
  //       name: 'visualization',
  //       component: () => import('@/views/pms/hello.vue'),
  //       meta: { title: '数据可视化', icon: 'product-list' },
  //     },
  //   ],
  // },

  {
    path: '/etm',
    component: Layout,
    redirect: '/etm/enrollmentManagement',
    meta: { title: '招生管理', icon: 'product' },
    name: 'etm',
    children: [
      // {
      //   path: 'enrollmentManagement',
      //   name: 'enrollmentManagement',
      //   component: () => import('@/views/etm/myClients.vue'),
      //   meta: { title: '客户管理', icon: 'product-add' },
      // },
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
      //客户管理组件结束

      // 我的客户组件开始
      // {
      //   path: 'IntentionEntry',
      //   name: 'IntentionEntry',
      //   component: () => import('@/views/etm/myClient/IntentionEntry.vue'),
      //   meta: { title: '学员编辑', icon: 'product-cate' },
      //   hidden: true,
      // },
      // {
      //   path: 'payMent',
      //   name: 'payMent',
      //   component: () => import('@/views/etm/myClient/payMent.vue'),
      //   meta: { title: '缴费', icon: 'product-cate' },
      //   hidden: true,
      // },
      // {
      //   path: 'studentDetail',
      //   name: 'studentDetail',
      //   component: () => import('@/views/etm/myClient/studentDetail.vue'),
      //   meta: { title: '客户详情', icon: 'product-cate' },
      //   hidden: true,
      // },
      // {
      //   path: 'studyReport',
      //   name: 'studyReport',
      //   component: () => import('@/views/etm/myClient/studyReport.vue'),
      //   meta: { title: '学院报告', icon: 'product-list' },
      //   hidden: true,
      // },
      // 我的客户组件结束
      {
        path: 'seaStudent',
        name: 'seaStudent',
        component: () => import('@/views/etm/seaStudent.vue'),
        meta: { title: '公海学员', icon: 'product-cate' },
      },

      {
        path: 'queryStudent',
        name: 'queryStudent',
        component: () => import('@/views/etm/queryStudent.vue'),
        meta: { title: '查询学员', icon: 'product-attr' },
      },
      {
        path: 'clientSeting',
        name: 'clientSeting',
        component: () => import('@/views/etm/clientSeting.vue'),
        meta: { title: '客户字段设置', icon: 'product-brand' },
      },
    ],
  },
  // {
  //   path: '/eda',
  //   component: Layout,
  //   redirect: '/eda/lessonClassifi',
  //   meta: { title: '教务管理', icon: 'order' },
  //   name: 'eda',
  //   children: [
  //     {
  //       path: 'lessonClassifi',
  //       name: 'lessonClassifi',
  //       component: () => import('@/views/eda/lessonClassifi.vue'),
  //       meta: { title: '课程分类', icon: 'product-list', keepAlive: true },
  //     },
  //     //课程分类组件开始
  //     {
  //       path: 'lessonDetail',
  //       name: 'lessonDetail',
  //       component: () => import('@/views/eda/lessonclassify/lessonDetail.vue'),
  //       meta: { title: '分类详情', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'addNewClassify',
  //       name: 'addNewClassify',
  //       component: () =>
  //         import('@/views/eda/lessonclassify/addNewClassify.vue'),
  //       meta: { title: '分类详情', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     //课程分类组件结束
  //     {
  //       path: 'homeClassifi',
  //       name: 'homeClassifi',
  //       component: () => import('@/views/eda/homeClassifi.vue'),
  //       meta: { title: '首页分类', icon: 'product-list' },
  //     },
  //     {
  //       path: 'videoMananger',
  //       name: 'videoMananger',
  //       component: () => import('@/views/eda/videoMananger.vue'),
  //       meta: { title: '视频管理', icon: 'product-list' },
  //     },
  //     {
  //       path: 'questionBank',
  //       name: 'questionBank',
  //       component: () => import('@/views/eda/questionBank.vue'),
  //       meta: { title: '题库管理', icon: 'product-list' },
  //     },
  //     // 题库管理组件开始
  //     {
  //       path: 'chapterPractise',
  //       name: 'chapterPractise',
  //       component: () => import('@/views/eda/questionBank/chapterPractise.vue'),
  //       meta: { title: '章节练习', icon: 'product-list', keepAlive: true },
  //       hidden: true,
  //     },
  //     {
  //       path: 'yearTest',
  //       name: 'yearTest',
  //       component: () => import('@/views/eda/questionBank/yearTest.vue'),
  //       meta: { title: '历年真题', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'freedomTest',
  //       name: 'freedomTest',
  //       component: () => import('@/views/eda/questionBank/freedomTest.vue'),
  //       meta: { title: '自主出题', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'addObject',
  //       name: 'addObject',
  //       component: () => import('@/views/eda/questionBank/addObject.vue'),
  //       meta: { title: '添加题目', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'caseAnalyse',
  //       name: 'caseAnalyse',
  //       component: () => import('@/views/eda/questionBank/caseAnalyse.vue'),
  //       meta: { title: '案例添加', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     //题库组件结束
  //     {
  //       path: 'testSeting',
  //       name: 'testSeting',
  //       component: () => import('@/views/eda/testSeting.vue'),
  //       meta: { title: '考试配置', icon: 'product-list' },
  //     },
  //     //考试配置组件开始
  //     {
  //       path: 'editor',
  //       name: 'editor',
  //       component: () => import('@/views/eda/testSeting/editor.vue'),
  //       meta: { title: '考试编辑', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'freedomTestSeting',
  //       name: 'freedomTestSeting',
  //       component: () => import('@/views/eda/testSeting/freedomTestSeting.vue'),
  //       meta: { title: '自主出题配置', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'virtualTestSeting',
  //       name: 'virtualTestSeting',
  //       component: () => import('@/views/eda/testSeting/virtualTestSeting.vue'),
  //       meta: { title: '模拟考试配置', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'yearTestSeting',
  //       name: 'yearTestSeting',
  //       component: () => import('@/views/eda/testSeting/yearTestSeting.vue'),
  //       meta: { title: '历年真题配置', icon: 'product-list' },
  //       hidden: true,
  //     },
  //     //考试配置组件结束
  //     {
  //       path: 'liveManager',
  //       name: 'liveManager',
  //       component: () => import('@/views/eda/liveManager.vue'),
  //       meta: { title: '直播管理', icon: 'product-list' },
  //     },
  //   ],
  // },
  // {
  //   path: '/extra',
  //   component: Layout,
  //   redirect: '/extra/imgSpace',
  //   meta: { title: '系统配置', icon: 'ums-admin' },
  //   name: 'pms',
  //   children: [
  //     {
  //       path: 'imgSpace',
  //       name: 'imgSpace',
  //       component: () => import('@/views/extra/imgSpace.vue'),
  //       meta: { title: '图片空间', icon: 'product-list' },
  //     },
  //     {
  //       path: 'videoWaterMark',
  //       name: 'videoWaterMark',
  //       component: () => import('@/views/extra/videoWaterMark.vue'),
  //       meta: { title: '视频水印', icon: 'product-list' },
  //     },
  //     {
  //       path: 'miniProgram',
  //       name: 'miniProgram',
  //       component: () => import('@/views/extra/miniProgram.vue'),
  //       meta: { title: '小程序', icon: 'product-list' },
  //     },
  //     {
  //       path: 'messageInter',
  //       name: 'messageInter',
  //       component: () => import('@/views/extra/messageInter.vue'),
  //       meta: { title: '消息互动', icon: 'product-list' },
  //     },
  //   ],
  // },
  { path: '*', redirect: '/404' },
]
export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})
