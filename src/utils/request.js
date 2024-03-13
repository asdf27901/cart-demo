import axios from 'axios'

// 创建axios实例，多个实例互不影响
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 2000
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (typeof token !== 'undefined') {
    config.headers.token = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default request
