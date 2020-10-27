import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
// import { Notification } from 'element-ui'
// import { Message } from 'element-ui'
// import userApi from '@/api/user.js'

const HomeIndex = () => import('@/views/home/HomeIndex.vue')
const HomeView = () => import('@/views/home/HomeView.vue')
const BedManage = () => import('@/views/bed-manage/BedManage.vue')
const CheckIn = () => import('@/views/check-in/CheckIn.vue')
const CheckOut = () => import('@/views/check-out/CheckOut.vue')
const CustomerList = () => import('@/views/customer-list/CustomerList.vue')
const GoOut = () => import('@/views/go-out/GoOut.vue')
const MealManage = () => import('@/views/meal-manage/MealManage.vue')
const MealCalendar = () => import('@/views/meal-calendar/MealCalendar.vue')
const NurseContent = () => import('@/views/nurse-content/NurseContent.vue')
const NurseHistory = () => import('@/views/nurse-history/NurseHistory.vue')
const NurseLevel = () => import('@/views/nurse-level/NurseLevel.vue')
const ServiceFocus = () => import('@/views/service-focus/ServiceFocus.vue')
const ServiceObj = () => import('@/views/service-obj/ServiceObj.vue')

const AddBed = () => import('@/views/bed-manage/AddBed.vue')
// const EmployeeManage = () => import('@/views/sys/EmployeeManage')
// const UserFeedback = () => import('@/views/feedback/UserFeedback')
// const EditCompany = () => import('@/views/acc/EditCompany')
// const Administrator = () => import('@/views/sys/Administrator.vue')
// const AdminLoginView = () => import('@/views/home/AdminLoginView.vue')
// const RemindSetting = () => import('@/views/sys/RemindSetting.vue')
// const UserManage = () => import('@/views/admin/UserManage.vue')
// const AdminEditCompany = () => import('@/views/admin/AdminEditCompany.vue')
// const CompanyInfo = () => import('@/views/admin/CompanyInfo.vue')
// const SalesStatistics = () => import('@/views/home/SalesStatistics.vue')
// const MessageRemind = () => import('@/views/customer/options/MessageRemind.vue')
// const ForgetPass = () => import('@/views/home/ForgetPass.vue')
// const AccountList = () => import('@/views/customer/options/AccountList')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: HomeIndex }
    ]
  },
  {
    path: '/bed-manage',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: BedManage }
    ]
  },
  {
    path: '/bed-manage/add',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: AddBed }
    ]
  },
  {
    path: '/bed-manage/edit',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: AddBed }
    ]
  },
  {
    path: '/check-in',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: CheckIn }
    ]
  },
  {
    path: '/check-out',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: CheckOut }
    ]
  },
  {
    path: '/customer-list',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: CustomerList }
    ]
  },
  {
    path: '/go-out',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: GoOut }
    ]
  },
  {
    path: '/meal-calendar',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: MealCalendar }
    ]
  },
  {
    path: '/meal-manage',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: MealManage }
    ]
  },
  {
    path: '/nurse-content',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: NurseContent }
    ]
  },
  {
    path: '/nurse-history',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: NurseHistory }
    ]
  },
  {
    path: '/nurse-level',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: NurseLevel }
    ]
  },
  {
    path: '/service-focus',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: ServiceFocus }
    ]
  },
  {
    path: '/service-obj',
    component: HomeView,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '', component: ServiceObj }
    ]
  }
  // {
  //   path: '/company-found',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: () => import('@/views/service/companyfound/CompanyFoundHome') },
  //     { path: 'companyCreate', component: () => import('@/views/service/companyfound/CompanyCreate') },
  //     { path: 'companyEdit', component: () => import('@/views/service/companyfound/CompanyEdit') },
  //     { path: 'registerProcess', component: () => import('@/views/service/companyfound/RegisterProcess') },
  //     { path: 'companyEdit', component: () => import('@/views/service/companyfound/CompanyEdit') },
  //     { path: 'page', component: () => import('@/views/service/Download2') }
  //   ]
  // },
  // {
  //   path: '/company-cancel',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: () => import('@/views/service/companycancel/CompanyCancelHome') },
  //     { path: 'cancelCreate', component: () => import('@/views/service/companycancel/CancelCreate') },
  //     { path: 'cancelProcess', component: () => import('@/views/service/companycancel/CancelProcess') },
  //     { path: 'cancelEdit', component: () => import('@/views/service/companycancel/CancelEdit') },
  //     { path: 'page', component: () => import('@/views/service/DownloadCancel') }
  //   ]
  // },
  // {
  //   path: '/company-change',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: () => import('@/views/service/companychange/CompanyChangeHome') },
  //     { path: 'changeCreate', component: () => import('@/views/service/companychange/ChangeCreate') },
  //     { path: 'changeProcess', component: () => import('@/views/service/companychange/ChangeProcess') },
  //     { path: 'changeEdit', component: () => import('@/views/service/companychange/ChangeEdit') },
  //     { path: 'page', component: () => import('@/views/service/Download') }
  //   ]
  // },
  // {
  //   path: '/current-business',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: () => import('@/views/service/currentbusiness/CurrentBusinessHome') },
  //     { path: 'businessCreate', component: () => import('@/views/service/currentbusiness/BusinessCreate') },
  //     { path: 'page', component: () => import('@/views/service/Download') }
  //   ]
  // },
  // {
  //   path: '/employee-manage',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: EmployeeManage }
  //   ]
  // },
  // {
  //   path: '/business-list',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: BusinessList }
  //   ]
  // },
  // {
  //   path: '/user-feedback',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: UserFeedback }
  //   ]
  // },
  // {
  //   path: '/edit-company',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: EditCompany }
  //   ]
  // },
  // {
  //   path: '/administrator',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: Administrator }
  //   ]
  // },
  // {
  //   path: '/admin-login',
  //   component: AdminLoginView,
  //   beforeEnter: loginBeforeEnter
  // },
  // {
  //   path: '/remind-setting',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: RemindSetting }
  //   ]
  // },
  // {
  //   path: '/user-manage',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: UserManage }
  //   ]
  // },
  // {
  //   path: '/admin-edit-company',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: AdminEditCompany }
  //   ]
  // },
  // {
  //   path: '/company-info',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: CompanyInfo }
  //   ]
  // },
  // {
  //   path: '/sales-statistics',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: SalesStatistics }
  //   ]
  // },
  // {
  //   path: '/message-remind',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', name: '/message-remind', component: MessageRemind }
  //   ]
  // },
  // {
  //   path: '/forget-pass',
  //   component: ForgetPass
  // },
  // {
  //   path: '/account-list',
  //   component: HomeView,
  //   meta: {
  //     requireAuth: true
  //   },
  //   children: [
  //     { path: '', component: AccountList }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.requireAuth)) {
//     // let token = localStorage.getItem('token') || ''
//     // let arr = token.slice(8).split('.')
//     try {
//       // let obj = JSON.parse(window.atob(arr[1]))
//       // store.commit('setRole', 'obj.attach')
//       if (store.state.role === store.state.roles.U) {
//         if (store.state.account) {
//           if (store.state.user.isCertified === 0) {
//             if (to.path === '/user-info') {
//               next()
//             } else {
//               console.log('not certified')
//               Message({ message: '请先完成认证！', type: 'warning' })
//               // Notification.warning({ title: '提示', message: '请先完成认证！' })
//               // next('/user-info')
//             }
//           } else {
//             next()
//           }
//         } else {
//           localStorage.removeItem('token')
//           // TODO
//           next({ path: '/login' })
//           // userApi.getUserInfo().then(res => {
//           //   store.commit('setUser', res)
//           //   next()
//           // }).catch(() => {
//           //   next('/')
//           // })
//         }
//       } else {
//         next()
//       }
//     } catch {
//       localStorage.removeItem('token')
//       // TODO
//       next({ path: '/login' })
//     }
//   } else {
//     next()
//   }
// })

export default router
