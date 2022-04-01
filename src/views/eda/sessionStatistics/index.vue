<template>
  <div class="student-center">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="学历教育" name="EducationList"></el-tab-pane>
      <el-tab-pane label="职称教育" name="GradeManage"></el-tab-pane>
      <el-tab-pane label="费用统计" name="ExpenseStatistics"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>

<script>
export default {
  name: "sessionStatistics",
  data() {
    return {
      activeName: "EducationList",
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
