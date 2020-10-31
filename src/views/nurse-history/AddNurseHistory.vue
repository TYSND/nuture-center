<template>
  <div class="add-nurse-history">
    <el-form
        ref="form"
        :model="form"
        label-position="top"
        label-width="100px"
        size="medium"
        :rules="rules">
      <el-form-item label="用户" prop="customerId">
        <el-select class="form-item" v-model="form.customerId" placeholder="用户">
          <el-option
              v-for="(val, key) in customerList"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护理内容" prop="nurseContentId">
        <el-select class="form-item" v-model="form.nurseContentId" placeholder="护理内容">
          <el-option
              v-for="(val, key) in nurseContent"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护理时间" prop="timestamp">
        <el-date-picker
            v-model="form.timestamp"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" :loading="clicked" @click="submit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: "AddNurseHistory",
    data () {
      return {
        form: {
          customerId: '',
          nurseContentId: '',
          timestamp: ''
        },
        clicked: false,
        customerList: {
          2: '王二'
        },
        nurseContent: {},
        rules: {
          customerId: [
            {required: true, message: '请选择用户', trigger: 'blur'}
          ],
          nurseContentId: [
            {required: true, message: '请选择护理内容', trigger: 'blur'}
          ],
          timestamp: [
            {required: true, message: '请选择时间', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.clicked) {
              this.clicked = true
              api.addNurseHistory(this.form).then(() => {
                this.clicked = false
                this.$notify.success({ title: '成功', message: '新增成功' })
                this.$router.push('/nurse-history')
              })
            }
            console.log(this.form)
          }
        })
      }
    },
    activated () {
      this.nurseContent = JSON.parse(localStorage.getItem('nurseContent'))
      console.log(this.nurseContent)
    }
  }
</script>

<style lang="less" scoped>
.add-nurse-history {}
</style>