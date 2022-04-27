<template>
  <div class="distribute">
    <div class="head_remind">*将项目/院校专业批量分发给入驻机构</div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="分发项目" name="distributeProject"></el-tab-pane>
        <el-tab-pane
          label="分发院校专业"
          name="distributeEducation"
        ></el-tab-pane>
        <el-tab-pane label="班型管理" name="classType"></el-tab-pane>
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
      activeName: "distributeProject",
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

