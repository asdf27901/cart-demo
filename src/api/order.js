import request from '@/utils/request'

export const getStatusOrderList = (dataType, page) => {
  return request({
    url: '/order/list',
    params: {
      dataType,
      page
    }
  })
}
