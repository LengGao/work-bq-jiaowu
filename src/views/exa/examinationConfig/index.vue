<template>
  <!-- 考试配置 -->
  <div class="examination-config">
    <div class="head_remind">*本模块主要用于新建考试科目和配置考试规则。</div>
    <el-tabs
      v-model="activeName"
      class="examination-tab"
      @tab-click="handleTabChange"
    >
      <el-tab-pane label="考试科目" name="Subject"></el-tab-pane>
      <el-tab-pane label="报考规则" name="Rule"></el-tab-pane>
    </el-tabs>
    <component
      :is="getComponent"
      class="examination-content"
      @change="handleChange"
      :subjectId="subjectId"
    />
  </div>
</template>

<script>
export default {
  name: "examinationConfig",
  data() {
    return {
      activeName: "Subject",
      subjectId: "",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  methods: {
    handleTabChange() {
      this.subjectId = "";
    },
    handleChange(componentName, id) {
      this.subjectId = id;
      this.activeName = componentName;
    },
  },
};
</script>

<style  lang="scss" scoped>
.examination-config {
  .examination-tab {
    padding: 0 20px;
  }
  .examination-content {
    padding: 20px;
  }
}
</style>