<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    }
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false
      //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true //再打开
      })
    },
  },
}
</script>
<style lang="scss">
// #app{
//   height: 100%;
//   width: 100%;
// }
html {
  background: #f0f2f5;
}
</style>
