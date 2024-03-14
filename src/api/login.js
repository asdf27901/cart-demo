import request from '@/utils/request'

export const fetchCaptchaCode = () => {
  return request({
    url: '/captcha/image',
    method: 'get',
    headers: {
      platform: 'H5'
    }
  })
}

export const fetchSmsCode = (params) => {
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

export const login = (params) => {
  return request({
    url: '/passport/login',
    method: 'post',
    headers: {
      platform: 'H5'
    },
    data: {
      form: params
    }
  })
}
