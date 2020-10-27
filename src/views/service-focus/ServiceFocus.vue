<template>
  <div class="service-focus">
    <div class="title">
      <span class="title-content">服务关注</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/add-customer')">购买</el-button>
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="serviceList"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="customerContact"
                         label="客户姓名"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerContactNum"
                         label="护理项目"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="上期剩余数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="购买数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="总数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="本期剩余数量"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="购买时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="服务状态"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="备注"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <el-link type="primary" :underline="false" @click="edit(scope.row)">购买</el-link>
            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">立即提醒</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-show="totalNum > pageSize"
          class="pagination"
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page="pageNum + 1"
          :page-size="pageSize"
          :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ServiceFocus",
    data () {
      return {
        pageNum: 0,
        pageSize: 10,
        totalNum: 0,
        serviceList: []
      }
    },
    methods: {
      changePage (page) {
        this.search(page - 1)
      }
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
</style>