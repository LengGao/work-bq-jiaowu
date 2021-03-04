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
    redirect: '/sou/enrollmentManagement',
    meta: { title: '资源配置', icon: 'zhaoshengguanli' },
    name: 'sou',
    children: [
      {
        path: 'classifiSetting',
        name: 'classifiSetting',
        component: () => import('@/views/sou/classifiSetting.vue'),
        meta: { title: '分类设置', icon: 'product-add' },
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
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/etm/customerManage/orderDetail.vue'),
        meta: { title: '订单详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'enrollmentManagement',
        name: 'enrollmentManagement',
        component: () => import('@/views/etm/myClients.vue'),
        meta: { title: '我的客户', icon: 'myclient' },
      },
      // 我的客户组件开始
      {
        path: 'IntentionEntry',
        name: 'IntentionEntry',
        component: () => import('@/views/etm/myClient/IntentionEntry.vue'),
        meta: { title: '学员编辑', icon: 'product-cate' },
        hidden: true,
      },
      // 查询后学员编辑
      {
        path: 'studentsToEdit',
        name: 'studentsToEdit',
        component: () => import('@/views/etm/myClient/studentsToEdit.vue'),
        meta: { title: '学员编辑', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'payMent',
        name: 'payMent',
        component: () => import('@/views/etm/myClient/payMent.vue'),
        meta: { title: '缴费', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'refundDetail',
        name: 'refundDetail',
        component: () => import('@/views/etm/myClient/refundDetail.vue'),
        meta: { title: '退费情况', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'studentDetail',
        name: 'studentDetail',
        component: () => import('@/views/etm/myClient/studentDetail.vue'),
        meta: { title: '客户详情', icon: 'product-cate' },
        hidden: true,
      },
      {
        path: 'studyReport',
        name: 'studyReport',
        component: () => import('@/views/etm/myClient/studyReport.vue'),
        meta: { title: '学院报告', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'swapStudent',
        name: 'swapStudent',
        component: () => import('@/views/etm/myClient/swapStudent.vue'),
        meta: { title: '转交学员', icon: 'product-list' },
        hidden: true,
      },
      // 我的客户组件结束
      {
        path: 'seaStudent',
        name: 'seaStudent',
        component: () => import('@/views/etm/seaStudent.vue'),
        meta: { title: '公海学员', icon: 'gonghaixueyuans' },
      },
      {
        path: 'queryStudent',
        name: 'queryStudent',
        component: () => import('@/views/etm/queryStudent.vue'),
        meta: { title: '查询学员', icon: 'queryStudent' },
      },
      {
        path: 'clientSeting',
        name: 'clientSeting',
        component: () => import('@/views/etm/clientSeting.vue'),
        meta: { title: '客户字段设置', icon: 'clientInfo' },
      },
    ],
  },
  {
    path: '/eda',
    component: Layout,
    redirect: '/eda/lessonClassifi',
    meta: { title: '教务管理', icon: 'jiaowuguanli' },
    name: 'eda',
    children: [
      {
        path: 'lessonClassifi',
        name: 'lessonClassifi',
        component: () => import('@/views/eda/lessonClassifi.vue'),
        meta: { title: '课程分类', icon: 'kechengfenlei' },
      },
      //课程分类组件开始
      {
        path: 'lessonDetail',
        name: 'lessonDetail',
        component: () => import('@/views/eda/lessonclassify/lessonDetail.vue'),
        meta: { title: '分类详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'addNewClassify',
        name: 'addNewClassify',
        component: () =>
          import('@/views/eda/lessonclassify/addNewClassify.vue'),
        meta: { title: '分类详情', icon: 'product-list' },
        hidden: true,
      },
      //课程分类组件结束
      {
        path: 'homeClassifi',
        name: 'homeClassifi',
        component: () => import('@/views/eda/homeClassifi.vue'),
        meta: { title: '首页分类', icon: 'shouyefenlei' },
      },
      //视频管理组件开始
      {
        path: 'videoUpload',
        name: 'videoUpload',
        component: () => import('@/views/eda/videoMananger/videoUpload.vue'),
        meta: { title: '章节管理', icon: 'product-list' },
        hidden: true,
      },
      //视频管理组件结束
      {
        path: 'videoMananger',
        name: 'videoMananger',
        component: () => import('@/views/eda/videoMananger.vue'),
        meta: { title: '视频管理', icon: 'shipinguanli', keepAlive: false },
      },
      {
        path: 'questionBank',
        name: 'questionBank',
        component: () => import('@/views/eda/questionBank.vue'),
        meta: { title: '题库管理', icon: 'tikuguanli' },
      },
      // 题库管理组件开始
      {
        path: 'chapterPractise',
        name: 'chapterPractise',
        component: () => import('@/views/eda/questionBank/chapterPractise.vue'),
        meta: { title: '章节练习', icon: 'product-list', keepAlive: true },
        hidden: true,
      },
      {
        path: 'yearTest',
        name: 'yearTest',
        component: () => import('@/views/eda/questionBank/yearTest.vue'),
        meta: { title: '历年真题', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'freedomTest',
        name: 'freedomTest',
        component: () => import('@/views/eda/questionBank/freedomTest.vue'),
        meta: { title: '自主出题', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'addObject',
        name: 'addObject',
        component: () => import('@/views/eda/questionBank/addObject.vue'),
        meta: { title: '添加题目', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'caseAnalyse',
        name: 'caseAnalyse',
        component: () => import('@/views/eda/questionBank/caseAnalyse.vue'),
        meta: { title: '案例添加', icon: 'product-list' },
        hidden: true,
      },
      //题库组件结束
      {
        path: 'testSeting',
        name: 'testSeting',
        component: () => import('@/views/eda/testSeting.vue'),
        meta: { title: '考试配置', icon: 'kaoshipeizhi' },
      },
      //考试配置组件开始
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/eda/testSeting/editor.vue'),
        meta: { title: '考试编辑', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'freedomTestSeting',
        name: 'freedomTestSeting',
        component: () => import('@/views/eda/testSeting/freedomTestSeting.vue'),
        meta: { title: '自主出题配置', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'freedomTestPage',
        name: 'freedomTestPage',
        component: () => import('@/views/eda/testSeting/freedomTestPage.vue'),
        meta: { title: '自主出题试卷', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'virtualTestSeting',
        name: 'virtualTestSeting',
        component: () => import('@/views/eda/testSeting/virtualTestSeting.vue'),
        meta: { title: '模拟考试配置', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'yearTestSeting',
        name: 'yearTestSeting',
        component: () => import('@/views/eda/testSeting/yearTestSeting.vue'),
        meta: { title: '历年真题配置', icon: 'product-list' },
        hidden: true,
      },
      //考试配置组件结束
      //直播管理组件开始
      {
        path: 'liveMiddle',
        name: 'liveMiddle',
        component: () => import('@/views/eda/liveManager/liveMiddle.vue'),
        meta: { title: '直播管理', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'live',
        name: 'live',
        component: () => import('@/views/eda/liveManager/live.vue'),
        meta: { title: '直播列表', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'openclassVideo',
        name: 'openclassVideo',
        component: () => import('@/views/eda/liveManager/addOpen.vue'),
        meta: { title: '添加公开课直播', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveMan',
        name: 'liveMan',
        component: () => import('@/views/eda/liveManager/liveMan.vue'),
        meta: { title: '直播详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveBack',
        name: 'liveBack',
        component: () => import('@/views/eda/liveManager/liveBack.vue'),
        meta: { title: '直播回顾', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveMaterial',
        name: 'liveMaterial',
        component: () => import('@/views/eda/liveManager/liveMaterial.vue'),
        meta: { title: '学习资料', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveDetail',
        name: 'liveDetail',
        component: () => import('@/views/eda/liveManager/liveDetail.vue'),
        meta: { title: '直播详情', icon: 'product-list' },
        hidden: true,
      },
      //直播管理组件结束
      {
        path: 'liveManager',
        name: 'liveManager',
        component: () => import('@/views/eda/liveManager.vue'),
        meta: { title: '直播管理', icon: 'zhiboguanli' },
      },
      {
        path: 'courseManage',
        name: 'courseManage',
        component: () => import('@/views/eda/courseManage.vue'),
        meta: { title: '课程管理', icon: 'kechengguanli' },
      },
      //课程管理组件开始

      {
        path: 'createClass',
        name: 'createClass',
        component: () => import('@/views/eda/courseManage/createClass.vue'),
        meta: { title: '创建单科班', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'studyMaterial',
        name: 'studyMaterial',
        component: () => import('@/views/eda/courseManage/studyMaterial.vue'),
        meta: { title: '学习资料', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'courseDetail',
        name: 'courseDetail',
        component: () => import('@/views/eda/courseManage/courseDetail.vue'),
        meta: { title: '学习资料', icon: 'product-list' },
        hidden: true,
      },

      //课程管理组件结束
      {
        path: 'studentManage',
        name: 'studentManage',
        component: () => import('@/views/eda/studentManage.vue'),
        meta: { title: '学员管理', icon: 'xueyuanguanli' },
      },
      //学员管理组件开始
      {
        path: 'changeClass',
        name: 'changeClass',
        component: () => import('@/views/eda/studentManage/changeClass.vue'),
        meta: { title: '学员转班', icon: 'product-list' },
        hidden: true,
      },
      //学员管理组件结束
      {
        path: 'classManage',
        name: 'classManage',
        component: () => import('@/views/eda/classManage.vue'),
        meta: { title: '班级管理', icon: 'banjiguanli' },
      },
      //班级管理组件开始

      {
        path: 'classDetail',
        name: 'classDetail',
        component: () => import('@/views/eda/classManage/classDetail.vue'),
        meta: { title: '班级详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'editClasses',
        name: 'editClasses',
        component: () => import('@/views/eda/classManage/editClasses.vue'),
        meta: { title: '编辑班级', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'learnerManage',
        name: 'learnerManage',
        component: () => import('@/views/eda/classManage/learnerManage.vue'),
        meta: { title: '学员管理', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'addLearner',
        name: 'addLearner',
        component: () => import('@/views/eda/classManage/addLearner.vue'),
        meta: { title: '添加学员', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'massMessage',
        name: 'massMessage',
        component: () => import('@/views/eda/classManage/massMessage.vue'),
        meta: { title: '群发消息', icon: 'product-list' },
        hidden: true,
      },
      //班级管理组件结束
      {
        path: 'faceTeach',
        name: 'faceTeach',
        component: () => import('@/views/eda/faceTeach.vue'),
        meta: { title: '面授约课', icon: 'mianshouyueke' },
      },
      //面授约课组件开始
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
        path: 'studentDetail',
        name: 'studentDetail',
        component: () => import('@/views/eda/faceTeach/studentDetail.vue'),
        meta: { title: '学生详情', icon: 'product-list' },
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
        path: 'addStudent',
        name: 'addStudent',
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
      {
        path: 'faceBlacklist',
        name: 'faceBlacklist',
        component: () => import('@/views/eda/faceTeach/faceBlacklist.vue'),
        meta: { title: '面授黑名单', icon: 'product-list' },
        hidden: true,
      },
      //面授约课组件结束
    ],
  },
  {
    path: '/smt',
    component: Layout,
    redirect: '/smt/schoolManagement',
    meta: { title: '学校管理', icon: 'xuexiaoguanli' },
    name: 'smt',
    children: [
      {
        path: 'schoolManagement',
        name: 'schoolManagement',
        component: () => import('@/views/smt/roleManage.vue'),
        meta: { title: '角色管理', icon: 'jueseguanli' },
      },
      // 角色管理组件开始
      {
        path: 'addRole',
        name: 'addRole',
        component: () => import('@/views/smt/roleManage/addRole.vue'),
        meta: { title: '添加角色', icon: 'product-list' },
        hidden: true,
      },
      // 角色管理组件结束

      {
        path: 'recommender',
        name: 'recommender',
        component: () => import('@/views/eda/recommender.vue'),
        meta: { title: '推荐机构', icon: 'tuijianjigou' },
      },
      //推荐机构组件开始
      {
        path: 'editOrgan',
        name: 'editOrgan',
        component: () => import('@/views/eda/recommender/editOrgan.vue'),
        meta: { title: '编辑机构', icon: 'product-list' },
        hidden: true,
      },
      //推荐机构组件结束

      {
        path: 'staffManage',
        name: 'staffManage',
        component: () => import('@/views/smt/staffManage.vue'),
        meta: { title: '员工管理', icon: 'yuangongguanli' },
      },
      // 员工管理组件开始
      {
        path: 'addEmployee',
        name: 'addEmployee',
        component: () => import('@/views/smt/staffManage/addEmployee.vue'),
        meta: { title: '添加员工', icon: 'product-add' },
        hidden: true,
      },
      //员工管理组件结束
      {
        path: 'teachingManage',
        name: 'teachingManage',
        component: () => import('@/views/smt/teachingManage.vue'),
        meta: { title: '授课老师管理', icon: 'dingdanguanli' },
      },
      //员工管理组件结束
      {
        path: 'addTeacher',
        name: 'addTeacher',
        component: () => import('@/views/smt/teachingManage/addTeacher.vue'),
        meta: { title: '添加老师', icon: 'product-add' },
        hidden: true,
      },
      //员工管理组件结束
      {
        path: 'orderManage',
        name: 'orderManage',
        component: () => import('@/views/smt/orderManage.vue'),
        meta: { title: '订单管理', icon: 'dingdanguanli' },
      },
      {
        path: 'operationLog',
        name: 'operationLog',
        component: () => import('@/views/smt/operationLog.vue'),
        meta: { title: '操作日志', icon: 'caozuorizhi' },
      },
      //操作日志组件开始
      {
        path: 'logDetails',
        name: 'logDetails',
        component: () => import('@/views/smt/operationLog/logDetails.vue'),
        meta: { title: '日志详情', icon: 'product-add' },
        hidden: true,
      },
      //操作日志组件结束
      // {
      //   path: 'test',
      //   name: 'test',
      //   component: () => import('@/views/smt/test.vue'),
      //   meta: { title: '测试(随时可删)', icon: 'caozuorizhi' },
      // },
    ],
  },
  {
    path: '/sts',
    component: Layout,
    redirect: '/sts/statisticalSystem',
    meta: { title: '统计系统', icon: 'tongjixitong' },
    name: 'sts',
    children: [
      {
        path: 'statisticalSystem',
        name: 'statisticalSystem',
        component: () => import('@/views/sts/dailyClock.vue'),
        meta: { title: '每日打卡统计', icon: 'meiridaka' },
      },
      //每日打卡统计组件开始
      {
        path: 'clockDetail',
        name: 'clockDetail',
        component: () => import('@/views/sts/dailyClock/clockDetail.vue'),
        meta: { title: '打卡详情', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'clockStaff',
        name: 'clockStaff',
        component: () => import('@/views/sts/dailyClock/clockStaff.vue'),
        meta: { title: '打卡人员', icon: 'product-list' },
        hidden: true,
      },
      //每日打卡统计组件结束
      {
        path: 'chapterExercise',
        name: 'chapterExercise',
        component: () => import('@/views/sts/chapterExercise.vue'),
        meta: { title: '章节练习统计', icon: 'zhangjielianxi1' },
      },
      //章节练习统计组件开始
      {
        path: 'practice',
        name: 'practice',
        component: () => import('@/views/sts/chapterExercise/practice.vue'),
        meta: { title: '练习情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'practitioner',
        name: 'practitioner',
        component: () => import('@/views/sts/chapterExercise/practitioner.vue'),
        meta: { title: '练习人员', icon: 'product-list' },
        hidden: true,
      },
      //章节练习统计组件结束
      {
        path: 'realTopic',
        name: 'realTopic',
        component: () => import('@/views/sts/realTopic.vue'),
        meta: { title: '历年真题统计', icon: 'linianzhenti' },
      },
      //历年真题统计组件开始
      {
        path: 'answer',
        name: 'answer',
        component: () => import('@/views/sts/realTopic/answer.vue'),
        meta: { title: '答题情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'brushTopic',
        name: 'brushTopic',
        component: () => import('@/views/sts/realTopic/brushTopic.vue'),
        meta: { title: '刷题模式', icon: 'product-list' },
        hidden: true,
      },
      //历年真题统计组件结束
      {
        path: 'brushChallenge',
        name: 'brushChallenge',
        component: () => import('@/views/sts/brushChallenge.vue'),
        meta: { title: '刷题挑战统计', icon: 'shuatitiaozhan' },
      },
      //刷题挑战统计组件开始
      {
        path: 'challenges',
        name: 'challenges',
        component: () => import('@/views/sts/brushChallenge/challenges.vue'),
        meta: { title: '挑战情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'challengePeople',
        name: 'challengePeople',
        component: () =>
          import('@/views/sts/brushChallenge/challengePeople.vue'),
        meta: { title: '挑战人员', icon: 'product-list' },
        hidden: true,
      },
      //刷题挑战统计组件结束
      {
        path: 'mockTest',
        name: 'mockTest',
        component: () => import('@/views/sts/mockTest.vue'),
        meta: { title: '模拟考试统计', icon: 'monikaoshi' },
      },
      //模拟考试统计组件开始
      {
        path: 'examiners',
        name: 'examiners',
        component: () => import('@/views/sts/mockTest/examiners.vue'),
        meta: { title: '考试人员', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'examination',
        name: 'examination',
        component: () => import('@/views/sts/mockTest/examination.vue'),
        meta: { title: '考试情况', icon: 'product-list' },
        hidden: true,
      },

      //模拟考试统计组件结束
      {
        path: 'assignTopic',
        name: 'assignTopic',
        component: () => import('@/views/sts/assignTopic.vue'),
        meta: { title: '自主出题统计', icon: 'zizhuchuti' },
      },
      //自主出题统计组件结束
      {
        path: 'answerSituation',
        name: 'answerSituation',
        component: () => import('@/views/sts/assignTopic/answerSituation.vue'),
        meta: { title: '答题情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'studentAnswer',
        name: 'studentAnswer',
        component: () => import('@/views/sts/assignTopic/studentAnswer.vue'),
        meta: { title: '答题学生', icon: 'product-list' },
        hidden: true,
      },
      //自主出题统计组件结束
      {
        path: 'recordedBroadcast',
        name: 'recordedBroadcast',
        component: () => import('@/views/sts/recordedBroadcast.vue'),
        meta: { title: '课程录播统计', icon: 'kechenlubo' },
      },
      //课程录播统计组件开始
      {
        path: 'watchSituation',
        name: 'watchSituation',
        component: () =>
          import('@/views/sts/recordedBroadcast/watchSituation.vue'),
        meta: { title: '观看情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'spectator',
        name: 'spectator',
        component: () => import('@/views/sts/recordedBroadcast/spectator.vue'),
        meta: { title: '观看人员', icon: 'product-list' },
        hidden: true,
      },
      //课程录播统计组件结束
      {
        path: 'liveReplay',
        name: 'liveReplay',
        component: () => import('@/views/sts/liveReplay.vue'),
        meta: { title: '直播回播统计', icon: 'zhibohuigu' },
      },
      //直播回播统计组件开始
      {
        path: 'classSituation',
        name: 'classSituation',
        component: () => import('@/views/sts/liveReplay/classSituation.vue'),
        meta: { title: '班级情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveBroadcast',
        name: 'liveBroadcast',
        component: () => import('@/views/sts/liveReplay/liveBroadcast.vue'),
        meta: { title: '直播情况', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'liveStatistics',
        name: 'liveStatistics',
        component: () => import('@/views/sts/liveReplay/liveStatistics.vue'),
        meta: { title: '直播统计', icon: 'product-list' },
        hidden: true,
      },
      //直播回播统计组件结束
      {
        path: 'faceStatistics',
        name: 'faceStatistics',
        component: () => import('@/views/sts/faceStatistics.vue'),
        meta: { title: '面授约课统计', icon: 'mianshouyueke' },
      },
      //面授约课统计组件结束
      {
        path: 'faceManagement',
        name: 'faceManagement',
        component: () =>
          import('@/views/sts/faceStatistics/faceManagement.vue'),
        meta: { title: '面授课管理', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'followerDetail',
        name: 'followerDetail',
        component: () =>
          import('@/views/sts/faceStatistics/followerDetail.vue'),
        meta: { title: '学生详情', icon: 'product-list' },
        hidden: true,
      },

      //面授约课统计组件结束
      {
        path: 'InstitutionalTrainee',
        name: 'InstitutionalTrainee',
        component: () => import('@/views/sts/InstitutionalTrainee.vue'),
        meta: { title: '机构学员统计', icon: 'jigouxueyuan' },
      },
      //机构学员统计组件结束
      {
        path: 'courseType',
        name: 'courseType',
        component: () =>
          import('@/views/sts/InstitutionalTrainee/courseType.vue'),
        meta: { title: '课程类型', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'followerManage',
        name: 'followerManage',
        component: () =>
          import('@/views/sts/InstitutionalTrainee/followerManage.vue'),
        meta: { title: '学生管理', icon: 'product-list' },
        hidden: true,
      },
      //机构学员统计组件结束
    ],
  },
  {
    path: '/extra',
    component: Layout,
    redirect: '/extra/imgSpace',
    meta: { title: '系统配置', icon: 'xitongpeizhi' },
    name: 'pms',
    children: [
      {
        path: 'imgSpace',
        name: 'imgSpace',
        component: () => import('@/views/extra/imgSpace.vue'),
        meta: { title: '图片空间', icon: 'imgSpace' },
      },
      {
        path: 'videoWaterMark',
        name: 'videoWaterMark',
        component: () => import('@/views/extra/videoWaterMark.vue'),
        meta: { title: '视频水印', icon: 'videoConfirm' },
      },
      {
        path: 'miniProgram',
        name: 'miniProgram',
        component: () => import('@/views/extra/miniProgram.vue'),
        meta: { title: '小程序', icon: 'miniPro', keepAlive: true },
      },
      {
        path: 'onlineSchool',
        name: 'onlineSchool',
        component: () => import('@/views/extra/onlineSchool.vue'),
        meta: { title: 'PC网校', icon: 'onlinePC', keepAlive: true },
      },
      {
        path: 'menuManage',
        name: 'menuManage',
        component: () => import('@/views/extra/menuManage.vue'),
        meta: { title: '菜单管理', icon: 'onlinePC', keepAlive: true },
      },
      //pc网课组件开始
      {
        path: 'pageDesign',
        name: 'pageDesign',
        component: () => import('@/views/extra/onlineSchool/pageDesign.vue'),
        meta: { title: '首页装修', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'pageAdvert',
        name: 'pageAdvert',
        component: () => import('@/views/extra/onlineSchool/pageAdvert.vue'),
        meta: { title: '子页面广告位', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'aboutUs',
        name: 'aboutUs',
        component: () => import('@/views/extra/onlineSchool/aboutUs.vue'),
        meta: { title: '关于我们页面', icon: 'product-list' },
        hidden: true,
      },
      {
        path: 'contactUs',
        name: 'contactUs',
        component: () => import('@/views/extra/onlineSchool/contactUs.vue'),
        meta: { title: '联系我们页面', icon: 'product-list' },
        hidden: true,
      },
      //pc网课组件结束
      {
        path: 'messageInter',
        name: 'messageInter',
        component: () => import('@/views/extra/messageInter.vue'),
        meta: { title: '消息互动', icon: 'messageInter' },
      },
      {
        path: 'smsRecord',
        name: 'smsRecord',
        component: () => import('@/views/extra/smsRecord.vue'),
        meta: { title: '短信记录', icon: 'messageInter' },
      },
    ],
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org/myTeacher',
    meta: { title: '机构管理', icon: 'organizition' },
    name: 'org',
    children: [
      {
        path: 'myTeacher',
        name: 'myTeacher',
        component: () => import('@/views/organization/myTeacher.vue'),
        meta: { title: '招生概况（教师）', icon: 'teachers' },
      },
      {
        path: 'thirdOrg',
        name: 'thirdOrg',
        component: () => import('@/views/organization/thirdOrg.vue'),
        meta: { title: '招生概况（机构）', icon: 'instuation' },
        children: [],
      },
      {
        path: 'manger',
        name: 'manger',
        component: () => import('@/views/organization/manger.vue'),
        meta: { title: '课程管理' },
        hidden: true,
      },
      {
        path: 'studentThirdDetail',
        name: 'studentThirdDetail',
        component: () => import('@/views/organization/studentThirdDetail.vue'),
        meta: { title: '学员管理详情' },
        hidden: true,
      },
      {
        path: 'teacherStudent',
        name: 'teacherStudent',
        component: () => import('@/views/organization/teacherStudent.vue'),
        meta: { title: '学员管理详情' },
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
