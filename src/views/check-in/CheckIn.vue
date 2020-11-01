<template>
  <div class="check-in">
    <div class="title">
      <span class="title-content">入住登记</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/check-in/add')">登记</el-button>
      </div>
<!--      <div class="radio-group">-->
<!--        <el-radio-group v-model="elderType" size="small" @change="changeType">-->
<!--          <el-radio-button label="活力老人"></el-radio-button>-->
<!--          <el-radio-button label="自理老人"></el-radio-button>-->
<!--          <el-radio-button label="护理老人"></el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </div>-->
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
<!--        <el-table-column header-align="center" align="center"-->
<!--                         label="操作"-->
<!--                         min-width="100"-->
<!--                         fixed="right"-->
<!--                         style="overflow: auto">-->
<!--          <template v-slot="scope">-->
<!--            <div class="opt-links">-->
<!--              <el-link type="primary" :underline="false" @click="edit(scope.row)">设置护理级别</el-link>-->
<!--              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">设置健康管家</el-link>-->
<!--              <el-link type="success" :underline="false" @click="setMeal(scope.row)">设置菜单</el-link>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import api from '@/api/api';
  export default {
    name: "CheckIn",
    data () {
      return {
        pageNum: 0,
        pageSize: 10,
        totalNum: 0,
        customerList: [
          {
            customerContact: '王小明'
          }
        ]
      }
    },
    methods: {
      ...mapMutations(['setCheckInInfo']),
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
      edit (row) {
        this.setCheckInInfo(row)
        this.$router.push('/check-in/edit')
      }
    },
    activated () {
      this.search()
      // 获取未入住的床位
      api.getBedList().then(res => {
        // console.log(res.data)
        let bl = {}
        res.data.forEach(cur => {
          if (cur.bedStatus === 0) {
            bl[cur.id] = cur.roomNumber + '-' + cur.id
          }
        })
        localStorage.setItem('bedList', JSON.stringify(bl))
      })
      // 获取健康管家
      api.getHouseKeeper().then(res => {
        // console.log(res.data)
        let hk = {}
        res.data.forEach(cur => {
          hk[cur.id] = cur.name
        })
        localStorage.setItem('houseKeeper', JSON.stringify(hk))
      })
      // 获取护理级别
      api.getNurseLevel().then(res => {
        // console.log(res.data)
        let nl = {}
        res.data.forEach(cur => {
          nl[cur.id] = cur.name
        })
        localStorage.setItem('nurseLevel', JSON.stringify(nl))
      })
    }
  }
</script>

<style lang="less" scoped>
.check-in {
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
    flex-direction: column;
    /*justify-content: space-between;*/
    /*align-items: center;*/
    .btns{
      padding-bottom: 15px;
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
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>