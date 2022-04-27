<template>
  <section class="app-main">
    <transition name="main" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive :include="$store.getters.cacheArr">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
};
</script>
<style lang="scss" scoped>
.app-main {
  position: relative;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
// 主内容区动画
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  transition: all 0.15s;
}
.main-enter {
  opacity: 0;
  margin-left: -20px;
}
.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
