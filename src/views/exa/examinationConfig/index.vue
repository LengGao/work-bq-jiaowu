<template>
  <!-- 考试配置 -->
  <div class="examination-config">
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>
    <el-tabs v-model="activeName" class="examination-tab">
      <el-tab-pane label="考试科目" name="Subject"></el-tab-pane>
      <el-tab-pane label="报考规则" name="Rule"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" class="examination-content" />
  </div>
</template>

<script>
export default {
  name: "examinationConfig",
  data() {
    return {
      activeName: "Subject",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  methods: {},
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