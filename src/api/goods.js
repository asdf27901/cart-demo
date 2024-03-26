import request from '@/utils/request'

export const fetchGoodDetail = (goodsId) => {
  return request({
    method: 'get',
    url: '/goods/detail',
    params: {
      goodsId
    }
  })
}
