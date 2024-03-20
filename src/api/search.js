import request from '@/utils/request'

export const searchGood = (obj) => {
  return request({
    url: '/goods/list',
    method: 'get',
    params: obj
  })
}
