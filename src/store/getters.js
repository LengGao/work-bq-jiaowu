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
  getCache: state => (routeName) => state.searchCache.cache.get(routeName),
  hasCache: state => (routeName) => state.searchCache.cache.has(routeName)
}
export default getters
