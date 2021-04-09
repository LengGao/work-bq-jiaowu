const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userRouter: state => state.user.userRouter,
  identity: state => state.user.identity,
  menus: state => state.user.menus,
  msgCount: state => state.user.msgCount
}
export default getters
