import store from './index'
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userRouter: state => state.user.userRouter,
  userInfo: state => state.user.userInfo,
  identity: state => state.user.identity,
  menus: state => state.user.menus,
  msgCount: state => state.user.msgCount,
  helpUrl: state => state.app.helpUrl,
  cacheArr: state => Array.from(state.cacheView.currentCache),
  expenseType: (state) => {
    if (!state.options.expenseType) {
      store.dispatch('getPlanTypeList')
    }
    return state.options.expenseType || {}
  }
}
export default getters
