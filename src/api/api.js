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

// 获取护理级别
const getNurseLevel = () => request({
  url: '/nurse_level/getAll',
  method: 'get'
})

//获取护理内容列表
const getNurseContent = () => request({
  url: '/nurse_content/getAll',
  method: 'get'
})

//新增护理内容
const addNurseContent = data => request({
  url: '/nurse_content',
  method: 'post',
  data
})

//编辑护理内容
const editNurseContent = data => request({
  url: '/nurse_content',
  method: 'put',
  data
})

//删除护理内容
const deleteNurseContent = params => request({
  url: '/nurse_content',
  method: 'delete',
  params
})

// 获取护理记录
const getNurseHistory = params => request({
  url: '/nurse_record',
  method: 'get',
  params
})

//新增护理记录
const addNurseHistory = data => request({
  url: '/nurse_record',
  method: 'post',
  data
})

//删除护理记录
const deleteNurseHistory = data => request({
  url: '/nurse_record',
  method: 'delete',
  data
})

export default {
  // wxLoginCallback,
  getBedList,
  addBed,
  getNurseLevel,
  getNurseContent,
  addNurseContent,
  editNurseContent,
  deleteNurseContent,
  getNurseHistory,
  addNurseHistory,
  deleteNurseHistory
}
