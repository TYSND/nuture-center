import request from './request.js'

// 获取床位列表
const getBedList = params => request({
  url: '/bed/getAll',
  method: 'get',
  params
})

//新增床位
const addBed = params => request({
  url: '/bed',
  params
})

export default {
  // wxLoginCallback,
  getBedList,
  addBed
}
