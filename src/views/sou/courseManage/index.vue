<template>
  <div class="student-detail">
    <div class="head_remind"></div>
    <section class="mainwrap">
      <el-tabs v-model="activeName" style="margin-bottom: 10px">
        <el-tab-pane label="章节视频" name="chapterVideo"></el-tab-pane>
        <el-tab-pane label="课程资料" name="courseMaterials"></el-tab-pane>
        <!-- <el-tab-pane label="通用配置" name="generalConfig"></el-tab-pane> -->
      </el-tabs>
      <component :is="getComponent" />
    </section>
  </div>
</template>

<script>
export default {
  name: "configureCourses",
  data() {
    return {
      activeName: "chapterVideo",
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
.student-detail {
  .head_remind {
    padding: 0;
  }
}
</style>
