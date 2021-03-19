/**
 * 资源配置相关
 */
import request from '@/utils/request'

// 教材管理=======
/**
 * 获取教材管理列表
 */
export function getBookList(params) {
  return request({
    url: '/books/index',
    method: 'get',
    params,
  })
}
/**
 * 新增教材
 * @param {*} data
 */
export function addBook(data) {
  return request({
    url: '/books/create',
    method: 'post',
    data,
  })
}
/**
 * 编辑教材
 * @param {*} data
 */
export function editBook(data) {
  return request({
    url: '/books/editbook',
    method: 'post',
    data,
  })
}
/**
 * 根据id获取教材详情
 * @param {*} data
 */
export function getBookById(params) {
  return request({
    url: '/books/editbook',
    method: 'get',
    params,
  })
}
/**
 * 获取分类选项
 * @param {*} data
 */
export function getCateList(params) {
  return request({
    url: '/courseCategory/getcategorytree',
    method: 'get',
    params,
  })
}
// 课程管理=======
/**
 * 获取课程管理列表
 */
export function getCourseList(params) {
  return request({
    url: '/course/index',
    method: 'get',
    params,
  })
}
/**
 * 添加课程
 * @param {*} data
 */
export function addCourse(data) {
  return request({
    url: '/course/add',
    method: 'post',
    data,
  })
}
/**
 *修改课程
 * @param {*} data
 */
export function editCourse(data) {
  return request({
    url: '/course/modify',
    method: 'post',
    data,
  })
}
