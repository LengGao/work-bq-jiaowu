/**
 * 系统配置相关
 */
import request from '@/utils/request'

// 教材管理=======
/**
 * 获取教材管理列表
 */
export function getRoleList(params) {
  return request({
    url: '/role/index',
    method: 'get',
    params,
  })
}
