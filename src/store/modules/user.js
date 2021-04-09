import {
  getToken,
  setToken,
  removeToken,
  setStaff_id,
  getStaff_id,
} from '@/utils/auth'
import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import { getIdentity } from "@/api/workbench.js";
import { getUnreadCount, getMenu, logout } from "@/api/login";
import defaultRouter, { resetRouter, createUserRouter } from '@/router'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    identity: '', // 用户身份 1教务 2招生 3老师 4财务 5管理员
    msgCount: 0,// 任务中心未读数量
    userRouter: [],
    menus: []
  },

  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER_ROUTERS: (state, routers) => {
      state.userRouter = routers
    },
    SET_MSG_COUNT(state, val) {
      state.msgCount = val
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_IDENTITY: (state, identity) => {
      state.identity = identity
    }
  },

  actions: {
    // 获取用户路由+权限菜单
    async setRouterAndMenu({ commit }) {
      const res = await getMenu()
      if (res.code === 0) {
        // 重置路由
        resetRouter()
        // 跟进接口返回点数据生成菜单和路由
        const { userRouter, menuList } = createUserRouter(res.data);
        // 修改state里的路由数据和菜单数据
        commit('SET_USER_ROUTERS', userRouter)
        commit('SET_MENUS', menuList)
        // 路由添加
        defaultRouter.addRoutes(userRouter)
        return Promise.resolve(userRouter)
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // msg 未读数量
    async getUnreadCount({ commit }) {
      const data = {};
      const res = await getUnreadCount(data);
      if (res.code === 0) {
        res.data.count;
        commit('SET_MSG_COUNT', res.data?.count || 0)
      }
    },
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        let config = {
          Account: username,
          Password: userInfo.password,
        }
        console.log(config)
        axiosHttp({
          url: url.login,
          data: config,
          method: 'POST',
          then(res) {
            const tokenStr = res.data.data.token
            setToken(tokenStr)
            setStaff_id(res.data.data.info.staff_id)
            commit('SET_TOKEN', tokenStr)
            resolve()
          },
        })
      })
    },
    // 登出
    async logout({ commit }) {
      const data = {
        staff_id: getStaff_id()
      }
      const res = await logout(data)
      if (res.code === 0) {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_USER_ROUTERS', [])
        commit('SET_MENUS', [])
        return Promise.resolve(res)
      }
    },
    // 获取用户身份并保存
    async setIdentity({ commit }) {
      const res = await getIdentity()
      const identity = res.data?.identity || ''
      commit('SET_IDENTITY', identity)
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_USER_ROUTERS', [])
        commit('SET_MENUS', [])
        removeToken()
        resolve()
      })
    },
  },
}

export default user
