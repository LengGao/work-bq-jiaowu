<template>
  <div class="student-detail">
    <div class="head_remind"></div>
    <section class="mainwrap">
      <el-tabs v-model="activeName" style="margin-bottom:10px">
        <el-tab-pane label="章节视频" name="videoUpload"></el-tab-pane>
        <el-tab-pane label="课程资料" name="studyMaterial"></el-tab-pane>
        <el-tab-pane label="通用配置" name="Class"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'videoUpload',
      detailData: {},
    }
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`)
      }
    },
  },
  created() {},
  methods: {
    //学生基本信息
  },
}
</script>

<style lang="scss" scoped>
.student-detail {
  .head_remind {
    padding: 0;
  }
  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #606266;
    font-size: 14px;
    margin-bottom: 20px;
    .header-user {
      display: flex;
      align-items: center;
      .name {
        font-weight: 550;
        margin-left: 16px;
        font-size: 16px;
        color: #303133;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
