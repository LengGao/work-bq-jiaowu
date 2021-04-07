import {
  getToken,
  setToken,
  removeToken,
  setStaff_id,
  getStaff_id,
} from '@/utils/auth'
import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
import { getIdentity } from "@/api/workbench.js";
import { getUnreadCount } from "@/api/login";
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    identity: '', // 用户身份 1教务 2招生 3老师 4财务 5管理员
    msgCount: 0,// 任务中心未读数量
  },

  mutations: {
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
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_IDENTITY: (state, identity) => {
      state.identity = identity
    }
  },

  actions: {
    // 
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
    // 获取用户身份并保存
    async setIdentity({ commit }) {
      const res = await getIdentity()
      const identity = res.data?.identity || ''
      commit('SET_IDENTITY', identity)
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // let err = [1, 2, 3, 4]
        // commit('SET_ROLES', err)
        // resolve(err)
        axiosHttp({
          url: url.getMenu,
          // data: config,
          method: 'GET',
          then(res) {
            if (res.data.data && res.data.data.length > 0) {
              commit('SET_ROLES', res.data.data)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            resolve(res.data.data)
          },
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        let config = {
          staff_id: getStaff_id(),
        }
        axiosHttp({
          url: url.logout,
          data: config,
          method: 'GET',
          then(res) {
            let data = res.data.data
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          },
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  },
}

export default user
