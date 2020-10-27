<template>
  <div class="bed-manage">
    <div class="title">
      <span class="title-content">床位管理</span>
      <span class="num">床位数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/bed-manage/add')">新增床位</el-button>
      </div>
      <el-form class="form" ref="form" :model="form" :inline="true" size="small">
        <el-form-item>
          <el-select v-model="form.status" @change="changeStatus" placeholder="床位状态">
            <el-option
                v-for="(val, key) in bedStatus"
                :key="key"
                :label="val"
                :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-input v-model="form.name" placeholder="客户名称"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-input v-model="form.manager" placeholder="客户经理"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" size="small" @click="search(0)">搜索</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="bedInfo"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="left" align="left"
                         prop="customerName"
                         label="床位编号"
                         show-overflow-tooltip
                         min-width="240">
          <template v-slot="scope">
            <el-link type="primary" :underline="false" @click="showInfo(scope.row)">{{ scope.row.customerName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerContact"
                         label="入住人"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerContactNum"
                         label="起始时间"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="customerLevel"
                         label="结束时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="newest"
                         label="详细信息"
                         show-overflow-tooltip
                         min-width="150">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>
            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>
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
    name: "BedManage",
    data () {
      return {
        pageNum: 0,
        pageSize: 10,
        totalNum: 0,
        bedInfo: [
          {
            customerName: 'aaa'
          }
        ],
        form: {
          status: null
        },
        bedStatus: {
          0: '全部床位',
          1: '已入住',
          2: '未入住'
        }
      }
    },
    methods: {
      ...mapMutations(['setBedInfo']),
      changePage (page) {
        this.search(page - 1)
      },
      changeStatus (value) {
        console.log(value)
      },
      showInfo (row) {
        console.log(row)
      },
      edit (row) {
        this.setBedInfo(row)
        this.$router.push('/bed-manage/edit')
      }
    }
  }
</script>

<style lang="less" scoped>
.bed-manage {
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
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>