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
 *  删除分类
 */
export function deleteCategory(data) {
  return request({
    url: '/courseCategory/deleteCategory',
    method: 'post',
    data,
  })
}

/**
 *  分类排序
 */
export function updateCategorySort(data) {
  return request({
    url: '/courseCategory/updateCategorySort',
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
/**
 * 教室使用情况
 * @param {*} data
 */
//
export function schoolroomUsage(params) {
  return request({
    url: 'Schoolroom/schoolroomUsage',
    method: 'get',
    params,
  })
}
/**
 * 题库分页列表
 * @param {*} data
 */
//
export function getQuesbank(params) {
  return request({
    url: '/questionBank/getPageList',
    method: 'get',
    params,
  })
}
/**
 * 题库分页列表
 * @param {*} data
 */
//
export function getSchoolList(params) {
  return request({
    url: 'School/list',
    method: 'get',
    params,
  })
}
/**
 * 删除课程
 * @param {*} data
 */
//
export function deleteCourses(data) {
  return request({
    url: '/course/delete',
    method: 'post',
    data,
  })
}
/**
 * 视屏集
 * @param {*} param
 */
//
export function videocollectionlist(params) {
  return request({
    url: '/video/videocollectionlist',
    method: 'get',
    params,
  })
}
/**
 * 视屏集详情
 * @param {*} param
 */
//
export function editvideocollection(params) {
  return request({
    url: '/video/editvideocollection',
    method: 'get',
    params,
  })
}
/**
 * 是否允许快进
 * @param {*} param
 */
//
export function modifyvideocollection(params) {
  return request({
    url: '/video/editvideocollection',
    method: 'post',
    params,
  })
}
/**
 * 关联题库
 * @param {*} param
 */
//
export function getProblemCourseList(params) {
  return request({
    url: '/problem/getProblemCourseList',
    method: 'get',
    params,
  })
}

/**
 * 排课管理列表
 * @param {*} param
 */
//
export function getTimetableList(params) {
  return request({
    url: '/arrange/classroomList',
    method: 'get',
    params,
  })
}
// 题库列表
export function getQuestionBankList(params) {
  return request({
    url: '/questionBank/getPageList',
    method: 'get',
    params,
  })
}
// 更新题库状态
export function updateQuestionBankStatus(data) {
  return request({
    url: '/questionBank/status',
    method: 'post',
    data,
  })
}
// 删除题库
export function deleteQuestionBank(data) {
  return request({
    url: 'questionBank/deleted',
    method: 'post',
    data,
  })
}
// 添加题库
export function addQuestionBank(data) {
  return request({
    url: 'questionBank/insert',
    method: 'post',
    data,
  })
}
// 添加题库
export function updateQuestionBank(data) {
  return request({
    url: 'questionBank/modify',
    method: 'post',
    data,
  })
}
// 题库详情
export function questionBankDetail(params) {
  return request({
    url: '/questionBank/info',
    method: 'get',
    params,
  })
}
// 章节列表
export function getvideochapterList(params) {
  return request({
    url: 'video/getvideochapter',
    method: 'get',
    params,
  })
}
// 章节删除
export function deletevideochapter(data) {
  return request({
    url: 'video/deletevideochapter',
    method: 'post',
    data,
  })
}

// 添加视频章节
export function addvideochapter(data) {
  return request({
    url: 'video/addvideochapter',
    method: 'post',
    data,
  })
}
// 编辑视频章节
export function editvideochapter(data) {
  return request({
    url: 'video/editvideochapter',
    method: 'post',
    data,
  })
}
// 根据id获取视频章节
export function getVideochapterDetail(params) {
  return request({
    url: 'video/editvideochapter',
    method: 'get',
    params,
  })
}
// 章节列表-添加课时
export function addvideoclass(data) {
  return request({
    url: 'video/addvideoclass',
    method: 'post',
    data,
  })
}
// 章节列表-编辑课时
export function editvideoclass(data) {
  return request({
    url: 'video/editvideoclass',
    method: 'post',
    data,
  })
}
// 章节列表-课时详情
export function getvideoclassDetail(params) {
  return request({
    url: 'video/editvideoclass',
    method: 'get',
    params,
  })
}
// 阿里云上传凭证
export function updatecreate(data) {
  return request({
    url: 'live/updatecreate',
    method: 'post',
    data,
  })
}
// 阿里云上传凭证刷新
export function refreshuploadvideo(data) {
  return request({
    url: 'live/refreshuploadvideo',
    method: 'post',
    data,
  })
}
// 获取课时
export function getvideoclass(params) {
  return request({
    url: 'video/getvideoclass',
    method: 'get',
    params,
  })
}
// 删除课时
export function deletevideoclass(data) {
  return request({
    url: 'video/deletevideoclass',
    method: 'post',
    data,
  })
}
// 章节排序
export function videoChapterSort(data) {
  return request({
    url: 'batchSort/VideoChapter',
    method: 'post',
    data,
  })
}
// 课程资料列表
export function getCourseMaterialList(params) {
  return request({
    url: '/courseFile/fileList',
    method: 'get',
    params,
  })
}
// 删除课程资料
export function deleteCourseMaterial(data) {
  return request({
    url: 'courseFile/deleteFile',
    method: 'post',
    data,
  })
}
// 添加课程资料
export const addCourseMaterial = `${process.env.VUE_APP_LOACTION}/courseFile/appendFile`
// 修改课程资料
export const updateCourseMaterial = `${process.env.VUE_APP_LOACTION}/courseFile/updateFile`
// 课程资料详情
export function getCourseMaterialDetail(params) {
  return request({
    url: '/courseFile/flieInfo',
    method: 'get',
    params,
  })
}