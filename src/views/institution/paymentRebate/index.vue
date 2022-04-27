<template>
  <div class="distribute">
    <div class="head_remind">*管理机构回款/机构返点数据。</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="机构回款"
          name="institutionalCollection"
        ></el-tab-pane>
        <el-tab-pane label="订单回款" name="collectionList"></el-tab-pane>
        <el-tab-pane label="机构返点" name="institutionalRebate"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "paymentRebate",
  data() {
    return {
      activeName: "institutionalCollection",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}/index.vue`);
      }
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less">
.container {
  padding: 16px;
}
</style>

