<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  .el-table th.gutter {
    display: table-cell !important;
  }
  * {
    box-sizing: border-box;
    font-family: Microsoft YaHei, Arial, Georgia, Serif, sans-serif;
  }
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family:  Microsoft Yahei, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .clearfix::after {
    display: table;
    content: "";
    clear: both;
  }
  .el-form-item__label {
    line-height: 20px !important;
  }
  .el-textarea__inner {
    resize: none !important;
  }
  .el-card__body{
    padding: 0 !important;
    height: 100%;
    overflow-y: auto;
  }

  .el-table {
    font-size: 14px!important;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #535353 #ededed;
  }
  *::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    display: inline;
  }
  *::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 8px;
    box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.1);
    background   : #DDDDDD;
  }
  *::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /*box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    border-radius: 8px;
    background: rgba(255,255,255,0);
  }
</style>
