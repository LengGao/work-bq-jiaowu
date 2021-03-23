import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { asyncRouterMap, indexRoute } from '@/router'
const whiteList = ['/login', '/forget', '/resetpage', '/menuManage'] // 不重定向白名单
// 根据接口返回的数据创建路由
const createRouter = (data) => {
  const newRouter = []
  const menuList = []
  const deepCreate = (data, newRouter, menuList) => {
    data.forEach(item => {
      // 获取asyncRouterMap里对应点路由
      const route = asyncRouterMap[item.node]
      if (route) {
        // 如果接口有返回icon,menu_name 就重写
        item.icon && (route.meta.icon = item.icon);
        item.menu_name && (route.meta.title = item.menu_name);
        // 设置菜单要用的数据
        const menu = {
          name: item.menu_name,
          path: route.path,
          icon: item.icon
        }
        // 对 visualization 特殊处理
        if (item.node === 'visualization') {
          newRouter.push(indexRoute(route))
        } else {
          newRouter.push(route)
        }
        menuList.push(menu)
        // 递归子节点
        if (item.children && item.children.length) {
          route.children = []
          menu.children = []
          deepCreate(item.children, route.children, menu.children)
        }
      }
    })
  }
  deepCreate(data, newRouter, menuList)
  // 添加 重定向 404
  newRouter.push({ path: '*', redirect: '/404' },)
  return { newRouter, menuList }
}
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
            const { newRouter, menuList } = createRouter(res)
            // 添加路由
            router.addRoutes(newRouter)
            // 设置菜单数据
            store.dispatch('setMenus', menuList)
            next({ ...to, replace: true })



            // let menus = [
            //   { name: 'sou' }, //包含了资源设置
            //   { name: 'homeClassifi' }, //资源分类>首页分类
            //   { name: 'classifiSetting' }, //资源设置>分类设置
            //   { name: 'courseManage' }, //资源设置>课程管理
            //   { name: 'textbookManage' }, //资源设置>教材管理
            //   { name: 'textbookRecord' }, //资源设置>教材管理>教材记录
            //   { name: 'projectManage' }, //资源设置>项目管理
            //   { name: 'warehouseManage' }, //资源设置>仓库管理
            //   { name: 'agency' }, //资源设置>推荐机构
            //   { name: 'schoolManage' }, //资源设置>校区管理
            //   { name: 'classroomManage' }, //资源设置>教室管理
            //   { name: 'customField' }, //资源管理>自定义字段
            //   { name: 'businessTemplate' }, //资源管理>业务模板
            //   { name: 'etm' }, //包含了招生管理
            //   { name: 'customerManage' }, //招生管理>客户管理
            //   { name: 'customeRegist' }, //招生管理>客户管理>客户报名
            //   { name: 'customerDetail' }, //招生管理>客户管理>客户报名>客户详情
            //   { name: 'orderDetail' }, //招生管理>客户管理>客户报名>订单详情
            //   { name: 'seaCustomer' }, //招生管理>公海客户
            //   { name: 'visualization' }, //工作台
            //   { name: 'eda' }, //包含了教务管理
            //   { name: 'studentCenter' }, //教务管理>学生中心
            //   { name: 'studentDetail' }, //教务管理>学生中心>学生详情
            //   { name: 'classManage' }, //教务管理>班级管理
            //   { name: 'attendanceManage' }, //教务管理>考勤管理
            //   // { name: 'learnerManage' }, //教务管理>班级管理>学生管理
            //   { name: 'addStudent' }, //教务管理>班级管理>学生管理>添加学生
            //   { name: 'teachMaterial' }, //教务管理>教材发放
            //   { name: 'teachSchedule' }, //教务管理>排课管理

            //   { name: 'exa' }, //考务管理
            //   { name: 'teachingManage' }, //考务管理>授课老师
            //   { name: 'examination' },
            //   { name: 'apply' },
            //   { name: 'achievement' },
            //   { name: 'graduation' },
            //   { name: 'createplan' },
            //   { name: 'fina' }, //财务管理
            //   { name: 'finance' }, //订单管理
            //   { name: 'order' },
            //   { name: 'certificates' }, // 证件资料
            //   { name: 'finance' }, //财务管理>订单管理
            //   { name: 'order' }, //财务管理>订单审批
            //   { name: 'orderDetail' }, //财务管理>订单审批>订单详情
            //   { name: 'cusdetail' }, //财务管理>订单管理>客户详情
            //   { name: 'set' }, //系统设置
            //   { name: 'imgSpace' },
            //   { name: 'role' }, //系统设置>角色权限
            //   { name: 'staff' }, //系统设置>员工管理
            //   { name: 'roledetail' }, //系统设置>角色权限>添加角色
            //   { name: 'menumanage' }, //系统设置>菜单管理
            //   { name: 'notice' }, //系统设置>通知公告
            //   { name: 'operationLog' }, //系统设置>操作记录
            // ]

            // let username = 'account'
            // store.dispatch('GenerateRoutes', { username, menus }).then(() => {
            //   // 生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   next({ ...to, replace: true })
            // })
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
