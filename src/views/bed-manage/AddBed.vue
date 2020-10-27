<template>
  <div class="add-bed">
    add edit
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "AddBed",
    data () {
      return {
        theBedInfo: {}
      }
    },
    computed: {
      ...mapState(['bedInfo'])
    },
    methods: {

    },
    activated () {
      console.log(this.bedInfo)
      this.theBedInfo = this.bedInfo
    }
  }
</script>

<style lang="less" scoped>
.add-bed {

}
</style>