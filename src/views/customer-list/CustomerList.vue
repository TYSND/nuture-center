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
                         prop="customerContact"
                         label="姓名"
                         show-overflow-tooltip
                         min-width="60">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerContactNum"
                         label="性别"
                         show-overflow-tooltip
                         min-width="40">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="年龄"
                         show-overflow-tooltip
                         min-width="40">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="床位"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="护理级别"
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
              <el-link type="primary" :underline="false" @click="edit(scope.row)">设置护理级别</el-link>
              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">设置健康管家</el-link>
              <el-link type="success" :underline="false" @click="setMeal(scope.row)">设置菜单</el-link>
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
          :current-page="pageNum + 1"
          :page-size="pageSize"
          :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomerList",
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
      changePage (page) {
        this.search(page - 1)
      },
      changeStatus (value) {
        console.log(value)
      },
      setMeal (row) {
        console.log(row)
        this.$router.push('/meal-manage')
      }
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
        justify-content: space-between;
        white-space: nowrap;
      }
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>