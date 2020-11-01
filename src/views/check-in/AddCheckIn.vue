<template>
  <div class="add-check-in">
    <el-form
        ref="form"
        :model="form"
        label-position="top"
        label-width="100px"
        size="medium"
        :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input class="form-item" v-model="form.name" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input class="form-item" v-model="form.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select class="form-item" v-model="form.sex" placeholder="请选择性别">
          <el-option
              v-for="val in sexList"
              :key="val"
              :label="val"
              :value="val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="床位" prop="sex">
        <el-select class="form-item" v-model="form.bedId" placeholder="请选择床位">
          <el-option
              v-for="(val, key) in bedList"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="健康管家" prop="housekeeperId">
        <el-select class="form-item" v-model="form.housekeeperId" placeholder="请选择健康管家">
          <el-option
              v-for="(val, key) in houseKeeper"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护理等级" prop="nurseLevelId">
        <el-select class="form-item" v-model="form.nurseLevelId" placeholder="护理级别">
          <el-option
              v-for="(val, key) in nurseLevel"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住时间" prop="checkInTime">
        <el-date-picker
            v-model="form.checkInTime"
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
  import api from '@/api/api';

  export default {
    name: "AddCheckIn",
    data () {
      return {
        form: {
          name: '',
          age: '',
          sex: '',
          bedId: '',
          housekeeperId: '',
          nurseLevelId: '',
          checkInTime: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请填写年龄', trigger: 'blur'},
            { pattern: /^\d+$/, message: '必须是数字', trigger: ['blur', 'change'] }
          ],
          bedId: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          housekeeperId: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          nurseLevelId: [
            {required: true, message: '请选择护理内容', trigger: 'blur'}
          ],
          checkInTime: [
            {required: true, message: '请选择时间', trigger: 'blur'},
          ],

        },
        clicked: false,
        sexList: {
          1: '男',
          2: '女'
        },
        bedList: {},
        houseKeeper: {},
        nurseLevel: {}
      }
    },
    methods: {
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.clicked) {
              this.clicked = true
              api.addCustomer(this.form).then(() => {
                this.clicked = false
                this.$notify.success({ title: '成功', message: '登记成功' })
                this.$router.push('/check-in')
              }).catch(() => {
                this.clicked = false
              })
            }
          }
        })
      }
    },
    activated() {
      this.bedList = JSON.parse(localStorage.getItem('bedList'))
      this.houseKeeper = JSON.parse(localStorage.getItem('houseKeeper'))
      this.nurseLevel = JSON.parse(localStorage.getItem('nurseLevel'))
    }
  }
</script>

<style lang="less" scoped>
.add-check-in {

}
</style>