<template>
  <div class="student-detail">
    <section class="mainwrap" v-loading="detailLoading">
      <div class="detail-header">
        <div class="header-item header-user">
          <el-avatar
            :size="50"
            icon="el-icon-user-solid"
            :src="detailData.avatar"
          ></el-avatar>
          <span class="name">{{ detailData.surname || "--" }}</span>
          <el-tag
            type="success"
            v-if="detailData.is_new"
            size="mini"
            style="margin-left: 4px"
            >新</el-tag
          >
        </div>
        <div class="header-item">ID：{{ detailData.uid || "--" }}</div>
        <div class="header-item">
          手机号码：{{ detailData.mobile | filterPhone }}
        </div>
        <div class="header-item">
          身份证码：{{ detailData.id_card_number | filterIdCard }}
        </div>
        <div class="header-item">
          录入日期：{{ detailData.create_time || "--" }}
        </div>
        <div class="header-item">
          <el-button
            type="primary"
            v-if="!detailData.from_organization_id"
            @click="openSingUpDialog"
            >报名</el-button
          >
          <el-button type="primary" v-else @click="openCourseDialog = true"
            >开课</el-button
          >
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
        <el-tab-pane label="证件资料" name="Certificates"></el-tab-pane>
        <el-tab-pane label="订单记录" name="OrderRecords"></el-tab-pane>
        <el-tab-pane label="项目班级" name="Class"></el-tab-pane>
        <el-tab-pane label="学习记录" name="LearningRecords"></el-tab-pane>
        <el-tab-pane label="人脸识别记录" name="FaceRecord"></el-tab-pane>
        <el-tab-pane label="学习轨迹" name="LearningTrack"></el-tab-pane>
        <el-tab-pane label="用户日志" name="CustomerHistory"></el-tab-pane>
        <el-tab-pane label="东培菜单" name="Dongpeinav"></el-tab-pane>
      </el-tabs>
      <component
        :is="getComponent"
        @on-basic-success="getStudentBasicDetail"
        :datas="detailData"
        :uid="$route.query.uid"
      />
    </section>
    <!-- 报名 -->
    <CreateOrderDialog v-model="signUpDialog" :user-info="detailData" />
    <!-- 开课 -->
    <AddStudent v-model="openCourseDialog" :user-info="detailData" />
  </div>
</template>

<script>
import { getStudentBasicDetail } from "@/api/eda";
import CreateOrderDialog from "@/views/crm/crmCustomer/components/CreateOrderDialog";
import AddStudent from "@/views/crm/eduOpenClass/components/AddStudent";
export default {
  name: "studentDetail",
  components: {
    AddStudent,
    CreateOrderDialog,
  },
  data() {
    return {
      activeName: "BasicInfo",
      detailData: {},
      detailLoading: false,
      signUpDialog: false,
      dialogVisible: false,
      openCourseDialog: false,
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  activated() {
    this.getStudentBasicDetail();
  },
  methods: {
    openSingUpDialog() {
      this.signUpDialog = true;
    },
    //学生基本信息
    async getStudentBasicDetail() {
      const data = {
        uid: this.$route.query?.uid || "",
      };
      this.detailLoading = true;
      const res = await getStudentBasicDetail(data);
      this.detailLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
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
