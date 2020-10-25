import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    customerInfo: JSON.parse(sessionStorage.getItem('customerInfo')) || {},
    companyInfo: JSON.parse(sessionStorage.getItem('companyInfo')) || {},
    role: localStorage.getItem('role'),
    roles: {
      A: 'admin',
      U: 'user'
    },
    account: localStorage.getItem('account'),
    user: JSON.parse(localStorage.getItem('user')) || {},
    companyType: {
      1: '有限责任公司',
      7: '有限责任公司（自然人控股）',
      8: '有限责任公司（自然人独资）',
      2: '股份有限公司',
      3: '外资有限责任公司',
      4: '外资股份有限公司',
      5: '有限合伙公司',
      6: '其它类型公司'
    },
    customerLevel: {
      1: '核心客户',
      2: '重要客户',
      3: '普通客户',
      4: '潜在客户',
      5: '流失客户',
      6: '其他'
    },
    customerType: {
      1: '周期客户',
      2: '单次客户'
    },
    invoiceType: {
      1: '增值税普通发票',
      2: '增值税专用发票'
    },
    businessType: {
      1: '企业设立',
      2: '企业变更',
      3: '企业增资',
      4: '银行开户',
      5: '企业年检',
      6: '企业注销',
      7: '财务代账',
      8: '税务登记',
      9: '税务记账',
      10: '社保年检',
      11: '工商年检',
      12: '财务报税',
      13: '验资报告',
      14: '审计报告',
      15: '申请一般纳税人',
      16: '资质办理',
      17: '进出口代理权'
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
      // console.log('AAAAA' + localStorage.getItem('token'))
    },
    setCustomerInfo (state, customerInfo) {
      state.customerInfo = customerInfo
      sessionStorage.setItem('customerInfo', JSON.stringify(customerInfo))
    },
    setCompanyInfo (state, companyInfo) {
      state.companyInfo = companyInfo
      sessionStorage.setItem('companyInfo', JSON.stringify(companyInfo))
    },
    setRole (state, role) {
      state.role = role
      localStorage.setItem('role', role)
    },
    setAccount (state, account) {
      state.account = account
      localStorage.setItem('account', account)
      console.log(localStorage.getItem('account'))
    },
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clear (state) {
      state.token = ''
      state.info = {}
      state.role = ''
      state.account = ''
      state.user = {}
      localStorage.removeItem('token')
      localStorage.removeItem('info')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      localStorage.removeItem('account')
    }
  }
})
