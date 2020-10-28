<template>
  <div class="add-check-in">
    add check in
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "AddCheckIn",
    data () {
      return {
        theCheckInInfo: {}
      }
    },
    computed: {
      ...mapState(['checkInInfo'])
    },
    methods: {

    },
    activated () {
      console.log(this.checkInInfo)
      this.theCheckInInfo = this.checkInInfo
    }
  }
</script>

<style lang="less" scoped>
.add-check-in {

}
</style>