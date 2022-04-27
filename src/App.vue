<template>
  <!-- <el-scrollbar style="height:100%"> -->
  <div id="app" v-if="isRouterAlive">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
  <!-- </el-scrollbar> -->
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  beforeCreate() {
    // if (
    //   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    //   )
    // ) {
    //   window.location = "http://m.edu.beiqujy.com";
    // }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>
<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
/deep/.el-scrollbar__thumb {
  display: none;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}
html {
  background: #f0f2f5;
}
.question-type-popover.el-popover {
  min-width: 0;
  padding: 6px 0;
}
</style>
