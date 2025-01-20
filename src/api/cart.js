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

export const fetchCartList = () => {
  return request({
    url: '/cart/list'
  })
}

export const updateCart = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/update',
    method: 'post',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}

export const deleteCartIds = cartIds => {
  return request({
    url: '/cart/clear',
    method: 'post',
    data: {
      cartIds
    }
  })
}
