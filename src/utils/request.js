import axios from 'axios'
import { Toast } from 'vant'
// import store from '@/store'

// 创建axios实例，多个实例互不影响
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 2000
})

request.interceptors.request.use(config => {
  // 发起请求前添加loading弹窗
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })
  // 如果本地存在token，则将token放入请求头中
  const token = localStorage.getItem('token')
  if (typeof token !== 'undefined') {
    config.headers.token = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  console.log(response.data)
  Toast.clear(true) // 关闭所有弹窗，主要是loading弹窗
  return response.data
}, error => {
  return Promise.reject(error)
})

export default request
