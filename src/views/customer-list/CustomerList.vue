<template>
  <div class="customer-list">
    <div class="title">
      <span class="title-content">客户列表</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
<!--        <el-button class="btn" type="primary" size="small" @click="$router.push('/add-customer')">添加客户</el-button>-->
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="customerList"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="name"
                         label="姓名"
                         show-overflow-tooltip
                         min-width="60">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="sex"
                         label="性别"
                         show-overflow-tooltip
                         min-width="40">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="age"
                         label="年龄"
                         show-overflow-tooltip
                         min-width="40">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="bedId"
                         label="床位"
                         show-overflow-tooltip
                         min-width="80">
          <template v-slot="scope">
            <span>
              {{scope.row.roomNumber}}-{{scope.row.bedId}}
            </span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="checkInTime"
                         label="入住时间"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="nurseLevel"
                         label="护理级别"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="housekeeperName"
                         label="健康管家"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right"
                         style="overflow: auto">
          <template v-slot="scope">
            <div class="opt-links">
              <el-link type="primary" :underline="false" @click="setNurseLevel(scope.row)">设置护理级别</el-link>
              <el-link class="opt-link" type="danger" :underline="false" @click="setHouseKeeper(scope.row)">设置健康管家</el-link>
              <el-link type="success" :underline="false" @click="setMeal(scope.row)" :disabled="clicked">设置菜单</el-link>
              <el-link type="warning" :underline="false" @click="$router.push('/service-focus/' + scope.row.id)">服务关注</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-show="totalNum > pageSize"
          class="pagination"
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page="pageNum"
          :page-size="pageSize"
          :total="totalNum">
      </el-pagination>
    </div>

    <el-dialog width="400px" title="护理级别" :visible.sync="nurseLevelDialog">
      <el-form :model="nurseLevelForm" label-position="top">
        <el-form-item label="护理级别">
          <el-select class="form-item" v-model="nurseLevelForm.nurseLevelId" placeholder="请选择护理级别">
            <el-option
                v-for="(val, key) in nurseLevel"
                :key="key"
                :label="val"
                :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nurseLevelDialog = false">取 消</el-button>
        <el-button  @click="submitNurseLevel" type="primary" :loading="clicked" >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="400px" title="健康管家" :visible.sync="houseKeeperDialog">
      <el-form :model="houseKeeperForm" label-position="top">
        <el-form-item label="健康管家">
          <el-select class="form-item" v-model="houseKeeperForm.housekeeperId" placeholder="请选择健康管家">
            <el-option
                v-for="(val, key) in houseKeeper"
                :key="key"
                :label="val"
                :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="houseKeeperDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitHouseKeepter" :loading="clicked" >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="400px" title="菜单" :visible.sync="mealDialog">
      <el-form :model="mealForm" label-position="top">
        <el-form-item
            v-for="(day, index) in mealCalendar"
            :key="index"
            :label="week[index]">
          <el-select class="form-item" v-model="mealForm.toSend[index-1].mealCalendarId" placeholder="请选择套餐">
            <el-option
                v-for="val in day"
                :key="val.id"
                :label="val.setName"
                :value="val.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mealDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitMeal" :loading="clicked" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/api/api.js'
  export default {
    name: "CustomerList",
    data () {
      return {
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        nurseLevelDialog: false,
        houseKeeperDialog: false,
        mealDialog: false,
        customerList: [],
        // curCustomer: {},
        nurseLevel: {},
        houseKeeper: {},
        mealCalendar: {},
        clicked: false,
        nurseLevelForm: {
          id: '',
          nurseLevelId: ''
        },
        houseKeeperForm: {
          id: '',
          housekeeperId: ''
        },
        week: {
          1: '周一',
          2: '周二',
          3: '周三',
          4: '周四',
          5: '周五',
          6: '周六',
          7: '周七',
        },
        test: '',
        mealForm: {
          toSend: [
            // 1
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 1
            },
            // 2
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 2
            },
            // 3
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 3
            },
            // 4
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 4
            },
            // 5
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 5
            },
            // 6
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 6
            },
            // 7
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 7
            }
          ]
        }
      }
    },
    methods: {
      search (pageNum = 1) {
        this.pageNum = pageNum
        api.getCustomerListByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.customerList = res.data
          this.totalNum = res.totalNum
        })
      },
      changePage (page) {
        this.search(page)
      },
      changeStatus (value) {
        console.log(value)
      },
      setNurseLevel (row) {
        // console.log(row)
        // this.curCustomer = row
        this.nurseLevelForm.id = row.id
        this.nurseLevelForm.nurseLevelId = row.nurseLevelId.toString()
        this.nurseLevelDialog = true
      },
      setHouseKeeper (row) {
        // console.log(row)
        // this.curCustomer = row
        this.houseKeeperForm.id = row.id
        this.houseKeeperForm.housekeeperId = row.housekeeperId.toString()
        this.houseKeeperDialog = true
      },
      setMeal (row) {
        // console.log(row)
        // console.log('mmmmmmmmm',this.mealCalendar)
        // this.getMealCalendar()
        this.clicked = true
        this.mealForm = {
          toSend: [
            // 1
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 1
            },
            // 2
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 2
            },
            // 3
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 3
            },
            // 4
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 4
            },
            // 5
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 5
            },
            // 6
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 6
            },
            // 7
            {
              customerId: '',
              mealCalendarId: '',
              weekday: 7
            }
          ]
        }
        for (let i = 0 ; i < this.mealForm.toSend.length; i++) {
          this.mealForm.toSend[i].customerId = row.id
        }
        api.getCustomerMeal({
          customerId: row.id
        }).then(res => {
          console.log('sadfabgfefewrebfedw')
          res.data.forEach(cur => {
            // console.log('cur', cur)
            // this.mealForm.toSend[cur.weekday-1].weekday = cur.weekday
            this.mealForm.toSend[cur.weekday-1].mealCalendarId = cur.mealCalendarId === 0 ? '' : cur.mealCalendarId
            // console.log('asdfsfwfeQ',typeof this.mealForm.toSend[cur.weekday-1].mealCalendarId)
            // console.log(typeof cur.mealCalendarId)
          })
          this.clicked = false
          this.mealDialog = true
        }).catch(() => {
          this.clicked = false
        })

      },
      getMealCalendar () {
        return api.getMealCalendar().then(res => {
          this.mealCalendar = {}
          res.data.forEach(cur => {
            console.log(cur.setName)
            if (!this.mealCalendar[cur.weekday]) {
              this.mealCalendar[cur.weekday] = []
            }
            this.mealCalendar[cur.weekday].push(cur)
          })
          console.log('mealCalendar',this.mealCalendar)
        })
      },
      submitNurseLevel () {
        this.clicked = true
        api.setCustomerNurseLevel(this.nurseLevelForm).then(() => {
          this.clicked = false
          this.$notify.success({ title: '成功', message: '修改成功' })
          this.nurseLevelDialog = false
          this.search()
        }).catch(() => {
          this.clicked = false
          this.nurseLevelDialog = false
        })
      },
      submitHouseKeepter () {
        this.clicked = true
        api.setCustomerHouseKeeper(this.houseKeeperForm).then(() => {
          this.clicked = false
          this.$notify.success({ title: '成功', message: '修改成功' })
          this.houseKeeperDialog = false
          this.search()
        }).catch(() => {
          this.clicked = false
          this.houseKeeperDialog = false
        })
      },
      submitMeal () {
        this.clicked = true
        api.setCustomerMeal(this.mealForm.toSend).then(() => {
          this.clicked = false
          this.$notify.success({ title: '成功', message: '修改成功' })
          this.mealDialog = false
          this.search()
        }).catch(() => {
          this.clicked = false
          this.mealDialog = false
        })
      }
    },
    activated () {
      this.search()
      // 获取健康管家
      api.getHouseKeeper().then(res => {
        // console.log(res.data)
        let hk = {}
        res.data.forEach(cur => {
          hk[cur.id] = cur.name
        })
        this.houseKeeper = hk
        // localStorage.setItem('houseKeeper', JSON.stringify(hk))
      })
      // 获取护理级别
      api.getNurseLevel().then(res => {
        // console.log(res.data)
        let nl = {}
        res.data.forEach(cur => {
          nl[cur.id] = cur.name
        })
        this.nurseLevel = nl
        // localStorage.setItem('nurseLevel', JSON.stringify(nl))
      })
      // 获取菜单
      this.getMealCalendar()
    }
  }
</script>

<style lang="less" scoped>
.customer-list {
  .title {
    padding: 20px;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-content {
      font-size: 20px;
      color: #101010;
    }
    .num {
      font-size: 14px;
      line-height: 14px;
      color: #999999;
    }
  }
  .interactive {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btns{
      .btn {
        border-radius: 4px;
        text-align: center;
      }
    }
    .form {
      margin-left: 10px;
      .el-form-item{
        padding: 0;
        max-width: 120px;
        margin: 0 0 0 10px;
      }
      .el-select {
        /*margin-left: 10px;*/
      }
    }
  }
  .search-res {
    margin: 0 20px 20px;
    .el-table {
      font-size: 13px;
      .cell {
        font-size: 13px !important;
      }
      .opt-links {
        display: flex;
        flex-direction: column;
        /*justify-content: space-between;*/
        align-items: center;
        white-space: nowrap;
        overflow: auto;
        /deep/ .el-link--inner {
          padding-right: 10px;
        }
      }
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>