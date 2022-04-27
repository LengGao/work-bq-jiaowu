<template>
  <div class="crm-order-detail" v-loading="loading">
    <el-alert
      type="warning"
      show-icon
      class="unusual-reason"
      v-if="
        detailData.reshuffle &&
        detailData.reshuffle_list &&
        detailData.reshuffle_list.length
      "
    >
      <p style="border-bottom: 1px solid #fff; padding-bottom: 6px">
        {{ detailData.reshuffle_list[unusualIndex].reason }}
      </p>
      <p style="padding-top: 6px">
        {{ detailData.reshuffle_list[unusualIndex].desc }}
      </p>
    </el-alert>
    <div class="change-title">
      <h3>{{ detailData.surname }}-{{ detailData.project_name }}</h3>
      <el-tag
        size="small"
        style="margin-left: 10px"
        :type="detailData.pay_status | orderTagType"
        >{{ detailData.pay_status | orderStatus }}</el-tag
      >
      <el-tag
        style="margin-left: 10px"
        size="small"
        :type="verifyTypeMap[detailData.final_type || 0].type"
      >
        {{ verifyTypeMap[detailData.final_type || 0].text }}
      </el-tag>
      <template v-if="!detailData.is_deleted">
        <span
          v-if="
            detailData.reshuffle &&
            detailData.reshuffle_list &&
            detailData.reshuffle_list.length
          "
          class="change-status"
          :type="
            unusualStatusMap[detailData.reshuffle_list[unusualIndex].status]
              .type
          "
          >{{
            unusualStatusMap[detailData.reshuffle_list[unusualIndex].status]
              .text
          }}</span
        >
        <span
          v-else
          class="change-status"
          :type="verifyStatusMap[detailData.final_status || 1].type"
          >{{ verifyStatusMap[detailData.final_status || 1].text }}</span
        >
      </template>

      <span v-else class="change-status" type="del">该订单已删除</span>
      <div class="btn-edit">
        <template v-if="$route.query.isFromApprove">
          <!-- 异动审批 -->
          <template v-if="$route.query.isOrderUnusual">
            <el-button
              v-if="
                detailData.reshuffle_list &&
                detailData.reshuffle_list[0].my_reshuffle_review
              "
              type="danger"
              @click="approveConfirm(2)"
              >驳回</el-button
            >
            <el-button
              v-if="
                detailData.reshuffle_list &&
                detailData.reshuffle_list[0].my_reshuffle_review
              "
              type="primary"
              @click="approveConfirm(1)"
              >通过</el-button
            >
          </template>
          <!-- 订单审批 -->
          <template v-else>
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
          </template>
        </template>
        <template v-else>
          <el-button
            @click="dialogVisible = true"
            v-if="detailData.refund_button"
            >退款作废</el-button
          >
          <el-button
            type="primary"
            v-if="detailData.pay_status < 4 && !detailData.reshuffle"
            @click="toOrderChange"
            >申请异动</el-button
          >
          <el-button
            type="primary"
            v-if="detailData.verify_status === 1 && !detailData.reshuffle"
            @click="ActionConfirm(3)"
            >撤回</el-button
          >
          <el-button
            @click="ActionConfirm(4)"
            v-if="detailData.verify_status === 8 && !detailData.is_deleted"
            >删除</el-button
          >

          <el-button
            v-if="detailData.verify_status < 3"
            type="primary"
            @click="hurryUp"
            >催办</el-button
          >
        </template>
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
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息" name="BasicInfo"></el-tab-pane>
      <el-tab-pane label="回款记录" name="CollectionRecord"></el-tab-pane>
      <el-tab-pane label="审批记录" name="ApproveRecord"></el-tab-pane>
      <el-tab-pane
        v-if="orderTransactionData.length"
        label="学籍异动"
        name="StudentStatusChangeRecord"
      ></el-tab-pane>
      <el-tab-pane
        :label="`${unusualLabelName}-${index + 1}`"
        :name="`${unusualLabelName}-${index + 1}`"
        v-for="(item, index) in detailData.reshuffle_list"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <el-alert
      class="reject-tips"
      v-if="
        activeName.includes(unusualLabelName) &&
        detailData.reshuffle_list[unusualIndex].status === 3
      "
      title="驳回原因："
      :description="detailData.reshuffle_list[unusualIndex].tips || '--'"
      type="error"
    >
    </el-alert>
    <!-- <p
      class="reject-tips"
      v-if="
        activeName.includes(unusualLabelName) &&
        detailData.reshuffle_list[unusualIndex].status === 3
      "
    >
      驳回原因：{{ detailData.reshuffle_list[unusualIndex].tips || "--" }}
    </p> -->
    <component
      :is="getComponent"
      :list-data="orderTransactionData"
      :data="detailData"
      :changeIndex="unusualIndex"
    />
    <RefundDialog
      v-model="dialogVisible"
      :order-info="detailData"
      @success="getCrmOrderDetail"
    />
  </div>
</template>

<script>
import {
  getCrmOrderDetail,
  crmOrderApprove,
  hurryUp,
  orderUnusualApprove,
  getOrderTransactionList,
} from "@/api/crm";
import RefundDialog from "./components/RefundDialog";
export default {
  name: "crmOrderDetail",
  components: {
    RefundDialog,
  },
  data() {
    return {
      activeName: "BasicInfo",
      loading: false,
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        step_list: [],
        verify_status: 0,
        final_status: 1,
      },
      verifyTypeMap: {
        0: {
          text: "新订单",
          type: "success",
        },
        1: {
          text: "申请退款",
          type: "warning",
        },
        2: {
          text: "申请作废",
          type: "danger",
        },
        3: {
          text: "申请退差价",
          type: "warning",
        },
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
        1: "审批",
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
      unusualStatusMap: {
        0: {
          text: "异动待审核",
          type: "info",
        },
        1: {
          text: "异动审核中",
          type: "primary",
        },
        2: {
          text: "异动审核通过",
          type: "success",
        },
        3: {
          text: "异动驳回不通过",
          type: "error",
        },
      },
      unusualIndex: 0,
      unusualLabelName: "异动记录",
      orderTransactionData: [],
      dialogVisible: false,
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        let componentName = this.activeName.includes(this.unusualLabelName)
          ? "ChangeRecord"
          : this.activeName;
        return () => import(`./components/${componentName}.vue`);
      }
    },
  },
  activated() {
    this.getCrmOrderDetail();
    this.getOrderTransactionList();
  },
  created() {
    this.getCrmOrderDetail();
    this.getOrderTransactionList();
  },
  methods: {
    async getOrderTransactionList() {
      const data = { order_id: this.$route.query.id };
      const res = await getOrderTransactionList(data);
      if (res.code === 0) {
        this.orderTransactionData = res.data;
      }
    },
    handleTabClick(e) {
      const label = e.label;
      if (label.includes(this.unusualLabelName)) {
        this.unusualIndex = label.split("-")[1] - 1;
      }
    },
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
      // 是否是异动审批
      const isOrderUnusual = !!this.$route.query.isOrderUnusual;
      let data = {
        order_id: this.detailData.order_id,
        action,
        tips,
      };
      if (isOrderUnusual) {
        data = {
          id: this.detailData.reshuffle,
          verify: action,
          tips,
        };
      }
      const approveApi = isOrderUnusual ? orderUnusualApprove : crmOrderApprove;
      const res = await approveApi(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$router.back();
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
      const verify_id = this.$route.query.verify_id;
      const data = {
        order_id: this.$route.query.id,
        verify_id,
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
.crm-order-detail {
  padding: 16px;
  .unusual-reason {
    background-color: olive;
    margin-bottom: 10px;
    color: #fff;
    p {
      color: #fff;
      font-size: 14px;
    }
  }
  .reject-tips {
    margin-bottom: 10px;
  }
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


