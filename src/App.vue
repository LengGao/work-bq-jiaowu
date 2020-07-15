<template>
  <div id="app">
    <router-view name="header"></router-view>
    <section class="main" id="main" v-if="isRouterAlive">
      <transition name="fade" mode="out-in">
        <router-view name="content" class v-if="isRouterAlive"></router-view>
      </transition>
    </section>
    <router-view name="slider"></router-view>
     <router-view name="login" class v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
      logining:this.logining // 应对login以及404和其他特殊布局页面
    };
  },
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
    };
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
    logining(){
        this.isRouterAlive = false;
         this.$nextTick(function() {
        this.isRouterAlive = false; //再打开
      });
    }
  }
};
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
  background-color: #f5f5f5;
}

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
// .main {
//   position: fixed;
//   left: 180px;
//   top: 60px;
//   bottom: 0;
//   right: 0;
//   padding: 20px;
//   overflow-y: auto;
//   padding-bottom: 0;
//   background-color: #f5f5f5;
// }
// @media screen and (max-width: 1000px) {
//   .main {
//     padding: 15px;
//   }
// }
</style>
