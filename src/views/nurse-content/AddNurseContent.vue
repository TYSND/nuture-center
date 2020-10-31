<template>
  <div class="add-nurse-content">
    <el-form
        ref="form"
        :model="form"
        label-position="top"
        label-width="100px"
        size="medium"
        :rules="rules">
      <el-form-item label="护理级别" prop="nurseLevelId">
        <el-select class="form-item" v-model="form.nurseLevelId" placeholder="护理级别">
          <el-option
              v-for="(val, key) in nurseLevel"
              :key="key"
              :label="val"
              :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护理内容" prop="name">
        <el-input class="form-item" v-model="form.name" placeholder="请输入护理内容"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input class="form-item" v-model="form.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input class="form-item" v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" :loading="clicked" @click="submit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api/api'
  import { mapState } from 'vuex'
  export default {
    name: "AddNurseContent",
    data () {
      return {
        clicked: false,
        nurseLevel: {},
        form: {
          nurseLevelId: '',
          name: '',
          price: 0,
          description: ''
        },
        rules: {
          nurseLevelId: [
            {required: true, message: '请选择护理级别', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入护理内容', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请填写价格', trigger: 'blur'},
            { pattern: /^\d+$/, message: '必须是数字', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      ...mapState(['nurseContentInfo'])
    },
    methods: {
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.clicked) {
              this.clicked = true
              // let a = {
              //   ...this.form,
              //   id: this.nurseContentInfo.id
              // }
              // console.log('a',a)
              if (this.$route.path === '/nurse-content/edit') {
                api.editNurseContent({
                  ...this.form,
                  id: this.nurseContentInfo.id
                }).then(() => {
                  this.clicked = false
                  this.$notify.success({ title: '成功', message: '编辑成功' })
                  this.$router.push('/nurse-content')
                }).catch(() => {
                  this.clicked = false
                })
              } else {
                api.addNurseContent(this.form).then(() => {
                  this.clicked = false
                  this.$notify.success({ title: '成功', message: '新增成功' })
                  this.$router.push('/nurse-content')
                }).catch(() => {
                  this.clicked = false
                })
              }
            }
          }
        })
      }
    },
    created () {
      // this.nurseLevel = {
      //   1: "一级",
      //   2: "十级↵"
      // }
      this.nurseLevel = JSON.parse(localStorage.getItem('nurseLevel'))
      console.log(this.nurseLevel)
    },
    activated () {
      if (this.$route.path === '/nurse-content/edit') {
        this.form.nurseLevelId = this.nurseContentInfo.nurseLevelId.toString()
        this.form.name = this.nurseContentInfo.name
        this.form.price = this.nurseContentInfo.price
        this.form.description = this.nurseContentInfo.description
      } else {
        this.form = {
          nurseLevelId: '',
          name: '',
          price: 0,
          description: ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.add-nurse-content {

}
</style>