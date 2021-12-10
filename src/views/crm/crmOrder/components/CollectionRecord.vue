<template>
  <div class="refund-record">
    <div class="header">
      <div>
        <span class="title">订单总金额：</span>
        <span class="value">￥{{ data.order_money }} </span>
      </div>
      <div>
        <span class="title">已回款金额：</span>
        <span class="value">￥{{ data.pay_money }} </span>
      </div>
      <div>
        <span class="title">未回款金额：</span>
        <span class="value">￥{{ data.overdue_money }} </span>
      </div>
      <div class="actions">
        <el-button type="primary" @click="handleAddPlan"
          >配置回款计划</el-button
        >
        <el-button type="primary" @click="handleAdd">添加回款记录</el-button>
      </div>
    </div>
    <Title text="回款记录" style="margin-top: 20px"></Title>
    <el-table
      :data="data.pay_log"
      style="width: 100%; border: 1px solid #eee; border-bottom: none"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#f8f8f8',
      }"
    >
      <el-table-column
        label="序号"
        show-overflow-tooltip
        min-width="70"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        min-width="140"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="回款金额"
        prop="pay_money"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="pay_type"
        label="支付方式"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="pay_plan_sort"
        label="关联期次"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="收款人员"
        align="center"
        prop="admin_name"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="备注信息"
        align="center"
        min-width="100"
        prop="tips"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="入账状态"
        prop="pay_status"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ payStatusMap[row.pay_status] || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="verify_time"
        label="入账时间"
        min-width="160"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="160"
      >
        <template slot-scope="{ row }">
          <el-button type="text">催办</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <p class="placeholder">或</p> -->
    <Title text="回款计划" style="margin-top: 20px"></Title>
    <div class="term">
      <!-- <div class="term-header">
        <i class="el-icon-notebook-2"></i>
        <div class="info-item">
          <span>第1期回款计划：</span>
          <span>2021-11-01 </span>
        </div>
        <div class="info-item">
          <span>应收：</span>
          <span>¥ 2500.00</span>
        </div>
        <div class="info-item">
          <span>已收：</span>
          <span> ¥ 2500.00</span>
        </div>
        <div class="info-item">
          <span>进度：</span>
          <span>100%</span>
        </div>
      </div> -->
      <el-table
        :data="data.pay_plan"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="计划期次"
          show-overflow-tooltip
          min-width="70"
          align="center"
        >
          <template slot-scope="{ $index: index }">
            <span>第{{ index + 1 }}期</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="day"
          label="计划回款日期"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="计划回款金额"
          prop="money"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已回款金额"
          prop="money"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_progress"
          label="回款进度"
          min-width="90"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              class="progress"
              :class="{
                'progress--wait': +(row.pay_progress || '').split('%')[0] > 0,
                'progress--success':
                  +(row.pay_progress || '').split('%')[0] >= 100,
              }"
              >{{ row.pay_progress }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_day"
          label="回款时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <AddCollectionRecord
      v-model="dialogVisible"
      :title="dialogTitle"
      :order-id="data.order_id"
      @on-success="$parent.getCrmOrderDetail"
      :plan-options="data.pay_plan"
    />
    <AddCollectionPlan
      v-model="planDialogVisible"
      :title="planDialogTitle"
      :order-id="data.order_id"
      @on-success="$parent.getCrmOrderDetail"
    />
  </div>
</template>

<script>
import AddCollectionRecord from "./AddCollectionRecord.vue";
import AddCollectionPlan from "./AddCollectionPlan.vue";
export default {
  name: "CollectionRecord",
  components: {
    AddCollectionRecord,
    AddCollectionPlan,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        pay_log: [],
        pay_plan: [],
      }),
    },
  },
  data() {
    return {
      currentId: "",
      dialogTitle: "",
      dialogVisible: false,
      planDialogVisible: false,
      planDialogTitle: "",
      // 1：待入账，3、已入账 ，4、已作废， 5、已退款
      payStatusMap: {
        1: "待入账",
        3: "已入账",
        4: "已作废",
        5: "已退款",
      },
    };
  },
  methods: {
    handleAddPlan() {
      this.currentId = "";
      this.planDialogTitle = "配置回款计划";
      this.planDialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加回款记录";
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .value {
    color: #199fff;
    margin-right: 20px;
  }
  .title {
    color: #333;
    font-weight: 550;
  }
  .actions {
    margin-left: auto;
  }
}
.progress {
  color: #999;
  &--wait {
    color: #fe7d00;
  }
  &--success {
    color: #43d100;
  }
}
.placeholder {
  padding: 20px 0;
  text-align: center;
}
.term {
  border: 1px solid #eee;
  border-bottom: none;
  margin-top: 20px;
  &-header {
    display: flex;
    align-items: center;
    color: #666;
    padding: 16px;
    background-color: #f2f6fc;
    .info-item {
      padding: 0 10px;
    }
  }
}
</style>
