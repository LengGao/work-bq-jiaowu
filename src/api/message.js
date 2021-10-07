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
 export function createNotice(params) {
  return request({
    url: '/ClassroomMessage/createNotice',
    method: 'get',
    params,
  })
}

/**
 * 编辑机构通知
 */
 export function updateNotice(params) {
  return request({
    url: '/ClassroomMessage/updateNotice',
    method: 'get',
    params,
  })
}
/**
 * 删除机构通知
 */
 export function deleteNotice(params) {
  return request({
    url: '/ClassroomMessage/deleteNotice',
    method: 'get',
    params,
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