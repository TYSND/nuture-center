<template>
  <div class="service-focus">
    <div class="title">
      <span class="title-content">服务关注</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
<!--      <div class="btns">-->
<!--        <el-button class="btn" type="primary" size="small" @click="$router.push('/service-focus/history')">购买记录</el-button>-->
<!--      </div>-->
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="serviceList"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="nurseContentName"
                         label="护理项目"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="amount"
                         label="剩余数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="price"
                         label="价格"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <el-popover
                placement="left"
                width="400"
                trigger="hover">
              <div class="buy-inner">
                <el-input-number v-model="buyNum" :min="1" label="购买数量"></el-input-number>
                <el-button type="warning" @click="buy(scope.row)">购买</el-button>
              </div>
              <el-link slot="reference" type="warning" :underline="false">购买</el-link>
            </el-popover>
<!--            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">立即提醒</el-link>-->
          </template>
        </el-table-column>
      </el-table>
<!--      <el-pagination-->
<!--          v-show="totalNum > pageSize"-->
<!--          class="pagination"-->
<!--          background-->
<!--          layout="prev, pager, next"-->
<!--          @current-change="changePage"-->
<!--          :current-page="pageNum + 1"-->
<!--          :page-size="pageSize"-->
<!--          :total="totalNum">-->
<!--      </el-pagination>-->
    </div>
  </div>
</template>

<script>
  import api from '@/api/api.js'

  export default {
    name: "ServiceFocus",
    data () {
      return {
        pageNum: 0,
        pageSize: 10,
        totalNum: 0,
        customerId: '',
        buyNum: 1,
        popVisible: false,
        serviceList: []
      }
    },
    methods: {
      search () {
        api.getServiceFocus({customerId: this.customerId}).then(res => {
          console.log(res.data)
          this.serviceList = res.data
        })
      },
      changePage (page) {
        this.search(page)
      },
      buy (row) {
        console.log(row)
        api.buyServiceFocus({
          customerId: this.customerId,
          nurseContentId: row.nurseContentId,
          amount: this.buyNum
        }).then(() => {
          this.popVisible = false
          this.$notify.success({ title: '成功', message: '购买成功' })
          this.search()
        }).catch(() => {
          this.popVisible = false
        })
      }
    },
    activated () {
      this.customerId = this.$route.params.customerId
      console.log(this.customerId)
      this.search()
    }
  }
</script>

<style lang="less" scoped>
.service-focus {
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
      /*padding-bottom: 15px;*/
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
.buy-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>