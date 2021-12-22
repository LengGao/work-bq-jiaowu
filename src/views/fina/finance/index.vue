<template>
  <div class="student-detail">
    <div class="head_remind"></div>
    <section class="mainwrap">
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
          录入日期：{{ detailData.create_time || "--" }}
        </div>
        <div class="header-item">
          <el-button
            type="primary"
            @click="openSingUpDialog"
            v-if="!detailData.aid"
            >报名</el-button
          >
          <el-button type="primary" disabled v-else>已报名</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
        <el-tab-pane label="证件资料" name="Certificates"></el-tab-pane>
        <el-tab-pane label="学习记录" name="LearningRecords"></el-tab-pane>
        <el-tab-pane label="订单记录" name="OrderRecords"></el-tab-pane>
        <el-tab-pane label="用户日志" name="CustomerHistory"></el-tab-pane>
      </el-tabs>
      <component
        :is="getComponent"
        @on-basic-success="getStudentBasicDetail"
        :datas="detailData"
        :uid="$route.query.uid"
      />
      <!-- 报名 -->
      <CustomeSignUp v-model="signUpDialog" :user-info="detailData" />
    </section>
  </div>
</template>

<script>
import { getStudentBasicDetail } from "@/api/eda";
import CustomeSignUp from "@/views/crm/crmCustomer/components/CustomeSignUp";
export default {
  name: "cusdetail",
  components: {
    CustomeSignUp,
  },
  data() {
    return {
      signUpDialog: false,
      activeName: "BasicInfo",
      detailData: {},
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () =>
          import(`../../eda/studentCenter/components/${this.activeName}.vue`);
      }
    },
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
      const uid = this.$route.query?.uid;
      const cid = this.$route.query?.cid;
      const data = {};
      if (uid && uid != 0) {
        data.uid = uid;
      } else if (cid) {
        data.cid = cid;
      } else {
        data.uid = "";
      }
      const res = await getStudentBasicDetail(data);
      if (res.code === 0) {
        console;
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
