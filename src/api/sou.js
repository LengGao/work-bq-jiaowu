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
 * 
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
/
 
 * 分类设置列表
 */
export function getCategoryList(params) {
  return request({
    url: '/courseCategory/getcategorytree',
    method: 'get',
    params,
  })
}
/**
 *  添加分类列表
 */
export function insertCategory(data) {
  return request({
    url: '/courseCategory/insertCategory',
    method: 'post',
    data,
  })
}
/**
 * 
 * /**
 *  编辑分类列表
 */
export function updateCategory(data) {
  return request({
    url: '/courseCategory/updateCategory',
    method: 'post',
    data,
  })
}
/**
 * 
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
 * 库存详情
 * @param {*} params
 */
export function getbookinstorage(params) {
  return request({
    url: '/books/getbookinstorage',
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

/**
 *修改课程
 * @param {*} data
 */
export function getCoursesDetail(params) {
  return request({
    url: '/course/info',
    method: 'get',
    params,
  })
}
/**
 *是否上架
 * @param {*} data
 */
export function bashPublish(data) {
  return request({
    url: '/course/bashPublish',
    method: 'post',
    data,
  })
}

/**
 * 添加仓库
 * @param {*} data
 */
export function addstorage(data) {
  return request({
    url: '/storage/addstorage',
    method: 'post',
    data,
  })
}
/**
 * 获取仓库列表
 * @param {*} data
 */
export function getStorageList(params) {
  return request({
    url: '/storage/index',
    method: 'get',
    params,
  })
}

/**
 * 编辑仓库
 * @param {*} data
 */
export function editstorage(data) {
  return request({
    url: '/storage/editstorage',
    method: 'post',
    data,
  })
}
/**
 * 仓库日志
 */
export function getstoragelog(params) {
  return request({
    url: '/storage/getstoragelog',
    method: 'get',
    params,
  })
}
/**
 * 根据id获取仓库详情
 * @param {*} data
 */
export function getStorageById(params) {
  return request({
    url: '/storage/editstorage',
    method: 'get',
    params,
  })
}
/**
 * 获取机构选项
 */
export function getInstitutionSelectData() {
  return request({
    url: '/staff/getInstitutionSelectData',
    method: 'get',
  })
}
/**
 * 教材入库
 */
export function textbooksputstorage(data) {
  return request({
    url: '/books/textbooksputstorage',
    method: 'post',
    data,
  })
}
/**
 * 根据仓库查教材
 */
export function getstoragebook(params) {
  return request({
    url: '/storage/getstoragebook',
    method: 'get',
    params,
  })
}
/**
 * 库存调拨
 * @param {*} data
 */
export function mobilizestorage(data) {
  return request({
    url: '/books/mobilizestorage',
    method: 'post',
    data,
  })
}
//获取仓库下拉列表
export function getStorageOptions() {
  return request({
    url: '/storage/getstoragelist',
    method: 'get',
  })
}
