import request from '@/utils/request'

export const addCard = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'post',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}

export const cartCount = () => {
  return request({
    url: '/cart/total'
  })
}
