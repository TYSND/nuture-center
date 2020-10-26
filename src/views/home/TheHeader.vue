<template>
  <div class="the-header">
    <div class="logo">
      <i class="el-icon-menu" @click="$emit('collapse')"></i>
      <img src="@/assets/logo.png" alt="Logo" @click="goIndex">
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheHeader",
    methods: {
      goIndex () {
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.the-header {
    height: 60px;
    padding: 0 20px;
    background-color: #3D85C6;
    .logo {
      height: 60px;
      line-height: 60px;
      float: left;
      color: #fff;
      font-size: 20px;
      .el-icon-menu {
        cursor: pointer;
        vertical-align: middle;
      }
      img{
        height: 40px;
        width: auto;
        vertical-align: middle;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      float: right;
      margin: 10px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
    }
    .auth-btn{
      float: right;
      background-color: #ffffff;
      height: 30px;
      width: 80px;
      margin: 15px 10px;
      border-radius: 4px;
      vertical-align: middle;
      border: 0;
      outline: none;
      cursor: pointer;
    }
    .el-dropdown {
      height: 60px;
      line-height: 60px;
      float: right;
      cursor: pointer;
      .el-dropdown-link {
        color: #fff;
      }
    }
  }
</style>