<template>
  <div class="buy-history">
    <div class="title">
      <span class="title-content">购买记录</span>
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
          :data="buyList"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="customerName"
                         label="客户姓名"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="nurseContentName"
                         label="护理项目"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="amount"
                         label="购买数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="totalPrice"
                         label="总价"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
<!--        <el-table-column header-align="center" align="center"-->
<!--                         label="操作"-->
<!--                         min-width="100"-->
<!--                         fixed="right">-->
<!--          <template v-slot="scope">-->
<!--            <el-link type="primary" :underline="false" @click="edit(scope.row)">购买</el-link>-->
<!--            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">立即提醒</el-link>-->
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
  import api from '@/api/api';

  export default {
    name: "BuyHistory",
    data () {
      return {
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        buyList: []
      }
    },
    methods: {
      search (pageNum = 1) {
        this.pageNum = pageNum
        api.getBuyHistoryByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.buyList = res.data
          this.totalNum = res.totalNum
        })
      },
      changePage (page) {
        this.search(page)
      }
    },
    activated () {
      this.search()
    }
  }
</script>

<style lang="less" scoped>
.buy-history {
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
</style>