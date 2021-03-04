<template>
  <div class="wrapper-container">
    <el-scrollbar style="height:100%">
      <imgSpace
        @handleSelectionChange="handleSelectionChange"
        :pathRoute="pathRoute"
      />
    </el-scrollbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      pathRoute: '',
    }
  },
  mounted() {
    console.log(this.$route.query.pathRoute)
    this.pathRoute = this.$route.query.pathRoute
  },
  methods: {
    handleSelectionChange(val) {},
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-scrollbar__thumb {
  display: none;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
