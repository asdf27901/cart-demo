import request from '@/utils/request'

export const fetchHomeDetail = () => {
  return request({
    url: '/page/detail',
    params: {
      pageId: 0
    }
  })
}
