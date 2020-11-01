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
          :data="showList"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="left" align="left"
                         prop="roomNumber"
                         label="床位编号"
                         show-overflow-tooltip
                         min-width="240">
        </el-table-column>
        <el-table-column header-align="left" align="left"
                         prop="bedStatus"
                         label="入住状态"
                         show-overflow-tooltip
                         min-width="240">
          <template v-slot="scope">
            <span>{{status[scope.row.bedStatus]}}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column header-align="center" align="center"-->
<!--                         prop="customerContact"-->
<!--                         label="入住人"-->
<!--                         show-overflow-tooltip-->
<!--                         min-width="80">-->
<!--        </el-table-column>-->
<!--        <el-table-column header-align="center" align="center"-->
<!--                         prop="customerContactNum"-->
<!--                         label="起始时间"-->
<!--                         show-overflow-tooltip-->
<!--                         min-width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column header-align="center" align="center"-->
<!--                         prop="customerLevel"-->
<!--                         label="结束时间"-->
<!--                         show-overflow-tooltip-->
<!--                         min-width="90">-->
<!--        </el-table-column>-->
<!--        <el-table-column header-align="center" align="center"-->
<!--                         prop="newest"-->
<!--                         label="详细信息"-->
<!--                         show-overflow-tooltip-->
<!--                         min-width="150">-->
<!--        </el-table-column>-->
<!--        <el-table-column header-align="center" align="center"-->
<!--                         label="操作"-->
<!--                         min-width="100"-->
<!--                         fixed="right">-->
<!--          <template v-slot="scope">-->
<!--            <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>-->
<!--&lt;!&ndash;            <div class="opt-links">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  import api from '@/api/api.js'
  export default {
    name: "BedManage",
    data () {
      return {
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        bedInfo: [],
        showList: [],
        form: {
          status: "2"
        },
        status: {
          0: '未入住',
          1: '已入住'
        },
        bedStatus: {
          2: '全部床位',
          1: '已入住',
          0: '未入住'
        }
      }
    },
    methods: {
      ...mapMutations(['setBedInfo']),
      changePage (page) {
        this.search(page)
      },
      changeStatus (value) {
        value = parseInt(value)
        if (value === 2) {
          this.showList = this.bedInfo
          console.log('all',this.showList)
        } else if (value === 1) {
          this.showList = this.bedInfo.filter(cur => cur.bedStatus === 1)
          console.log('1',this.showList)
        } else if (value === 0) {
          this.showList = this.bedInfo.filter(cur => cur.bedStatus === 0)
          console.log('0',this.showList)
        }
      },
      edit (row) {
        this.setBedInfo(row)
        this.$router.push('/bed-manage/edit')
      }
    },
    created () {
      api.getBedListByPage({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.bedInfo = res.data
        this.totalNum = res.totalNum
        this.showList = this.bedInfo
        console.log(this.showList)
      })
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
      .opt-links {
        display: flex;
        justify-content: space-between;
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