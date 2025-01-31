import request from '@/utils/request'

export const checkoutOrder = (mode, obj) => {
  return request({
    url: '/checkout/order',
    params: {
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      mode,
      ...obj
    }
  })
}

export const submitOrder = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'post',
    data: {
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      payType: 10,
      mode,
      ...obj
    }
  })
}
