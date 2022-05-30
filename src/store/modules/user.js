import {
  getToken,
  setToken,
  removeToken,
  setStaff_id,
  getStaff_id,
} from '@/utils/auth'
import { getIdentity } from "@/api/workbench.js";
import { getUnreadCount, getMenu, logout, login } from "@/api/login";
import defaultRouter, { resetRouter, createUserRouter } from '@/router'
const userInfoJson = localStorage.getItem('userInfo')
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: userInfoJson ? JSON.parse(userInfoJson) : {},
    identity: '', // 用户身份 1教务 2招生 3老师 4财务 5管理员
    msgCount: 0,// 任务中心未读数量
    userRouter: [],
    menus: [],
    isBindPhone: true,
    showBindPhoneDialog: false,
  },

  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
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
    },
    SET_IS_BIND_PHONE: (state, isBindPhone) => {
      state.isBindPhone = isBindPhone
      if (!isBindPhone) {
        state.showBindPhoneDialog = true
      }
    },
    SET_BIND_SHOW: (state, isShow) => {
      state.showBindPhoneDialog = isShow
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
    async Login({ commit }, userInfo) {
      const data = {
        Account: userInfo.username,
        Password: userInfo.password,
      }
      const res = await login(data).catch(() => {
        return Promise.reject()
      })
      if (res.code === 0) {
        const data = res.data || {}
        const tokenStr = data?.token || ''
        const userData = data?.info || {}
        setToken(tokenStr)
        setStaff_id(data?.info?.staff_id)
        localStorage.setItem('userInfo', JSON.stringify(userData))
        commit('SET_USER_INFO', userData)
        commit('SET_TOKEN', tokenStr)
        return Promise.resolve()
      }
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
        localStorage.removeItem("userInfo");
        return Promise.resolve(res)
      }
    },
    // 获取用户身份并保存
    async setIdentity({ commit }) {
      const res = await getIdentity()
      const identity = res.data?.identity || ''
      const isBindPhone = res.data?.bind !== 0
      commit('SET_IDENTITY', identity)
      commit('SET_IS_BIND_PHONE', isBindPhone)
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_USER_ROUTERS', [])
        commit('SET_MENUS', [])
        removeToken()
        localStorage.removeItem("userInfo");
        resolve()
      })
    },
  },
}

export default user
