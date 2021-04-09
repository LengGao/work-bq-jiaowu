import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { createUserRouter } from '@/router'
const whiteList = ['/login', '/forget', '/resetpage', '/menuManage'] // 不重定向白名单

router.beforeEach((to, from, next) => {
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
            const { userRouter, menuList } = createUserRouter(res)
            // 设置路由
            store.dispatch('addRouter', userRouter)
            // 设置菜单数据
            store.dispatch('setMenus', menuList)
            // 默认进入第一个路由
            const firstRoute = userRouter[0]
            next({ ...firstRoute, replace: true })
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
