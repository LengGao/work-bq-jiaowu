const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userRouter: state => state.permission.userRouter,
  identity: state => state.user.identity,
  menus: state => state.permission.menus,
  msgCount: state => state.user.msgCount
}
export default getters
