import axios from 'axios'

// 创建axios实例，多个实例互不影响
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 2000
})

instance.interceptors.request.use(config => {

}, error => Promise.reject(error))

instance.interceptors.response.use(response => {

}, error => Promise.reject(error))

export default instance
