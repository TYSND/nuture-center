<template>
  <div class="nurse-content">
    <div class="title">
      <span class="title-content">护理内容</span>
      <span class="num">数量：{{totalNum}}</span>
    </div>
    <div class="interactive">
      <div class="btns">
        <el-button class="btn" type="primary" size="small" @click="$router.push('/nurse-content/add')">添加护理内容</el-button>
      </div>
    </div>
    <div class="search-res">
      <el-table
          ref="multipleTable"
          :data="nurseLevel"
          :span-method="objectSpanMethod"
          tooltip-effect="dark"
          border
          style="width: 100%">
        <el-table-column header-align="center" align="center"
                         prop="nurseLevel"
                         label="护理级别"
                         show-overflow-tooltip
                         min-width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="name"
                         label="护理内容"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="price"
                         label="护理内容详情"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         prop="description"
                         label="护理内容详情"
                         show-overflow-tooltip
                         min-width="90">
        </el-table-column>
        <el-table-column header-align="center" align="center"
                         label="操作"
                         min-width="100"
                         fixed="right">
          <template v-slot="scope">
            <div class="opt-links">
              <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>
              <el-link class="opt-link" type="danger" :underline="false" @click="mydelete(scope.row)">删除</el-link>
              <!--              <el-link class="opt-link" type="success" :underline="false" @click="setContent(scope.row)">设置护理内容</el-link>-->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import { mapMutations } from 'vuex'
  export default {
    name: "NurseContent",
    data () {
      return {
        totalNum: 0,
        levelPos: {},
        posList: [],
        curPos: 0,
        nurseLevel: [
          // {
          //   id: 1,
          //   nurseLevelId: 1,
          //   nurseLevel: '低',
          //   name: '吃饭',
          //   price: 100,
          //   description: '3.sssssss'
          // },
          // {
          //   id: 4,
          //   nurseLevelId: 3,
          //   nurseLevel: '高',
          //   name: '体检',
          //   price: 12,
          //   description: ' hfdrhtsgsdfdhgs'
          // },
          // {
          //   id: 2,
          //   nurseLevelId: 1,
          //   nurseLevel: '低',
          //   name: '睡觉',
          //   price: 243,
          //   description: 'asdf.2'
          // },
          // {
          //   id: 3,
          //   nurseLevelId: 3,
          //   nurseLevel: '高',
          //   name: '治病',
          //   price: 5342,
          //   description: 'dfcbxzewrasf'
          // },
          // {
          //   id: 4,
          //   nurseLevelId: 2,
          //   nurseLevel: '中',
          //   name: '洗澡',
          //   price: 12,
          //   description: ' hfdrhtsgsdfdhgs'
          // },
          // {
          //   id: 5,
          //   nurseLevelId: 3,
          //   nurseLevel: '高',
          //   name: '理疗',
          //   price: 543,
          //   description: 'afdsaefas'
          // }
        ]
      }
    },
    methods: {
      ...mapMutations(['setNurseContentInfo']),
      search () {
        api.getNurseContent().then(res => {
          this.nurseLevel = res.data
          this.totalNum = res.totalNum
          this.dealArr()
        })
      },
      changePage (page) {
        this.search(page)
      },
      changeStatus (value) {
        console.log(value)
      },
      edit (row) {
        console.log(row)
        this.setNurseContentInfo(row)
        this.$router.push('/nurse-content/edit')
      },
      mydelete (row) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteNurseContent({id: row.id}).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.search()
          })
        }).catch(() => {})
      },
      dealArr () {
        this.nurseLevel.sort((a, b) => a.nurseLevelId - b.nurseLevelId)
        this.levelPos = {}
        this.posList = []
        // this.curPos = 0
        if (this.nurseLevel.length > 0) {
          let curLevel = this.nurseLevel[0].nurseLevelId
          this.posList.push(0)
          this.nurseLevel.forEach((cur, index) => {
            if (cur.nurseLevelId !== curLevel) {
              this.posList.push(index)
              curLevel = cur.nurseLevelId
            }
          })
          this.posList.push(this.nurseLevel.length)
          this.posList.sort()
          for (let i = 0; i < this.posList.length-1; i++) {
            this.levelPos[this.posList[i]] = this.posList[i+1] - this.posList[i]
          }
        }
        console.log(this.levelPos)
      },
      objectSpanMethod ({ rowIndex, columnIndex }) {
        // row, column,
        // console.log(row, column, rowIndex, columnIndex)
        // console.log(rowIndex, columnIndex)
        // 第一列
        if (columnIndex === 0) {
          if (this.posList.indexOf(rowIndex) !== -1) {
            let rowspan = this.levelPos[rowIndex]
            return {
              rowspan: rowspan,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    activated () {
      this.search()
      // console.log(this.levelPos)
      api.getNurseLevel().then(res => {
        // console.log(res.data)
        let nl = {}
        res.data.forEach(cur => {
          nl[cur.id] = cur.name
        })
        localStorage.setItem('nurseLevel', JSON.stringify(nl))
      })
    }
  }
</script>

<style lang="less" scoped>
.nurse-content {
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