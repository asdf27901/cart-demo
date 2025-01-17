import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建axios实例，多个实例互不影响
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 3000,
  _retryCount: 0,
  retryTime: 3,
  retryDelay: 1000,
  retry_codes: ['ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK']
})

request.interceptors.request.use(config => {
  // 发起请求前添加loading弹窗
  Toast.loading({
    message: config._retryCount > 0 ? '正在重试...请稍后' : '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })
  // 如果本地存在token，则将token放入请求头中
  const token = store.getters['user/token']
  if (token) {
    config.headers['Access-Token'] = token
  }
  config.headers.platform = 'H5'
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  console.log(response.data)
  Toast.clear(true) // 关闭所有弹窗，主要是loading弹窗
  return response.data
}, async error => {
  console.log(error)
  const config = error.config
  // 如果没有配置对象，直接返回异常
  if (!config || !config.retry_codes.includes(error.code)) {
    return Promise.reject(error)
  }
  // 当重试次数大于配置次数，直接返回异常
  if (config._retryCount >= config.retryTime) {
    Toast('重试失败，请刷新页面')
    return Promise.reject(error)
  }
  // 以下代码开始请求重试
  config._retryCount++
  console.log(config._retryCount)
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay)
  })
  return request(config)
})

export default request
