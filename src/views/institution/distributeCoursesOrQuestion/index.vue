<template>
  <div class="distribute">
    <div class="head_remind">*将课程/题库批量分发给入驻机构</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="分发课程" name="distributeCourses"></el-tab-pane>
        <el-tab-pane
          label="分发题库"
          name="distributeQuestionBak"
        ></el-tab-pane>
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
      activeName: "distributeCourses",
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

