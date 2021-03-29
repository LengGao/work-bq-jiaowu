import request from '@/utils/request'

 //考试科目列表
export function subjectList(params){
  return request({
    url: '/Examination/subjectList',
    method: 'get',
    params
})
}
