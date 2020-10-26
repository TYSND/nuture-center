<template>
  <div class="home-view">
    <the-header @collapse="toggle"></the-header>
    <the-sider :collapse="isCollapse"></the-sider>
    <el-card class="main" :style="style">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
  import TheHeader from '@/views/home/TheHeader'
  import TheSider from '@/views/home/TheSider'
  export default {
    name: "HomeView",
    components: { TheHeader, TheSider },
    data () {
      return {
        isCollapse: false,
        style: {
          left: '200px'
        }
      }
    },
    methods: {
      toggle () {
        this.isCollapse = !this.isCollapse
        this.style.left = this.style.left === '200px' ? '64px' : '200px'
      }
    }
  }
</script>

<style lang="less" scoped>
.home-view {
  width: 100%;
  height: 100%;

  .main {
    margin: 10px;
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    border-radius: 0;
    transition: left 0.3s linear;
    overflow-y: auto;
    padding: 20px;
  }
}
</style>