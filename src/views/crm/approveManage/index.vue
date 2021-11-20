<template>
  <div class="approve-manage">
    <div class="head_remind">*管理查看所有订单审批和异动审批</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="招生订单" name="orderApprove"></el-tab-pane>
        <!-- <el-tab-pane label="异动审批" name="changeApprove"></el-tab-pane> -->
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "approveManage",
  data() {
    return {
      activeName: "orderApprove",
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
.container {
  padding: 16px;
}
</style>

