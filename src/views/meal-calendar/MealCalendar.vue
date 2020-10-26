<template>
  <div class="meal-calendar">
    <div class="title">
      <span class="title-content">膳食日历</span>
<!--      <span class="num">数量：{{totalNum}}</span>-->
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/add-customer')">添加膳食</el-button>
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="mealCalendar"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="monday"
                         label="周一"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="tuesday"
                         label="周二"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="wednesday"
                         label="周三"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="thursday"
                         label="周四"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="friday"
                         label="周五"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="saturday"
                         label="周六"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="sunday"
                         label="周日"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <!--        <el-table-column header-align="center" align="center"-->
        <!--                         label="操作"-->
        <!--                         min-width="100"-->
        <!--                         fixed="right">-->
        <!--          <template v-slot="scope">-->
        <!--            <div class="opt-links">-->
        <!--              <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>-->
        <!--              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MealCalendar",
    data () {
      return {
        mealCalendar: [
          {
            monday: 'aaa',
            tuesday: 'sss',
            wednesday: 'aadfsa',
            thursday: 'afd',
            friday: 'afd',
            saturday: 'sdfs',
            sunday: 'sdf'
          },
          {
            monday: 'aaa',
            tuesday: '',
            wednesday: 'aadfsa',
            thursday: 'afd',
            friday: '',
            saturday: '',
            sunday: ''
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
      }
    }
  }
</script>

<style lang="less" scoped>
.meal-calendar {
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
}
</style>