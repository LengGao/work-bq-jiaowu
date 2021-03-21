<template>
  <div class="student-detail">
    <div class="head_remind"></div>
    <section class="mainwrap">
      <div class="detail-header">
        <div class="header-item header-user">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3446442004,2207547936&fm=26&gp=0.jpg"
            alt=""
          />
          <span class="name">张小北</span>
        </div>
        <div class="header-item">ID：89757</div>
        <div class="header-item">手机号码：13535019963</div>
        <div class="header-item">身份证码：445454565656554565</div>
        <div class="header-item">注册日期：2020-05-30</div>
        <div class="header-item">
          <el-button type="primary">报名</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
        <el-tab-pane label="证件资料" name="Certificates"></el-tab-pane>
        <el-tab-pane label="报读班级" name="Class"></el-tab-pane>
        <el-tab-pane label="学习记录" name="LearningRecords"></el-tab-pane>
        <el-tab-pane label="学习轨迹" name="LearningTrack"></el-tab-pane>
        <el-tab-pane label="订单记录" name="OrderRecords"></el-tab-pane>
        <el-tab-pane label="跟进记录" name="FollowUpRecord"></el-tab-pane>
      </el-tabs>
      <component :is="getComponent" />
    </section>
  </div>
</template>

<script>
export default {
  name: "studentDetail",
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
};
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