<template>
  <div class="add-bed">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="床位编号" prop="roomNumber">
        <el-input v-model="form.roomNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">创建</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import api from '@/api/api.js'
  export default {
    name: "AddBed",
    data () {
      return {
        theBedInfo: {},
        form: {
          roomNumber: null
        }
      }
    },
    computed: {
      ...mapState(['bedInfo'])
    },
    methods: {
      submit () {
        api.addBed({roomNumber: this.form.roomNumber}).then(res => {
          this.$notify.success({
            title: '成功',
            message: '添加成功'
          })
          this.$router.push('/bed-manage')
          console.log(res)
        })
      },
      reset () {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
.add-bed {
  .el-form {
    width: 50%;
  }
}
</style>