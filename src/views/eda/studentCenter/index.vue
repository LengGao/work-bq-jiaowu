<template>
  <div class="student-center">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="学生中心" name="studentCenterList"></el-tab-pane>
      <el-tab-pane label="用户中心" name="userCenter"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>

<script>
export default {
  name: "studentCenter",
  data() {
    return {
      activeName: "studentCenterList",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.student-center {
  .tabs {
    padding: 16px 16px 0 16px;
  }
}
</style>
