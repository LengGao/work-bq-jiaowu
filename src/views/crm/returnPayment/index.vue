<template>
  <div class="approve-manage">
    <div class="head_remind">*管理查看所有回款入账信息</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="招生回款" name="recruitStudents"></el-tab-pane>
        <el-tab-pane label="渠道回款" name="changeApprove"></el-tab-pane>
        <el-tab-pane label="机构详细回款" name="orgCollection"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "returnPayment",
  data() {
    return {
      activeName: "recruitStudents",
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

