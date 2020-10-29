<template>
  <div class="add-check-out">
    add check out
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "AddCheckOut",
    data () {
      return {
        theCheckOutInfo: {}
      }
    },
    computed: {
      ...mapState(['checkOutInfo'])
    },
    methods: {

    },
    activated () {
      console.log(this.checkOutInfo)
      this.theCheckOutInfo = this.checkOutInfo
    }
  }
</script>

<style lang="less" scoped>
.add-check-out {}
</style>