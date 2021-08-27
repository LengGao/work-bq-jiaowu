<template>
  <div class="student-detail">
    <section class="mainwrap" v-loading="detailLoading">
      <div class="detail-header">
        <div class="header-item header-user">
          <el-avatar :size="50" icon="el-icon-user-solid"></el-avatar>
          <span class="name">{{ detailData.surname || "--" }}</span>
        </div>
        <div class="header-item">ID：{{ detailData.uid || "--" }}</div>
        <div class="header-item">
          手机号码：{{ detailData.mobile | filterPhone }}
        </div>
        <div class="header-item">
          身份证码：{{ detailData.id_card_number | filterIdCard }}
        </div>
        <div class="header-item">
          注册日期：{{ detailData.create_time || "--" }}
        </div>
        <div class="header-item">
          <el-button type="primary" @click="openSingUpDialog">报名</el-button>
          <el-button type="primary" disabled v-if="false">已报名</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >教材发放</el-button
          >
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
        <el-tab-pane label="证件资料" name="Certificates"></el-tab-pane>
        <el-tab-pane label="项目班级" name="Class"></el-tab-pane>
        <el-tab-pane label="学习记录" name="LearningRecords"></el-tab-pane>
        <el-tab-pane label="订单记录" name="OrderRecords"></el-tab-pane>
        <el-tab-pane label="人脸识别记录" name="FaceRecord"></el-tab-pane>
        <el-tab-pane label="学习轨迹" name="LearningTrack"></el-tab-pane>
        <el-tab-pane label="用户日志" name="CustomerHistory"></el-tab-pane>
      </el-tabs>
      <component
        :is="getComponent"
        @on-basic-success="getStudentBasicDetail"
        :datas="detailData"
        :uid="detailData.uid"
      />
    </section>
    <!-- 报名 -->
    <CustomeRegist v-model="signUpDialog" :userInfo="detailData" />
    <!-- 发放教材 -->
    <GrantTeachMaterials
      v-model="dialogVisible"
      :ids="[detailData.uid]"
      :projectInfo="projectInfo"
    />
  </div>
</template>

<script>
import GrantTeachMaterials from "@/views/eda/components/GrantTeachMaterials";
import { getStudentBasicDetail } from "@/api/eda";
import CustomeRegist from "@/views/etm/components/customeRegist";
export default {
  name: "studentDetail",
  components: {
    CustomeRegist,
    GrantTeachMaterials,
  },
  data() {
    return {
      activeName: "BasicInfo",
      detailData: {},
      detailLoading: false,
      signUpDialog: false,
      dialogVisible: false,
      projectInfo: {},
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
  created() {
    this.getStudentBasicDetail();
  },
  methods: {
    openSingUpDialog() {
      this.signUpDialog = true;
    },
    //学生基本信息
    async getStudentBasicDetail() {
      const data = {
        uid: this.$route.query?.id || "",
      };
      this.detailLoading = true;
      const res = await getStudentBasicDetail(data);
      this.detailLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
        this.projectInfo = {
          uid: res.data.uid,
          project_id: res.data.project_id,
        };
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
