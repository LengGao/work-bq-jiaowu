<template>
  <scroll-bar>
    <!-- <div style="color:#fff;"><img :src="logo" alt="logo" class="img-style" /></div> -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import logo from '@/assets/images/logo.jpg'
export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      logo,
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'routers']),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>
<style lang="scss" scoped>
.img-style {
  width: 139px;
  height: 40px;
  margin: auto;
  display: block;
}
</style>
