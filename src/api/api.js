import request from './request.js'

// 获取床位列表
const getBedList = () => request({
  url: '/bed/getAll',
  method: 'get'
})

// 获取床位列表
const getBedListByPage = params => request({
  url: '/bed/getPage',
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

// 获取所有客户列表
const getCustomerList = () => request({
  url: '/customer/getAll',
  method: 'get'
})

// 获取分页客户列表
const getCustomerListByPage = params => request({
  url: '/customer/getPage',
  method: 'get',
  params
})

// 获取健康管家
const getHouseKeeper = () => request({
  url: '/housekeeper/getAll',
  method: 'get'
})

// 入住登记
const addCustomer = data => request({
  url: '/customer',
  method: 'post',
  data
})

// 入住登记
const deleteCustomer = data => request({
  url: '/customer',
  method: 'delete',
  data
})

// 设置用户护理级别
const setCustomerNurseLevel = data => request({
  url: '/customer/nurse_level',
  method: 'put',
  data
})

// 设置用户健康管家
const setCustomerHouseKeeper = data => request({
  url: '/customer/housekeeper',
  method: 'put',
  data
})

// 获取膳食日历
const getMealCalendar = () => request({
  url: '/meal_calendar/getAll',
  method: 'get'
})

// 获取膳食日历
const addMeal = data => request({
  url: '/meal_calendar',
  method: 'post',
  data
})

// 获取膳食日历
const deleteMeal = data => request({
  url: '/meal_calendar',
  method: 'delete',
  data
})

// 获取用户菜单
const getCustomerMeal = params => request({
  url: '/meal_manage',
  method: 'get',
  params
})

// 设置用户菜单
const setCustomerMeal = data => request({
  url: '/meal_manage',
  method: 'put',
  data
})

// 获取服务关注（商品列表）
const getServiceFocus = params => request({
  url: '/service_focus',
  method: 'get',
  params
})

// 购买服务关注
const buyServiceFocus = data => request({
  url: '/service_focus/buy',
  method: 'post',
  data
})

// 获取购买记录
const getBuyHistoryByPage = params => request({
  url: '/buy_record/getPage',
  method: 'get',
  params
})

export default {
  // wxLoginCallback,
  getBedList,
  getBedListByPage,
  addBed,
  getNurseLevel,
  getNurseContent,
  addNurseContent,
  editNurseContent,
  deleteNurseContent,
  getNurseHistory,
  addNurseHistory,
  deleteNurseHistory,
  getCustomerList,
  getCustomerListByPage,
  getHouseKeeper,
  addCustomer,
  deleteCustomer,
  setCustomerNurseLevel,
  setCustomerHouseKeeper,
  getMealCalendar,
  addMeal,
  deleteMeal,
  getCustomerMeal,
  setCustomerMeal,
  getServiceFocus,
  buyServiceFocus,
  getBuyHistoryByPage
}
