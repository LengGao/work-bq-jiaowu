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
// 机构题库列表
export function getOrgQuestionBankList(params) {
  return request({
    url: 'Organization/questionBank',
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
export function getChapterList(params) {
  return request({
    url: '/CourseVideo/getChapterList',
    method: 'get',
    params,
  })
}
// 章节删除
export function deleteChapter(data) {
  return request({
    url: '/CourseVideo/deleteChapter',
    method: 'post',
    data,
  })
}

// 添加视频章节
export function createChapter(data) {
  return request({
    url: '/CourseVideo/createChapter',
    method: 'post',
    data,
  })
}
// 编辑视频章节
export function updateChapter(data) {
  return request({
    url: '/CourseVideo/updateChapter',
    method: 'post',
    data,
  })
}

// 章节列表-添加课时
export function createLesson(data) {
  return request({
    url: '/CourseVideo/createLesson',
    method: 'post',
    data,
  })
}
// 章节列表-编辑课时
export function updateLesson(data) {
  return request({
    url: '/CourseVideo/updateLesson',
    method: 'post',
    data,
  })
}
// 章节列表-修改章节视频免费状态
export function batchFreeLesson(params) {
  return request({
    url: '/CourseVideo/batchFreeLesson',
    method: 'get',
    params,
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
export function createUploadVideo(data) {
  return request({
    url: '/VideoRepository/createUploadVideo',
    method: 'post',
    data,
  })
}
// 阿里云上传凭证刷新
export function refreshuploadvideo(data) {
  return request({
    url: '/VideoRepository/refreshUploadVideo',
    method: 'post',
    data,
  })
}

// 获取课时
export function getLessonList(params) {
  return request({
    url: '/CourseVideo/getLessonList',
    method: 'get',
    params,
  })
}
// 删除课时
export function deleteLesson(data) {
  return request({
    url: '/CourseVideo/deleteLesson',
    method: 'post',
    data,
  })
}
// 章节排序
export function batchSortChapter(data) {
  return request({
    url: '/CourseVideo/batchSortChapter',
    method: 'post',
    data,
  })
}
// 课时排序
export function batchSortLesson(data) {
  return request({
    url: '/CourseVideo/batchSortLesson',
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
// 获取视频url
export function getVideoUrlByid(params) {
  return request({
    url: '/video/getVideoUrl',
    method: 'get',
    params,
  })
}
// 添加题库章节
export function addTopicChapter(data) {
  return request({
    url: 'topicChapter/insert',
    method: 'post',
    data,
  })
}
// 修改题库章节
export function updateTopicChapter(data) {
  return request({
    url: 'topicChapter/modify',
    method: 'post',
    data,
  })
}
// 修改题库章节
export function deletedTopicChapter(data) {
  return request({
    url: '/topicChapter/deleted',
    method: 'post',
    data,
  })
}
// 获取题库章节详情
export function getTopicChapterInfo(params) {
  return request({
    url: '/topicChapter/info',
    method: 'get',
    params,
  })
}
// 获取题库章节不分页列表
export function getTopicChapterList(params) {
  return request({
    url: '/topicChapter/list',
    method: 'get',
    params,
  })
}
// 添加子项目
export function createChildSub(data) {
  return request({
    url: '/project/addSubject',
    method: 'post',
    data,
  })
}
// 修改子项目
export function updateChildSub(data) {
  return request({
    url: '/project/changeSub',
    method: 'post',
    data,
  })
}
// 删除子项目
export function deleteSubProject(params) {
  return request({
    url: '/project/deleteSubProject',
    method: 'get',
    params,
  })
}
// 修改子项目状态
export function updateChildProjectStatus(params) {
  return request({
    url: '/project/status',
    method: 'get',
    params,
  })
}
// 根据id获取子项目详情
export function getChildSubDetail(params) {
  return request({
    url: '/project/editSub',
    method: 'get',
    params,
  })
}
// 获取子项目列表
export function getChildSubList(params) {
  return request({
    url: '/project/getSubPro',
    method: 'get',
    params,
  })
}
// 获取项目列表
export function getProjectList(params) {
  return request({
    url: '/project/index',
    method: 'get',
    params,
  })
}
// 移动项目
export function moveProject(data) {
  return request({
    url: '/project/move',
    method: 'post',
    data,
  })
}
// 章节选项
export function getChapterOptions(params) {
  return request({
    url: '/topicChapter/list',
    method: 'get',
    params,
  })
}
// 所有题目列表
export function getAllQuestionList(params) {
  return request({
    url: '/topic/getAllPageList',
    method: 'get',
    params,
  })
}
// 题目列表
export function getQuestionList(params) {
  return request({
    url: '/topic/list',
    method: 'get',
    params,
  })
}

// 添加题目
export function addQuestion(data) {
  return request({
    url: '/topic/insert',
    method: 'post',
    data,
  })
}
// 题目详情
export function getQuestionDetail(params) {
  return request({
    url: '/topic/info',
    method: 'get',
    params,
  })
}
// 删除题目
export function deleteQuestion(data) {
  return request({
    url: '/topic/delete',
    method: 'post',
    data,
  })
}
//批量 删除题目
export function batchDeleteQuestion(data) {
  return request({
    url: '/topic/batchDeleteData',
    method: 'post',
    data,
  })
}
// 修改题目
export function updateQuestion(data) {
  return request({
    url: '/topic/update',
    method: 'post',
    data,
  })
}
//批量 移动题目
export function batchMoveQuestion(data) {
  return request({
    url: '/topic/batchMoveData',
    method: 'post',
    data,
  })
}
// 移动题目
export function moveQuestion(data) {
  return request({
    url: '/topic/move',
    method: 'post',
    data,
  })
}
// 学历形式列表
export function getEducationTypeList(params) {
  return request({
    url: '/UniversityType/page',
    method: 'get',
    params,
  })
}
// 基本配置
export function getConfig(params) {
  return request({
    url: '/test/getConfig',
    method: 'get',
    params,
  })
}
// 添加学历形式
export function addEducationType(data) {
  return request({
    url: '/UniversityType/add',
    method: 'post',
    data,
  })
}
// 设置基本配置
export function setConfig(data) {
  return request({
    url: '/test/setConfig',
    method: 'post',
    data,
  })
}
// 编辑学历形式
export function editEducationType(data) {
  return request({
    url: '/UniversityType/edit',
    method: 'post',
    data,
  })
}
// 编辑学历形式
export function getEducationTypeInfo(params) {
  return request({
    url: '/UniversityType/info',
    method: 'get',
    params,
  })
}
// 删除学历形式
export function delEducationType(data) {
  return request({
    url: '/UniversityType/delete',
    method: 'post',
    data,
  })
}
// 更新学历形式状态
export function updateEducationTypeStatus(data) {
  return request({
    url: '/UniversityType/status',
    method: 'post',
    data,
  })
}
// 更新学历形式排序
export function updateEducationTypeSort(data) {
  return request({
    url: '/UniversityType/sort',
    method: 'post',
    data,
  })
}
// 院校列表
export function getUniversityList(params) {
  return request({
    url: '/University/page',
    method: 'get',
    params,
  })
}
// 添加院校
export function addUniversity(data) {
  return request({
    url: '/University/add',
    method: 'post',
    data,
  })
}
// 编辑院校
export function editUniversity(data) {
  return request({
    url: '/University/edit',
    method: 'post',
    data,
  })
}
// 编辑院校
export function getUniversityInfo(params) {
  return request({
    url: '/University/info',
    method: 'get',
    params,
  })
}
// 删除院校
export function delUniversity(data) {
  return request({
    url: '/University/delete',
    method: 'post',
    data,
  })
}
// 更新院校状态
export function updateUniversityStatus(data) {
  return request({
    url: '/University/status',
    method: 'post',
    data,
  })
}
// 更新院校排序
export function updateUniversitySort(data) {
  return request({
    url: '/University/sort',
    method: 'post',
    data,
  })
}
// 层次列表
export function getUniversityLevelList(params) {
  return request({
    url: '/UniversityLevel/page',
    method: 'get',
    params,
  })
}
// 添加层次
export function addUniversityLevel(data) {
  return request({
    url: '/UniversityLevel/add',
    method: 'post',
    data,
  })
}
// 编辑层次
export function editUniversityLevel(data) {
  return request({
    url: '/UniversityLevel/edit',
    method: 'post',
    data,
  })
}
// 编辑层次
export function getUniversityLevelInfo(params) {
  return request({
    url: '/UniversityLevel/info',
    method: 'get',
    params,
  })
}
// 删除层次
export function delUniversityLevel(data) {
  return request({
    url: '/UniversityLevel/delete',
    method: 'post',
    data,
  })
}
// 更新层次状态
export function updateUniversityLevelStatus(data) {
  return request({
    url: '/UniversityLevel/status',
    method: 'post',
    data,
  })
}
// 更新层次排序
export function updateUniversityLevelSort(data) {
  return request({
    url: '/UniversityLevel/sort',
    method: 'post',
    data,
  })
}
// 专业列表
export function getUniversityMajorList(params) {
  return request({
    url: '/UniversityMajor/page',
    method: 'get',
    params,
  })
}
// 获取详细配置
export function getDetailConfig(params) {
  return request({
    url: '/test/getDetail',
    method: 'get',
    params,
  })
}
// 添加专业
export function addUniversityMajor(data) {
  return request({
    url: '/UniversityMajor/add',
    method: 'post',
    data,
  })
}
// 编辑专业
export function editUniversityMajor(data) {
  return request({
    url: '/UniversityMajor/edit',
    method: 'post',
    data,
  })
}
// 修改详细配置
export function setDetailConfig(data) {
  return request({
    url: '/test/setDetail',
    method: 'post',
    data,
  })
}
// 编辑专业
export function getUniversityMajorInfo(params) {
  return request({
    url: '/UniversityMajor/info',
    method: 'get',
    params,
  })
}
// 删除专业
export function delUniversityMajor(data) {
  return request({
    url: '/UniversityMajor/delete',
    method: 'post',
    data,
  })
}
// 导入题目
export function ReadDoc(data) {
  return request({
    url: '/topic/ReadDoc',
    method: 'post',
    data,
  })
}
// 更新专业状态
export function updateUniversityMajorStatus(data) {
  return request({
    url: '/UniversityMajor/status',
    method: 'post',
    data,
  })
}
// 更新专业排序
export function updateUniversityMajorSort(data) {
  return request({
    url: '/UniversityMajor/sort',
    method: 'post',
    data,
  })
}
// 院校专业列表
export function getUniversityMajorDetailList(params) {
  return request({
    url: '/UniversityMajorDetail/page',
    method: 'get',
    params,
  })
}
// 添加院校专业
export function addUniversityMajorDetail(data) {
  return request({
    url: '/UniversityMajorDetail/add',
    method: 'post',
    data,
  })
}
// 编辑院校专业
export function editUniversityMajorDetail(data) {
  return request({
    url: '/UniversityMajorDetail/edit',
    method: 'post',
    data,
  })
}
// 编辑院校专业
export function getUniversityMajorDetailInfo(params) {
  return request({
    url: '/UniversityMajorDetail/info',
    method: 'get',
    params,
  })
}
// 删除院校专业
export function delUniversityMajorDetail(data) {
  return request({
    url: '/UniversityMajorDetail/delete',
    method: 'post',
    data,
  })
}
// 更新院校专业状态
export function updateUniversityMajorDetailStatus(data) {
  return request({
    url: '/UniversityMajorDetail/status',
    method: 'post',
    data,
  })
}
// 更新院校专业排序
export function updateUniversityMajorDetailSort(data) {
  return request({
    url: '/UniversityMajorDetail/sort',
    method: 'post',
    data,
  })
}
// 学历形式选项
export function getUniversityTypeOptions(params) {
  return request({
    url: '/UniversityType/list',
    method: 'get',
    params,
  })
}
// 院校选项
export function getUniversityOptions(params) {
  return request({
    url: '/University/list',
    method: 'get',
    params,
  })
}
// 层次选项
export function getUniversityLevelOptions(params) {
  return request({
    url: '/UniversityLevel/list',
    method: 'get',
    params,
  })
}
// 专业选项
export function getUniversityMajorOptions(params) {
  return request({
    url: '/UniversityMajor/list',
    method: 'get',
    params,
  })
}
// 上传题目文件
export const importQuestionUrl = `${process.env.VUE_APP_LOACTION}/topic/uploadDoc`

// 视频分组列表
export function getVideoGroupList(data) {
  return request({
    url: '/VideoRepository/getVideoGroupList',
    method: 'post',
    data,
  })
}
// 视频分组-删除
export function deleteGroup(data) {
  return request({
    url: '/VideoRepository/deleteGroup',
    method: 'post',
    data,
  })
}
// 视频分组-添加
export function createGroup(data) {
  return request({
    url: '/VideoRepository/createGroup',
    method: 'post',
    data,
  })
}
// 视频分组-修改
export function updateGroup(data) {
  return request({
    url: '/VideoRepository/updateGroup',
    method: 'post',
    data,
  })
}
// 视频库列表
export function getVideoList(data) {
  return request({
    url: '/VideoRepository/getVideoList',
    method: 'post',
    data,
  })
}
// 视频库列表-操作员列表
export function getAdminSelect(data) {
  return request({
    url: '/VideoRepository/getAdminSelect',
    method: 'post',
    data,
  })
}
// 视频库列表-删除视频
export function deleteVideo(data) {
  return request({
    url: '/VideoRepository/deleteVideo',
    method: 'post',
    data,
  })
}
// 视频库列表-视频分组下拉列表
export function getVideoGroupSelect(data) {
  return request({
    url: '/VideoRepository/getVideoGroupSelect',
    method: 'post',
    data,
  })
}
// 视频库列表-添加视频
export function createVideo(data) {
  return request({
    url: '/VideoRepository/createVideo',
    method: 'post',
    data,
  })
}
// 视频库列表-修改视频
export function updateVideo(data) {
  return request({
    url: '/VideoRepository/updateVideo',
    method: 'post',
    data,
  })
}
// 视频库列表-完善视频信息
export function completeVideoInfo(data) {
  return request({
    url: '/VideoRepository/completeVideoInfo',
    method: 'post',
    data,
  })
}
// 阿里源视频列表
export function getSourceVideoList(data) {
  return request({
    url: '/VideoRepository/getSourceVideoList',
    method: 'post',
    data,
  })
}
// 阿里源视频列表-删除
export function deleteSourceVideo(data) {
  return request({
    url: '/VideoRepository/deleteSourceVideo',
    method: 'post',
    data,
  })
}
// 阿里源视频列表-下载
export function downloadSourceVideo(data) {
  return request({
    url: '/VideoRepository/downloadSourceVideo',
    method: 'post',
    data,
  })
}
// 视频引用详情
export function getVideoUsingDetail(data) {
  return request({
    url: '/VideoRepository/getVideoUsingDetail',
    method: 'post',
    data,
  })
}
// 题目批量排序
export function batchTopicSort(data) {
  return request({
    url: '/topic/batchTopicSort',
    method: 'post',
    data,
  })
}
// 课程视频-认证次数修改
export function batchDetectLesson(data) {
  return request({
    url: '/CourseVideo/batchDetectLesson',
    method: 'post',
    data,
  })
}
// 课程视频-控制快进
export function batchFastLesson(data) {
  return request({
    url: '/CourseVideo/batchFastLesson',
    method: 'post',
    data,
  })
}
// 课程视频-核验记录列表
export function getFaceDetectListForVideo(params) {
  return request({
    url: '/FaceDetect/getFaceDetectListForVideo',
    method: 'get',
    params,
  })
}
// 课程视频-播放统计列表
export function courseVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/courseVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 课程视频-播放统计列表-导出
export function exportCourseVideoStatistics(params) {
  return request({
    url: '/CourseVideo/exportCourseVideoStatistics',
    method: 'get',
    params,
  })
}
// 认证记录删除
export function deleteFaceRecord(data) {
  return request({
    url: '/FaceDetect/deleteRecord',
    method: 'post',
    data,
  })
}
// 课程学生列表课程数据
export function courseUserVideoStatisticsData(params) {
  return request({
    url: 'CourseVideo/courseUserVideoStatisticsData',
    method: 'get',
    params,
  })
}
// 课程学生列表
export function courseUserVideoStatisticsList(params) {
  return request({
    url: 'CourseVideo/courseUserVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 课程学生章节列表
export function courseChapterVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/courseChapterVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 课程学生课时列表
export function courseLessonVideoStatisticsList(params) {
  return request({
    url: '/CourseVideo/courseLessonVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 课程学生列表导出
export function exportCourseUserVideoStatisticsList(params) {
  return request({
    url: 'CourseVideo/exportCourseUserVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 题库统计列表
export function questionStatisticsList(params) {
  return request({
    url: '/questionBank/statistics',
    method: 'get',
    params,
  })
}
// 题库统计列表-数据
export function questionStatisticsData(params) {
  return request({
    url: '/questionBank/getStatisticsNeeded',
    method: 'get',
    params,
  })
}
// 题库下拉列表
export function getSelectList(params) {
  return request({
    url: '/questionBank/getSelectList',
    method: 'get',
    params,
  })
}
// 项目统计列表
export function getProjectStatisticsList(params) {
  return request({
    url: '/project/users',
    method: 'get',
    params,
  })
}
// 监管校验开关
export function updateForCourseJgDetect(data) {
  return request({
    url: '/course/updateForCourseJgDetect',
    method: 'post',
    data,
  })
}
// 导出自主出题
export function exportQuestion(data) {
  return request({
    url: '/ExportIndependent/export',
    method: 'post',
    data,
  })
}
// 自主出题-考试记录
export function getResults(params) {
  return request({
    url: 'questionBank/getResults',
    method: 'get',
    params,
  })
}
// 自主出题-考试记录-详情
export function getResultsDetail(params) {
  return request({
    url: 'questionBank/getTest',
    method: 'get',
    params,
  })
}
// 视频库-生成小程序码
export function getVideoQrcode(params) {
  return request({
    url: 'VideoRepository/getVideoQrcode',
    method: 'get',
    responseType: 'blob',
    params,
  })
}
// 微视频统计
export function getSingleVideoStatisticsList(params) {
  return request({
    url: 'VideoRepository/getSingleVideoStatisticsList',
    method: 'get',
    params,
  })
}
// 添加届别
export function addGrade(data) {
  return request({
    url: '/Crm/tianJiaJieBie',
    method: 'post',
    data,
  })
}
// 删除届别
export function delGrade(data) {
  return request({
    url: '/Crm/shanChuJieBie',
    method: 'post',
    data,
  })
}
// 修改届别
export function updateGrade(data) {
  return request({
    url: '/Crm/xiuGaiJieBie',
    method: 'post',
    data,
  })
}
// 获取届别列表
export function getGradeList(params) {
  return request({
    url: '/Crm/jieBieLieBiao',
    method: 'get',
    params,
  })
}