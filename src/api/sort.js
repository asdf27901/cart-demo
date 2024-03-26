import request from '@/utils/request'

export const fetchSortList = () => {
  return request({
    method: 'get',
    url: '/category/list'
  })
}
