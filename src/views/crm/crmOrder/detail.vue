<template>
  <div class="change-detail" v-loading="loading">
    <div class="change-title">
      <h3>{{ detailData.surname }}-{{ detailData.project_name }}</h3>
      <span
        v-if="!detailData.is_deleted"
        class="change-status"
        :type="verifyStatusMap[detailData.verify_status || 1].type"
        >{{ verifyStatusMap[detailData.verify_status || 1].text }}</span
      >
      <span v-else class="change-status" type="del">该订单已删除</span>
      <div class="btn-edit">
        <el-button
          type="primary"
          v-if="detailData.verify_status === 3 && detailData.is_my_review !== 1"
          @click="toOrderChange"
          >申请异动</el-button
        >
        <el-button
          type="primary"
          v-if="detailData.verify_status === 1 && detailData.is_my_review !== 1"
          @click="ActionConfirm(3)"
          >撤回</el-button
        >
        <el-button
          @click="ActionConfirm(4)"
          v-if="detailData.verify_status === 8 && !detailData.is_deleted"
          >删除</el-button
        >
        <el-button
          v-if="detailData.is_my_review"
          type="danger"
          @click="approveConfirm(2)"
          >驳回</el-button
        >
        <el-button
          v-if="detailData.is_my_review"
          type="primary"
          @click="approveConfirm(1)"
          >通过</el-button
        >

        <el-button
          v-if="detailData.verify_status === 2"
          type="primary"
          @click="hurryUp"
          >催办</el-button
        >
      </div>
    </div>
    <el-steps simple style="margin: 20px 0" v-if="detailData.verify_status">
      <el-step
        :title="`${detailData.submit_name || ''}提交审批`"
        status="success"
      ></el-step>
      <el-step
        :title="`${item.staff_name}${statusText[item.status]}`"
        v-for="(item, index) in detailData.verify_step"
        :status="approveStatuMap[item.status]"
        :key="index"
      ></el-step>
      <el-step
        title="审批完成`"
        :status="detailData.verify_status === 3 ? 'success' : 'wait'"
        v-if="![8, 9].includes(detailData.verify_status)"
      ></el-step>
    </el-steps>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
      <el-tab-pane label="回款记录" name="CollectionRecord"></el-tab-pane>
      <el-tab-pane label="审批记录" name="ApproveRecord"></el-tab-pane>
    </el-tabs>
    <component :is="getComponent" :data="detailData" />
  </div>
</template>

<script>
import { getCrmOrderDetail, crmOrderApprove, hurryUp } from "@/api/crm";
export default {
  name: "crmOrderDetail",
  data() {
    return {
      activeName: "BasicInfo",
      loading: false,
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        verify_status: 0,
      },
      approveStatuMap: {
        0: "wait",
        1: "wait",
        2: "finish",
        3: "success",
        8: "error",
        9: "error",
      },
      statusText: {
        0: "审批",
        3: "审批通过",
        8: "撤销审批",
        9: "驳回审批",
      },
      verifyStatusMap: {
        1: {
          text: "待审核",
          type: "info",
        },
        2: {
          text: "（多人）审核中",
          type: "primary",
        },
        3: {
          text: "审核通过",
          type: "success",
        },
        8: {
          text: "已撤销审核",
          type: "info",
        },
        9: {
          text: "驳回不通过",
          type: "error",
        },
      },
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {
    this.getCrmOrderDetail();
  },
  methods: {
    toOrderChange() {
      this.$router.push({
        name: "applyChange",
        query: {
          id: this.$route.query.id,
        },
      });
    },
    // 催办
    async hurryUp() {
      const data = {
        order_id: this.detailData.order_id,
      };
      const res = await hurryUp(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 审批订单
    approveConfirm(action) {
      this.$prompt("请输入备注", action === 2 ? "驳回" : "通过", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.approveCrmOrder(action, value);
        })
        .catch(() => {});
    },
    async approveCrmOrder(action, tips) {
      const data = {
        order_id: this.detailData.order_id,
        action,
        tips,
      };
      const res = await crmOrderApprove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCrmOrderDetail();
      }
    },
    // 撤销删除订单
    ActionConfirm(action) {
      this.$confirm(
        `确定要${action === 4 ? "删除" : "撤销"}此订单吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(() => {
          this.crmOrderApprove(action);
        })
        .catch(() => {});
    },
    async crmOrderApprove(action) {
      const data = {
        order_id: this.detailData.order_id,
        action,
      };
      const res = await crmOrderApprove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCrmOrderDetail();
      }
    },
    async getCrmOrderDetail() {
      const data = {
        order_id: this.$route.query.id,
      };
      this.loading = true;
      const res = await getCrmOrderDetail(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
  },
};
</script>
<style lang="less">
.change-detail {
  padding: 16px;
  .change-title {
    display: flex;
    align-items: center;
    .btn-edit {
      margin-left: auto;
    }
    .change-status {
      margin-left: 20px;
      color: #999;
      &::before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #999;
        border-radius: 50%;
        margin-right: 4px;
      }
      &[type="del"] {
        color: #fd6500;
        &::before {
          background-color: #fd6500;
        }
      }
      &[type="primary"] {
        &::before {
          background-color: #1999ff;
        }
      }
      &[type="success"] {
        &::before {
          background-color: #43d100;
        }
      }
      &[type="warning"] {
        &::before {
          background-color: #fdc400;
        }
      }
      &[type="error"] {
        &::before {
          background-color: #fd6500;
        }
      }
    }
  }
}
.el-step__head.is-success,
.el-step__title.is-success {
  color: #199fff;
  border-color: #199fff;
}
</style>


