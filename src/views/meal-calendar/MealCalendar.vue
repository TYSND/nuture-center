<template>
  <div class="meal-calendar">
    <div class="title">
      <span class="title-content">膳食日历</span>
<!--      <span class="num">数量：{{totalNum}}</span>-->
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="addMealDialog = true">添加膳食</el-button>
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
                         prop="1"
                         label="周一"
                         show-overflow-tooltip
                         min-width="80">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 1)"
            >
              <el-link slot="reference">{{scope.row[1].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="2"
                         label="周二"
                         show-overflow-tooltip
                         min-width="120">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 2)"
            >
              <el-link slot="reference">{{scope.row[2].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="3"
                         label="周三"
                         show-overflow-tooltip
                         min-width="90">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 3)"
            >
              <el-link slot="reference">{{scope.row[3].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="4"
                         label="周四"
                         show-overflow-tooltip
                         min-width="90">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 4)"
            >
              <el-link slot="reference">{{scope.row[4].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="5"
                         label="周五"
                         show-overflow-tooltip
                         min-width="90">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 5)"
            >
              <el-link slot="reference">{{scope.row[5].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="6"
                         label="周六"
                         show-overflow-tooltip
                         min-width="90">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 6)"
            >
              <el-link slot="reference">{{scope.row[6].setName}}</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="7"
                         label="周日"
                         show-overflow-tooltip
                         min-width="90">
          <template v-slot="scope">
            <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMeal(scope.row, 7)"
            >
              <el-link slot="reference">{{scope.row[7].setName}}</el-link>
            </el-popconfirm>
          </template>
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
    <el-dialog width="400px" title="添加膳食" :visible.sync="addMealDialog">
      <el-form ref="addMealForm" :model="addMealForm" :rules="rules" label-position="top">
        <el-form-item label="选择星期" prop="weekday">
          <el-select class="form-item" v-model="addMealForm.weekday" placeholder="请选择星期">
            <el-option
                v-for="(val, key) in weekDayList"
                :key="key"
                :label="val"
                :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐名称" prop="setName">
          <el-input class="form-item" v-model="addMealForm.setName" placeholder="请输入套餐名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMealDialog = false">取 消</el-button>
        <el-button  @click="submitAddMeal('addMealForm')" type="primary" :loading="clicked" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api.js'

  export default {
    name: "MealCalendar",
    data () {
      return {
        mealCalendar: [
          {
            1: 'aaa',
            2: 'sss',
            3: 'aadfsa',
            4: 'afd',
            5: 'afd',
            6: 'sdfs',
            7: 'sdf'
          },
          {
            1: 'aaa',
            2: '',
            3: 'aadfsa',
            4: 'afd',
            5: '',
            6: '',
            7: ''
          }
        ],
        addMealDialog: false,
        addMealForm: {
          weekday: '',
          setName: ''
        },
        clicked: false,
        weekDayList: {
          1: '周一',
          2: '周二',
          3: '周三',
          4: '周四',
          5: '周五',
          6: '周六',
          7: '周七',
        },
        rules: {
          weekday: [
            {required: true, message: '请选择星期', trigger: 'blur'}
          ],
          setName: [
            {required: true, message: '请输入套餐名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      search () {
        api.getMealCalendar().then(res => {
          console.log(res.data)
          let monday = [], tuesday = [], wednesday = [], thursday = [], friday = [], saturday = [], sunday = []
          res.data.forEach(cur => {
            switch (cur.weekday) {
              case 1:
                monday.push(cur)
                break;
              case 2:
                tuesday.push(cur)
                break;
              case 3:
                wednesday.push(cur)
                break;
              case 4:
                thursday.push(cur)
                break;
              case 5:
                friday.push(cur)
                break;
              case 6:
                saturday.push(cur)
                break;
              case 7:
                sunday.push(cur)
                break;
            }
          })
          let maxlen = Math.max(monday.length, tuesday.length, wednesday.length, thursday.length, friday.length, saturday.length, sunday.length)
          // console.log(maxlen)
          this.mealCalendar = []
          for (let i = 0 ; i < maxlen ; i++) {
            let meal = {}
            meal[1] = monday[i] ? monday[i] : ''
            meal[2] = tuesday[i] ? tuesday[i] : ''
            meal[3] = wednesday[i] ? wednesday[i] : ''
            meal[4] = thursday[i] ? thursday[i] : ''
            meal[5] = friday[i] ? friday[i] : ''
            meal[6] = saturday[i] ? saturday[i] : ''
            meal[7] = sunday[i] ? sunday[i] : ''
            console.log(meal)
            console.log(monday[0])
            this.mealCalendar.push(meal)
          }
        })
      },
      changePage (page) {
        this.search(page - 1)
      },
      changeStatus (value) {
        console.log(value)
      },
      submitAddMeal (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.clicked) {
              this.clicked = true
              api.addMeal(this.addMealForm).then(() => {
                this.clicked = false
                this.$notify.success({ title: '成功', message: '添加成功' })
                this.addMealDialog = false
                this.search()
              }).catch(() => {
                this.clicked = false
                this.addMealDialog = false
              })
            }
          }
        })
      },
      deleteMeal (row, weekday) {
        console.log(row[weekday].setName)
        api.deleteMeal({id: row[weekday].id}).then(() => {
          this.$notify.success({ title: '成功', message: '删除成功' })
          this.search()
        })
      }
    },
    activated () {
      this.search()
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