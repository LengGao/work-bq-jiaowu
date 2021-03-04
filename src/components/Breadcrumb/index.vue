<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        v-if="item.meta.title"
      >
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <router-link v-else :to="item.redirect || item.path">{{
          item.meta.title
        }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  created() {
    this.getBreadcrumb()
  },
  mounted() {},
  data() {
    return {
      levelList: null,
      route: [],
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name)
      console.log(matched)
      const first = matched[0]
      if (first && first.name !== 'Home') {
        matched = [].concat(matched)
      }
      this.levelList = matched
      // this.change()
      console.log(this.levelList)
    },
    change() {
      let routers = this.$router.apps[0].$children[0].$children[0].$children[0]
        .routes //获取全部路由对象
      let name = this.$route.matched[0].name //当前一级路由对象的标识
      let names = this.$route.name //当前二级路由对象的标识
      console.log(routers, name, names)
      for (let item of routers) {
        if (item.name == name) {
          // 匹配一级路由
          this.levelList.push(item)
          console.log(item.children)
          for (let items of item.children) {
            if (items.name == names) {
              console.log(items) //匹配二级路由
              this.levelList.push(items)
            }
          }
        }
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
