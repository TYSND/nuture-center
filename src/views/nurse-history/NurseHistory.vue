<template>
  <div class="nurse-history">
    <div class="title">
      <span class="title-content">护理记录</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/nurse-history/add')">添加护理记录</el-button>
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="nurseHistory"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="customerName"
                         label="客户姓名"
                         show-overflow-tooltip
                         min-width="100">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="nurseLevel"
                         label="护理级别"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="nurseContentName"
                         label="护理内容"
                         show-overflow-tooltip
                         min-width="200">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="timestamp"
                         label="护理时间"
                         show-overflow-tooltip
                         min-width="200">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>
<!--            <div class="opt-links">-->
<!--              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>-->
<!--            </div>-->
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
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: "NurseHistory",
    data () {
      return {
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        nurseHistory: []
      }
    },
    methods: {
      search (pageNum = 1) {
        this.pageNum = pageNum
        api.getNurseHistory({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.nurseHistory = res.data
          this.totalNum = res.totalNum
        })
      },
      changePage (page) {
        this.search(page)
      },
      mydelete(row) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteNurseHistory({id: row.id}).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.search()
          })
        }).catch(() => {})
      },
      changeStatus (value) {
        console.log(value)
      }
    },
    activated () {
      this.search()
      // 获取用户列表
      api.getCustomerList().then(res => {
        let cl = {}
        res.data.forEach(cur => {
          cl[cur.id] = {
            name: cur.name,
            nurseLevelId: cur.nurseLevelId
          }
        })
        localStorage.setItem('customerList', JSON.stringify(cl))
      })
      // 获取护理内容列表
      api.getNurseContent().then(res => {
        // console.log(res.data)
        let nc = {}
        res.data.forEach(cur => {
          nc[cur.id] = {
            name: cur.name,
            nurseLevelId: cur.nurseLevelId
          }
        })
        localStorage.setItem('nurseContent', JSON.stringify(nc))
      })
    }
  }
</script>

<style lang="less" scoped>
.nurse-history {
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
      }
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>