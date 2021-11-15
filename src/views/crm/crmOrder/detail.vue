<template>
  <div class="change-detail">
    <div class="change-title">
      <h3>仅退款-张小北-系统集成项目管理师</h3>
      <span
        class="change-status"
        :type="verifyStatusMap[detailData.verify_status].type"
        >{{ verifyStatusMap[detailData.verify_status].text }}</span
      >
      <!-- <el-button type="primary" class="btn-edit">编辑</el-button>
      <el-button>删除</el-button> -->
    </div>
    <el-steps
      simple
      style="margin: 20px 0"
      v-if="detailData.verify_status != 3"
    >
      <el-step
        :title="`${item.staff_name}审批`"
        v-for="(item, index) in detailData.verify_step"
        :status="
          index === 0 && item.status === 0
            ? 'process'
            : approveStatuMap[item.status]
        "
        :key="index"
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
import { getCrmOrderDetail } from "@/api/crm";
export default {
  name: "changeDetail",
  data() {
    return {
      activeName: "BasicInfo",
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        verify_status: 1,
      },
      approveStatuMap: {
        0: "wait",
        1: "wait",
        2: "wait",
        3: "success",
        8: "error",
        9: "error",
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
    async getCrmOrderDetail() {
      const data = {
        order_id: this.$route.query.id,
      };
      const res = await getCrmOrderDetail(data);
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


