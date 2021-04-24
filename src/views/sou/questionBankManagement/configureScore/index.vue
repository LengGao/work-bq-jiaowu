   <!--分数配置 -->
<template>
  <div class="configure-score">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本配置" name="BasicInfo"></el-tab-pane>
      <el-tab-pane label="历年真题配置" name="FollowUpRecord"></el-tab-pane>
      <el-tab-pane label="模拟考试配置" name="Certificates"></el-tab-pane>
      <el-tab-pane label="自主出题配置" name="CustomerHistory"></el-tab-pane>
    </el-tabs>
    <component
      :is="getComponent"
      @on-basic-success="getStudentBasicDetail"
      :datas="detailData"
      :uid="detailData.uid"
    />
  </div>
</template>

<script>
export default {
  name: "ConfigureScore",
  data() {
    return {
      activeName: "BasicInfo",
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
<style lang="scss" scoped>
</style>
