<template>
  <div class="college-major">
    <div class="head_remind">
      *管理本机构合作的所有院校层次专业等学历基础信息
    </div>
    <div class="college-major-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="学历形式" name="EducationType"></el-tab-pane>
        <el-tab-pane label="院校配置" name="UniversityConfigure"></el-tab-pane>
        <el-tab-pane label="层次配置" name="UniversityLevel"></el-tab-pane>
        <el-tab-pane label="专业配置" name="UniversityMajor"></el-tab-pane>
        <el-tab-pane label="院校专业管理" name="MajorList"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CollegeMajor",
  data() {
    return {
      activeName: "EducationType",
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
.college-major {
  &-container {
    padding: 10px 20px;
  }
}
</style>