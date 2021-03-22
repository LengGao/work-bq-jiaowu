<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <el-submenu :index="index + ''" v-if="item.children">
        <template slot="title">
          <i :class="['iconfont', item.icon || '']"></i>
          <span>{{ item.name }}</span>
        </template>
        <MenuItem :data="item.children" :defaultPath="item.path" />
      </el-submenu>
      <el-menu-item
        v-else
        :index="`${defaultPath}${reg(item.path) ? '' : '/'}${item.path}`"
      >
        <i :class="['iconfont', item.icon || '']"></i
        >{{ item.name }}</el-menu-item
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    defaultPath: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    reg(path) {
      return /^\//.test(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 22px;
  margin-right: 8px;
}
</style>