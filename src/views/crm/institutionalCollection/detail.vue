<template>
  <div class="student-order-detail" v-loading="loading">
    <div class="student-order-title">
      <h3>{{ orderData.org_name }}-回款{{ orderData.receivable_money }}元</h3>
      <span class="student-order-status">机构回款订单</span>
      <div class="actions">
        <el-button
          type="primary"
          v-if="$route.query.isFromList && orderData.check_state == 2"
          @click="addCollectionVisible = true"
          >再次回款</el-button
        >
        <el-button
          type="danger"
          v-if="$route.query.isFromApproval && orderData.check_state == 0"
          @click="rejectConfirm"
          >驳 回</el-button
        >
        <el-button
          type="primary"
          v-if="$route.query.isFromApproval && orderData.check_state == 0"
          @click="approveConfirm"
          >入 账</el-button
        >

        <el-tag
          type="success"
          v-if="$route.query.isFromApproval && orderData.check_state == 2"
          >已入账</el-tag
        >
        <el-tag type="danger" v-if="orderData.check_state == -1">已驳回</el-tag>
      </div>
    </div>
    <Title text="回款信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">回款日期：</span>
        <span class="info-item__value">{{ orderData.pay_date }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">机构名称：</span>
        <span class="info-item__value">{{ orderData.org_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ orderData.staff_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">关联订单数：</span>
        <span class="info-item__value">{{ orderData.order_num }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">回款总金额：</span>
        <span class="info-item__value"
          >￥{{ orderData.receivable_money || 0 }}</span
        >
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ orderData.note || "--" }}</span>
      </div>
    </div>
    <Title text="关联订单"></Title>
    <el-table
      :data="listData"
      style="border: 1px solid #f1f1f1"
      v-loading="false"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#f8f8f8',
      }"
    >
      <el-table-column
        label="订单编号"
        min-width="200"
        align="center"
        prop="order_no"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="toStudentOrderDetail(row.order_id)">{{
            row.order_no
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="create_time"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="客户姓名"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="project_name"
        label="项目名称"
        min-width="220"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="订单总金额"
        align="center"
        min-width="100"
        prop="order_money"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> ￥{{ row.order_money || 0 }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="本次回款金额"
        align="center"
        min-width="100"
        prop="pay_money"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> ￥{{ row.receivable_money || 0 }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="已回款金额"
        align="center"
        min-width="100"
        prop="pay_money"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> ￥{{ row.pay_money || 0 }} </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="progress"
        label="已回款进度"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-progress :percentage="+row.progress || 0"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="success_progress"
        label="审批后回款进度"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-progress :percentage="+row.success_progress || 0"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="支付状态"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag size="small" :type="row.pay_status | orderTagType">{{
            row.pay_status | orderStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="100"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="toStudentOrderDetail(row.order_id)"
            >订单详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <AddCollection
      v-model="addCollectionVisible"
      :id="orderData.id"
      @on-success="getReceivableInfo"
    />
  </div>
</template>

<script>
import { getReceivableInfo, reviewReceivableOrder } from "@/api/crm";
import AddCollection from "./components/AddCollection";
export default {
  name: "institutionalCollectionDetail",
  components: {
    AddCollection,
  },
  data() {
    return {
      loading: false,
      orderData: {},
      listData: [],
      addCollectionVisible: false,
    };
  },
  created() {
    this.getReceivableInfo();
  },
  methods: {
    // 驳回
    rejectConfirm() {
      this.$prompt("请输入驳回原因", "入账驳回", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.reviewReceivableOrder(-1, value);
        })
        .catch(() => {});
    },
    // 入账
    approveConfirm() {
      this.$confirm(`是否确定该笔回款入账？`, "提示", {
        type: "warning",
      })
        .then(() => {
          this.reviewReceivableOrder(2);
        })
        .catch(() => {});
    },
    async reviewReceivableOrder(check_state, rejected_note) {
      const data = {
        log_id: this.$route.query.id,
        rejected_note,
        check_state,
      };
      const res = await reviewReceivableOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getReceivableInfo();
        check_state === 2 && this.$router.back();
      }
    },
    async getReceivableInfo() {
      const data = {
        log_id: this.$route.query.id,
      };
      this.loading = true;
      const res = await getReceivableInfo(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.orderData = res.data.data;
        this.listData = res.data.list;
      }
    },
    toStudentOrderDetail(id) {
      this.$router.push({
        name: "studentOrderDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="less">
.student-order-detail {
  padding: 16px;
  .student-order-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .actions {
      margin-left: auto;
      margin-right: 30px;
    }
    .student-order-status {
      margin-left: 20px;
      color: #999;
      &::before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #43d100;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 300px;
        line-height: 1.5;
      }
    }
  }
}
</style>


