import axios from 'axios'
import { Notification } from 'element-ui'
import router from '@/router/index.js'

const baseURL = 'https://crm.baizitech.com/crm'
// const baseURL = 'http://192.168.31.128:8080/crm'
// const baseURL = 'http://baizitech.com:8080/baizi-crm'

const service = axios.create({
  baseURL,
  timeout: 10 * 1000,
  method: 'post'
})

// service.interceptors.request.use(config => {
//   let token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// })

// service.interceptors.response.use(response => {
//   let data = response.data
//   console.log(data)
//   // console.log(typeof data)
//   if (data.size || typeof data === 'string') {
//     return data
//   }
//   if (data.code === 200) {
//     return response.data.data
//   } else if (data.code === 401 || data.code === -1) {
//     Notification.warning({ title: '提示', message: data.msg })
//     return Promise.reject(new Error(data.msg))
//   } else {
//     Notification.warning({ title: '提示', message: '登录凭证过期，请重新登录' })
//     localStorage.clear()
//     router.push('/login')
//     return Promise.reject(new Error('登录凭证过期，请重新登录'))
//   }
// }, error => {
//   if (error.response && error.response.status === 509) {
//     let html = error.response.data
//     let verifyWindow = window.open('', '_blank', 'height=400,width=560')
//     verifyWindow.document.write(html)
//     verifyWindow.document.getElementById('baseUrl').value = baseURL
//   } else {
//     Notification.warning({ title: '提示', message: '请求超时或服务器错误' })
//     return Promise.reject(new Error('请求超时或服务器错误'))
//   }
// })

export default service
