<template>
  <div class="go-out">
    <div class="title">
      <span class="title-content">外出登记</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="goOutDialog = true">新增离院记录</el-button>
<!--        <el-button class="btn" type="success" size="small" @click="$router.push('/add-customer')">审核</el-button>-->
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="goOutList"
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
                         prop="outTime"
                         label="离院时间"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="backTime"
                         label="归院时间"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <el-link type="success" :underline="false" @click="leaveOff(scope.row)">销假</el-link>
<!--            <div slot="footer" class="dialog-footer">-->
<!--              -->
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
    <el-dialog width="400px" title="新增离院记录" :visible.sync="goOutDialog">
      <el-form :model="goOutForm" label-position="top">
        <el-form-item label="用户">
          <el-select class="form-item" v-model="goOutForm.customerId" placeholder="请选择用户">
            <el-option
                v-for="(val, key) in customerList"
                :key="key"
                :label="val"
                :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离院时间" prop="outTime	">
          <el-date-picker
              v-model="goOutForm.outTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goOutDialog = false">取 消</el-button>
        <el-button  @click="addGoOut" type="primary" :loading="clicked" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import api from '@/api/api';
  export default {
    name: "GoOut",
    data () {
      return {
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        goOutList: [],
        customerList: {},
        goOutDialog: false,
        goOutForm: {
          customerId: '',
          outTime: ''
        },
        clicked: false
      }
    },
    methods: {
      ...mapMutations(['setGoOutInfo']),
      search(pageNum = 1) {
        this.pageNum = pageNum
        api.getGoOutByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.goOutList = res.data
          this.totalNum = res.totalNum
        })
      },
      changePage (page) {
        this.search(page)
      },
      dateToString(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        month = month > 9 ? month : ('0' + month);
        day = day > 9 ? day : ('0' + day);
        hour = hour > 9 ? hour : ('0' + hour);
        minute = minute > 9 ? minute : ('0' + minute);
        second = second > 9 ? second : ('0' + second);
        const dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return dateTime;
      },
      leaveOff (row) {
        // this.$router.push('/go-out/edit')
        console.log(row.id)
        let curTime = this.dateToString(new Date())
        console.log(curTime)
        this.$confirm('确定销假吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.leaveOff({
            id: row.id,
            backTime: curTime
          }).then(() => {
            this.$notify.success({
              title: '成功',
              message: '销假成功'
            })
            this.search()
          })
        }).catch(() => {})
      },
      addGoOut () {
        this.clicked = true
        api.addGoOut(this.goOutForm).then(() => {
          this.clicked = false
          this.$notify.success({ title: '成功', message: '修改成功' })
          this.goOutDialog = false
          this.search()
        }).catch(() => {
          this.clicked = false
          this.goOutDialog = false
        })
      }
    },
    activated () {
      this.search()
      // 获取用户列表
      api.getCustomerList().then(res => {
        let cl = {}
        res.data.forEach(cur => {
          cl[cur.id] = cur.name
        })
        this.customerList = cl
      })
    }
  }
</script>

<style lang="less" scoped>
.go-out {
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