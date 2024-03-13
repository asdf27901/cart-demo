import request from '@/utils/request'

export const getCaptchaCode = () => {
  return request({
    url: '/captcha/image',
    method: 'get',
    headers: {
      platform: 'H5'
    }
  })
}

export const getSmsCode = (params) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'post',
    headers: {
      platform: 'H5'
    },
    data: {
      form: params
    }
  })
}
