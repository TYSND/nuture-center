import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: localStorage.getItem('token'),
    bedInfo: JSON.parse(sessionStorage.getItem('bedInfo')) || {},
    checkInInfo: JSON.parse(sessionStorage.getItem('checkInInfo')) || {},
    checkOutInfo: JSON.parse(sessionStorage.getItem('checkOutInfo')) || {},
    // account: localStorage.getItem('account'),
    // user: JSON.parse(localStorage.getItem('user')) || {},
    // companyType: {
    //   1: '有限责任公司',
    //   7: '有限责任公司（自然人控股）',
    //   8: '有限责任公司（自然人独资）',
    //   2: '股份有限公司',
    //   3: '外资有限责任公司',
    //   4: '外资股份有限公司',
    //   5: '有限合伙公司',
    //   6: '其它类型公司'
    // }
  },
  mutations: {
    // setToken (state, token) {
    //   state.token = token
    //   localStorage.setItem('token', token)
    //   // console.log('AAAAA' + localStorage.getItem('token'))
    // },
    setBedInfo (state, bedInfo) {
      state.bedInfo = bedInfo
      sessionStorage.setItem('bedInfo', JSON.stringify(bedInfo))
    },
    setCheckInInfo (state, checkInInfo) {
      state.checkInInfo = checkInInfo
      sessionStorage.setItem('checkInInfo', JSON.stringify(checkInInfo))
    },
    setCheckOutInfo (state, checkOutInfo) {
      state.checkOutInfo = checkOutInfo
      sessionStorage.setItem('checkOutInfo', JSON.stringify(checkOutInfo))
    },
    // setUser (state, user) {
    //   state.user = user
    //   localStorage.setItem('user', JSON.stringify(user))
    // },
    clear (state) {
      state.token = ''
      state.info = {}
      state.role = ''
      state.account = ''
      state.user = {}
      localStorage.removeItem('bedInfo')
      localStorage.removeItem('checkInInfo')
      localStorage.removeItem('checkOutInfo')
      localStorage.removeItem('user')
      localStorage.removeItem('account')
    }
  }
})
