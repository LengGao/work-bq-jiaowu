<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
}
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
</style>
