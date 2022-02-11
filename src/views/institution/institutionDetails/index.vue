<template>
  <div class="institution-detail">
    <h4>{{ $route.query.institution_name }}</h4>
    <el-tabs v-model="activeName">
      <el-tab-pane label="机构课程" name="InsitutionCourse"></el-tab-pane>
      <!-- <el-tab-pane label="机构课程" name="BasicInfo"></el-tab-pane> -->
      <el-tab-pane label="机构题库" name="InsitutionQuestion"></el-tab-pane>
      <el-tab-pane label="机构项目" name="InsitutionProject"></el-tab-pane>
      <el-tab-pane label="院校专业" name="DistributeMajor"></el-tab-pane>
      <el-tab-pane label="机构学生" name="InsitutionStudent"></el-tab-pane>
      <el-tab-pane label="机构公海" name="InsitutionSeas"></el-tab-pane>
      <el-tab-pane label="资金流水" name="CapitalFlow"></el-tab-pane>
      <el-tab-pane label="学生订单" name="StudentOrder"></el-tab-pane>
      <el-tab-pane label="学生对接" name="StudentDocking"></el-tab-pane>
      <el-tab-pane
        label="机构回款"
        name="InstitutionalCollection"
      ></el-tab-pane>
      <el-tab-pane label="机构返点" name="InstitutionalRebate"></el-tab-pane>
      <el-tab-pane label="机构概览" name="InstitutionalPreview"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" />
  </div>
</template>

<script>
export default {
  name: "institutionDetails",
  data() {
    return {
      activeName: "InsitutionCourse",
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
<style lang="scss" scoped>
.institution-detail {
  padding: 20px;
}
</style>
