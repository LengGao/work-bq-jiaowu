import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(store.getters.roles.length)
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then((res) => {
            // 拉取用户信息
            let menus = [
              { name: 'etm' }, //包含了招生管理
              // { name: 'enrollmentManagement' }, //首页
              { name: 'customerManage' }, //招生管理>客户管理
              { name: 'customeRegist' }, //招生管理>客户管理>客户报名
              { name: 'customerDetail' }, //招生管理>客户管理>客户报名>客户详情orderDetail
              { name: 'orderDetail' }, //招生管理>客户管理>客户报名>订单详情
              { name: 'visualization' }, //数据看板
              { name: 'pms' }, //
              { name: 'seaCustomer' }, //公海学员
              { name: 'queryStudent' },
              { name: 'clientSeting' },
              { name: 'payMent' },
              { name: 'IntentionEntry' },
              { name: 'studentDetail' },
              { name: 'studyReport' },
              { name: 'eda' },
              { name: 'lessonClassifi' },
              { name: 'homeClassifi' },
              { name: 'lessonDetail' },
              { name: 'videoMananger' }, //视频管理
              { name: 'questionBank' }, //题库管理
              { name: 'yearTest' }, //历年真题
              { name: 'freedomTest' }, //自由出题
              { name: 'chapterPractise' }, //章节练习
              { name: 'liveManager' }, //直播管理
              { name: 'testSeting' }, //考试配置
              { name: 'extra' }, //系统配置
              { name: 'imgSpace' },
              { name: 'videoWaterMark' },
              { name: 'miniProgram' },
              { name: 'messageInter' },
              { name: 'addNewClassify' }, //添加新课程分类
              { name: 'addObject' },
            ]
            let username = 'admin'
            store.dispatch('GenerateRoutes', { menus, username }).then(() => {
              console.log('qweewqe')
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
  NProgress.done()
  //   }
  // }
  next()
  NProgress.done()
  //   }
  // }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
