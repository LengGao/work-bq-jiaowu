import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
const whiteList = ['/login', '/forget', '/resetpage', '/menuManage'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(getToken())
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then((res) => {
            // 拉取用户信息,获取权限菜单
            // let menus = res
            let menus = [
              { name: 'sou' }, //包含了资源设置
              { name: 'classifiSetting' }, //资源设置>分类设置
              { name: 'courseManage' }, //资源设置>课程管理
              { name: 'textbookManage' }, //资源设置>教材管理
              { name: 'textbookRecord' }, //资源设置>教材管理>教材记录
              { name: 'projectManage' }, //资源设置>项目管理
              { name: 'agency' }, //资源设置>推荐机构
              { name: 'schoolManage' }, //资源设置>校区管理
              { name: 'classroomManage' }, //资源设置>教室管理
              { name: 'customField' }, //资源管理>自定义字段
              { name: 'businessTemplate' }, //资源管理>业务模板
              { name: 'etm' }, //包含了招生管理
              { name: 'customerManage' }, //招生管理>客户管理
              { name: 'customeRegist' }, //招生管理>客户管理>客户报名
              { name: 'customerDetail' }, //招生管理>客户管理>客户报名>客户详情
              { name: 'orderDetail' }, //招生管理>客户管理>客户报名>订单详情
              { name: 'seaCustomer' }, //招生管理>公海客户
              { name: 'visualization' }, //数据看板
              { name: 'eda' }, //包含了教务管理
              { name: 'studentCenter' }, //教务管理>学生中心
              { name: 'studentDetail' }, //教务管理>学生中心>学生详情
              { name: 'classManage' }, //教务管理>班级管理
              // { name: 'learnerManage' }, //教务管理>班级管理>学生管理
              { name: 'addStudent' }, //教务管理>班级管理>学生管理>添加学生
              { name: 'teachSchedule' }, //教务管理>排课管理

              { name: 'exa' },  //考务管理
              { name: 'examination' },  
              { name: 'apply' }, 
              { name: 'achievement' }, 
              { name: 'graduation' }, 
              { name: 'createplan' }, 

              { name: 'fina' }, //财务管理
              { name: 'finance' }, //订单管理
              { name: 'order' }, 



            ]

            let username = 'account'
            store.dispatch('GenerateRoutes', { username, menus }).then(() => {
              // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true })
            })
          })
          .catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
//节流自定义全局命令
