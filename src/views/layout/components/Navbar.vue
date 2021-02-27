<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></hamburger>
    <breadcrumb></breadcrumb>
    <div class="function-container">
      <!-- <div class="top-function-wrapper">
        <span style="color: #199FFF;">业务流程图</span>
      </div> -->
      <div class="top-function-wrapper">
        <svg-icon icon-class="clearStorage"></svg-icon>
        <span>清除缓存</span>
      </div>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" />
        <i class="el-icon-caret-bottom"></i>
        <span>总管理员</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display: block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .function-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 155px;
    display: flex;
    top: 0;
    span {
      position: relative;
      right: -0px;
      top: -15px;
      font-size: 16px;
    }
    .top-function-wrapper {
      cursor: pointer;
      margin: auto;
      margin-right: 80px;
      display: flex;
      align-items: center;
      span {
        position: relative;
        top: 0px;
        font-size: 16px;
      }
      .svg-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    display: flex;
    top: 0;
    span {
      position: relative;
      right: -0px;
      top: -15px;
      font-size: 16px;
    }
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
