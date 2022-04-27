import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setStaff_id(Staff_id) {
  return Cookies.set('Staff_id', Staff_id)
}

export function getStaff_id() {
  return Cookies.get('Staff_id')
}