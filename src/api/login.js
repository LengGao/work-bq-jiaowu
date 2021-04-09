import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}



export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
//添加菜单
export function createMenuData(data) {
  return request({
    url: '/AdminMenu/createMenuData',
    method: 'post',
    data: data
  })
}
//修改菜单
export function updateMenuData(data) {
  return request({
    url: '/AdminMenu/updateMenuData',
    method: 'post',
    data: data
  })
}
//修改页面是否在菜单显示
export function updateShowStatus(data) {
  return request({
    url: '/AdminMenu/updateShowStatus',
    method: 'post',
    data: data
  })
}
// 获取任务列表
export function getAdminQueueList(params) {
  return request({
    url: '/AdminQueueRecord/getAdminQueueList',
    method: 'get',
    params
  })
}
// 未读任务数量
export function getUnreadCount(params) {
  return request({
    url: '/AdminQueueRecord/getUnreadCount',
    method: 'get',
    params
  })
}
export const baseUrl = process.env.NODE_ENV === "development" ? 'http://sc.dp.com' : ''
// 获取菜单
export function getMenu(params) {
  return request({
    url: '/staff/getMenu',
    method: 'get',
    params
  })
}
// 登出
export function logout(params) {
  return request({
    url: '/passport/logout',
    method: 'get',
    params
  })
}
