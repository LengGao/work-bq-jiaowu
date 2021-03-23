import defaultRouter, { asyncRouterMap, indexRoute, resetRouter } from '@/router'
//判断是否有权限访问该菜单
function hasPermission(menus, route) {
  if (route.name) {
    let currMenu = getMenu(route.name, menus)
    if (currMenu != null) {
      //设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title
      }
      if (currMenu.icon != null && currMenu.title !== '') {
        route.meta.icon = currMenu.icon
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0
      }
      if (currMenu.sort != null && currMenu.sort !== '') {
        route.sort = currMenu.sort
      }
      return true
    } else {
      route.sort = 0
      if (route.hidden !== undefined && route.hidden === true) {
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}

//根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i]
    if (name === menu.name) {
      return menu
    }
  }
  return null
}

//对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    let router = accessedRouters[i]
    if (router.children && router.children.length > 0) {
      router.children.sort(compare('sort'))
    }
  }
  accessedRouters.sort(compare('sort'))
}

//降序比较函数
function compare(p) {
  return function (m, n) {
    let a = m[p]
    let b = n[p]
    return b - a
  }
}

// 根据接口返回的数据创建路由
const createUserRouter = (data) => {
  const userRouter = []
  const menuList = []
  const deepCreate = (data, userRouter, menuList) => {
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
          userRouter.push(indexRoute(route))
        } else {
          userRouter.push(route)
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
  deepCreate(data, userRouter, menuList)
  // 添加 重定向 404
  userRouter.push({ path: '*', redirect: '/404' },)
  return { userRouter, menuList }
}


const permission = {
  state: {
    userRouter: [],
    menus: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER_ROUTERS: (state, routers) => {
      console.log(routers)
      state.userRouter = routers
    },
  },
  actions: {
    setMenus({ commit }, menus) {
      commit('SET_MENUS', menus)
    },
    addRouter({ commit }, router) {
      console.log(defaultRouter)
      defaultRouter.addRoutes(router)
      commit('SET_USER_ROUTERS', router)
    },
    resetRouter({ commit }, router) {
      resetRouter()
      defaultRouter.addRoutes(router)
      commit('SET_USER_ROUTERS', router)
    }

  },
}

export default permission
