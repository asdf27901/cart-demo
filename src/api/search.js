import request from '@/utils/request'

export const searchGood = async (goodName) => {
  return request({
    url: '/goods/list',
    method: 'get',
    params: {
      goodsName: goodName
    }
  })
}
