<template>
  <scroll-bar>
    <transition name="fade">
      <div v-if="sidebar.opened">
        <div class="img-style">
          <router-link to="/" tag="li"><img :src="logo" alt="logo" /></router-link>
        </div>
        <!-- <div>
          <el-button type="primary" icon="el-icon-plus" @click="something"
            >快捷功能1</el-button
          >
          <transition name="fade">
            <ul v-if="showMenu" class="ul">
              <li
                v-for="(item, index) in content"
                :key="item.name"
                @click="doActive(index)"
                :class="{ active: index == current }"
              >
                <router-link :to="item.links" tag="li">
                  <svg-icon :icon-class="item.icon"></svg-icon>
                  <span class="MyClassFun">{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </div> -->
      </div>
    </transition>
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#380638" text-color="#bfcbd9" :unique-opened="true" :collapse-transition="true" active-text-color="#409EFF" @select="handleMenuSelect" style="overflow: hidden" router>
      <!-- <sidebar-item :routes="routes"></sidebar-item> -->
      <MenuItem :data="menuData" />
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
// import SidebarItem from "./SidebarItem";
import MenuItem from './MenuItem'
import ScrollBar from '@/components/ScrollBar'
import logo from '@/assets/images/logos.png'
export default {
  // components: { SidebarItem, ScrollBar },
  components: { ScrollBar, MenuItem },
  data() {
    return {
      logo,
      showMenu: false,
      current: -1,
      content: [
        {
          name: '我的客户',
          links: '/etm/enrollmentManagement',
          icon: 'colorMyClient',
        },
        {
          name: '查询学员',
          links: '/etm/queryStudent',
          icon: 'myQueryStudent',
        },
        { name: '班级管理', links: '/eda/classManage', icon: 'MyClassMan' },
        { name: '直播管理', links: '/eda/liveManager', icon: 'MyVideoMan' },
      ],
    }
  },
  methods: {
    handleMenuSelect(index, indexPath) {
      console.log(indexPath)
      // this.$route
      // this.breads = indexPath
    },
    something() {
      this.showMenu = !this.showMenu
    },
    doActive(index) {
      this.current = index
      this.something()
    },
  },
  computed: {
    ...mapGetters(['sidebar', 'routers', 'menus']),
    menuData() {
      return this.menus
    },
    routes() {
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
  width: 150px;
  margin: 30px 22px;
}
.el-button--primary {
  background-color: #1890ff !important ;
  width: 170px !important;
  margin-top: 12px;
  margin-left: 15px;
}
.ul {
  width: 170px;
  height: 200px;
  list-style: none;
  background: #ffffff;
  position: relative;
  left: 15px;
  top: 15px;
  border-radius: 5px;
  z-index: 99;
  margin-bottom: 15px;
}
.ul > li {
  height: 50px;
  font-size: 12px;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 2px;
}
.ul > li:hover {
  background: #2798ee;
}
.ul > li > li {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s cubic-bezier(0.42, 0, 1, 1);
}
/* 定义进入动画的初始状态*/
.fade-enter {
  height: 0;
}
/* 定义进入动画的结束状态*/
.fade-enter-to {
  height: 200px;
}
/* 定义离开动画的初始状态*/
.fade-leave {
  height: 200px;
}
/* 定义离开动画的结束状态*/
.fade-leave-to {
  height: 0;
}
.active {
  color: rgb(10, 53, 145);
  background: rgba(216, 17, 17, 0.04);
}
.svg-icon {
  font-size: 18px;
  margin: 0 !important;
  margin-right: 8px !important;
  color: rgb(10, 53, 145);
}
.MyClassFun {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 14px;
}
// 选中状态
/deep/.el-menu-item.is-active {
  background-color: #220422 !important;
}
</style>
