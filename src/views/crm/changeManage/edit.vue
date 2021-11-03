<template>
  <div class="change-edit">
    <el-tabs v-model="activeName">
      <el-tab-pane label="仅退款" name="RefundOnly"></el-tab-pane>
      <el-tab-pane label="退课退款" name="RefundAndWithdrawal"></el-tab-pane>
      <el-tab-pane label="跟换项目" name="ReplacementItems"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>

<script>
export default {
  name: "changeEdit",
  data() {
    return {
      activeName: "RefundOnly",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less">
.change-edit {
  padding: 16px;
}
</style>


