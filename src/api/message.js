/**
 * 消息通知部分
 */
import request from '@/utils/request'

/**
 * 微信通知列表
 */
export function getMessageList(params) {
  return request({
    url: '/ClassroomMessage/getMessageList',
    method: 'get',
    params,
  })
}

/**
* 创建微信消息
*/
export function createMessage(params) {
  return request({
    url: '/ClassroomMessage/createMessage',
    method: 'get',
    params,
  })
}
/**
 * 删除微信消息
 */
export function deleteMessage(params) {
  return request({
    url: '/ClassroomMessage/deleteMessage',
    method: 'get',
    params,
  })
}

/**
 * 编辑微信消息
 */
export function updateMessage(params) {
  return request({
    url: '/ClassroomMessage/updateMessage',
    method: 'get',
    params,
  })
}
/**
* 发送消息
*/
export function sendMessage(params) {
  return request({
    url: '/ClassroomMessage/sendMessage',
    method: 'get',
    params,
  })
}

// 微信消息发送记录列表
export function getMessageRecordList(params) {
  return request({
    url: '/ClassroomMessage/getMessageRecordList',
    method: 'get',
    params,
  })
}

/**
* 机构通知列表
*/
export function getNoticeList(params) {
  return request({
    url: '/ClassroomMessage/getNoticeList',
    method: 'get',
    params,
  })
}

/**
 * 添加机构通知
 */
export function createNotice(data) {
  return request({
    url: '/ClassroomMessage/createNotice',
    method: 'post',
    data,
  })
}

/**
 * 编辑机构通知
 */
export function updateNotice(data) {
  return request({
    url: '/ClassroomMessage/updateNotice',
    method: 'post',
    data,
  })
}
/**
 * 删除机构通知
 */
export function deleteNotice(data) {
  return request({
    url: '/ClassroomMessage/deleteNotice',
    method: 'post',
    data,
  })
}
/**
 * 发送机构通知
 */
export function sendNotice(params) {
  return request({
    url: '/ClassroomMessage/sendNotice',
    method: 'get',
    params,
  })
}

/**
 * 机构通知发送详情列表
 */
export function getNoticeRecordList(params) {
  return request({
    url: '/ClassroomMessage/getNoticeRecordList',
    method: 'get',
    params,
  })
}

/**
 * 跟进记录列表
 */
export function getFollowPage(params) {
  return request({
    url: '/StaffFollow/getFollowPage',
    method: 'get',
    params,
  })
}
// 班级短信列表
export function getClassroomMessageList(params) {
  return request({
    url: '/ClassroomMessage/getClassroomMessageList',
    method: 'get',
    params,
  })
}
// 班级短信列表
export function getClassroomMessageRecordList(params) {
  return request({
    url: '/ClassroomMessage/getClassroomMessageRecordList',
    method: 'get',
    params,
  })
}
// 班级短信列表-添加 type= 1上课通知 2考试通知 3差生提醒
export function createClassroomMessage(data) {
  return request({
    url: '/ClassroomMessage/createClassroomMessage',
    method: 'post',
    data,
  })
}
// 班级短信列表-修改
export function updateClassroomMessage(data) {
  return request({
    url: '/ClassroomMessage/updateClassroomMessage',
    method: 'post',
    data,
  })
}
// 班级短信列表-学生选项
export function getClassroomMessageUserSelect(params) {
  return request({
    url: '/ClassroomMessage/getClassroomMessageUserSelect',
    method: 'get',
    params,
  })
}
// 班级短信列表-发送
export function sendClassroomMessage(data) {
  return request({
    url: '/ClassroomMessage/sendClassroomMessage',
    method: 'post',
    data,
  })
}
// 班级短信列表-发送
export function deleteClassroomMessage(data) {
  return request({
    url: '/ClassroomMessage/deleteClassroomMessage',
    method: 'post',
    data,
  })
}
