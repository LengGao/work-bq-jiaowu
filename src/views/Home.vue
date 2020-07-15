<template>
  <div class="home">

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  mounted() {
    console.log($('div'), 'qwe')
  },
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss">
.main {
  position: fixed;
  left: 180px;
  top: 60px;
  bottom: 0;
  right: 0;
  padding: 20px;
  overflow-y: auto;
  padding-bottom: 0;
  background-color: #f5f5f5;
}
</style>