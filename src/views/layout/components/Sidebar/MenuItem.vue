<template>
  <div>
    <div v-for="(item, index) in data" :key="item.id">
      <el-submenu :index="index + ''" v-if="item.children">
        <template slot="title">
          <i :class="['iconfont', item.icon || '']"></i>
          <span>{{ item.name }}</span>
        </template>
        <MenuItem :data="item.children" :defaultPath="item.path" />
      </el-submenu>
      <el-menu-item
        v-else
        :class="{ 'p-l': item.path === '/visualization' && isCollapse }"
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
    isCollapse: {
      type: Boolean,
      default: false,
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
.p-l {
  padding-left: 10px !important;
}
</style>