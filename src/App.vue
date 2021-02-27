<template>
  <div id="app">
    <router-view name="header"></router-view>
    <section class="main"
             id="main">
      <transition name="fade"
                  mode="out-in">
        <router-view name="content"
                     class
                     v-if="isRouterAlive"></router-view>
      </transition>
    </section>
    <router-view name="slider"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
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
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  position: fixed;
  left: 240px;
  top: 95px;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  padding-bottom: 0;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media screen and (max-width: 1000px) {
  .main {
    padding: 15px;
  }
}
</style>
