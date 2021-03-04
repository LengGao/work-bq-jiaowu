const page = {
  state: {
    pageNum: 1,
  },

  mutations: {
    SET_PAGENUM: (state, page) => {
      console.log(page)
      state.pageNum = page
    },
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     let config = {
    //       Account: username,
    //       Password: userInfo.password,
    //     }
    //     console.log(config)
    //     axiosHttp({
    //       url: url.login,
    //       data: config,
    //       method: 'POST',
    //       then(res) {
    //         const tokenStr = res.data.data.token
    //         setToken(tokenStr)
    //         setStaff_id(res.data.data.info.staff_id)
    //         commit('SET_TOKEN', tokenStr)
    //         resolve()
    //       },
    //     })
    //   })
    // },
  },
}

export default page
