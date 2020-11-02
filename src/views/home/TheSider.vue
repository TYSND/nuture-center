<template>
  <div class="the-sider">
    <el-menu
        @select="select"
        class="menu"
        :default-active="idx"
        :collapse="collapse"
        background-color="#f5f5f5"
        text-color="#101010">
      <el-menu-item v-for="menu in menus" :key="menu.route" :index="menu.route">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "TheSider",
    props: ['collapse'],
    data () {
      return {
        idx: '/bed-manage',
        menus: [
          {
            name: '床位管理',
            route: '/bed-manage',
            icon: 'el-icon-s-home'
          },
          {
            name: '护理内容',
            route: '/nurse-content',
            icon: 'el-icon-s-data'
          },
          {
            name: '客户列表',
            route: '/customer-list',
            icon: 'el-icon-s-custom'
          },
          {
            name: '护理记录',
            route: '/nurse-history',
            icon: 'el-icon-s-order'
          },
          {
            name: '膳食日历',
            route: '/meal-calendar',
            icon: 'el-icon-s-shop'
          },
          // {
          //   name: '膳食管理',
          //   route: '/meal-manage',
          //   icon: 'el-icon-s-ticket'
          // },
          {
            name: '入住登记',
            route: '/check-in',
            icon: 'el-icon-s-claim'
          },
          {
            name: '退住登记',
            route: '/check-out',
            icon: 'el-icon-s-release'
          },
          {
            name: '外出登记',
            route: '/go-out',
            icon: 'el-icon-s-promotion'
          },
          // {
          //   name: '设置服务对象',
          //   route: '/service-obj',
          //   icon: 'el-icon-s-management'
          // },
          {
            name: '服务关注',
            route: '/buy-history',
            icon: 'el-icon-message-solid'
          }
        ]
      }
    },
    watch: {
      $route () {
        this.idx = this.$route.path
      }
    },
    methods: {
      select (idx) {
        this.idx = idx
        if (idx !== this.$route.path) {
          this.$router.push(idx)
        } else {
          return false
        }
      }
    },
    created () {
      this.idx = this.$route.path
    }
  }
</script>

<style lang="less" scoped>
.the-sider {
    display: block;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;

    .menu:not(.el-menu--collapse) {
      width: 200px;

      .el-menu-item {
        width: 200px;
      }
    }

    .menu.el-menu--collapse {
      .el-menu-item {
        width: 64px;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>