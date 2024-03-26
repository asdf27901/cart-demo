import request from '@/utils/request'

export const fetchCommentList = (goodsId, limit = 3) => {
  return request({
    method: 'get',
    url: '/comment/listRows',
    params: {
      goodsId,
      limit
    }
  })
}

export const fetchCommentTotalCount = (goodsId) => {
  return request({
    method: 'get',
    url: '/comment/total',
    params: {
      goodsId
    }
  })
}
