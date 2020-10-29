<template>
  <div class="check-out">
    <div class="title">
      <span class="title-content">退住登记</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/check-out/add')">登记</el-button>
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="elderList"
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
                         label="性别"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="年龄"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="档案号"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="入住时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="退住时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="退住类型"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="退住原因"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="状态"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="申请时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="审核意见"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="审核人"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="审核时间"
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
            <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>
            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>
            <el-link class="opt-link" type="success" :underline="false" @click="mydelete(scope.row)">审核</el-link>
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
  import { mapMutations } from 'vuex'
  export default {
    name: "CheckOut",
    data () {
      return {
        pageNum: 0,
        pageSize: 10,
        totalNum: 0,
        elderType: '活力老人',
        elderList: []
      }
    },
    methods: {
      ...mapMutations(['setCheckOutInfo']),
      changePage (page) {
        this.search(page - 1)
      },
      edit (row) {
        // console.log(row)
        this.setCheckOutInfo(row)
        this.$router.push('/check-out/edit')
      }
    }
  }
</script>

<style lang="less" scoped>
.check-out {
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