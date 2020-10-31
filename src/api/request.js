import axios from 'axios'
import { Notification } from 'element-ui'

const baseURL = 'http://172.22.238.38:8080'
// const baseURL = 'http://192.168.31.128:8080/crm'
// const baseURL = 'http://baizitech.com:8080/baizi-crm'

const service = axios.create({
  baseURL,
  timeout: 0,
  method: 'post'
})

// service.interceptors.request.use(config => {
//   let token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// })

service.interceptors.response.use(response => {
  let data = response.data
  console.log(data)
  // console.log(typeof data)
  if (data.status === 1) {
    return {
      data: response.data.data,
      totalNum: data.totalNum
    }
  } else {
    Notification.warning({ title: '提示', message: data.message })
  }
}, error => {
  if (error.response) {
    let html = error.response.data
    let verifyWindow = window.open('', '_blank', 'height=400,width=560')
    verifyWindow.document.write(html)
    verifyWindow.document.getElementById('baseUrl').value = baseURL
  } else {
    Notification.warning({ title: '提示', message: '请求超时或服务器错误' })
    return Promise.reject(new Error('请求超时或服务器错误'))
  }
})

export default service
