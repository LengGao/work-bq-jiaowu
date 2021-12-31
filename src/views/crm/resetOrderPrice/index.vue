<template>
  <div class="distribute">
    <div class="head_remind">*本模块用来重置项目/学历订单价格。</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="项目订单" name="resetProjectPrice"></el-tab-pane>
        <el-tab-pane label="学历订单" name="resetEduOrderPrice"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "distribute",
  data() {
    return {
      activeName: "resetProjectPrice",
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

