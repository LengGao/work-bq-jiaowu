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
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SCollectionRecord",
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
      // 1：待入账，3、已入账 ，4、已作废， 5、已退款
      payStatusMap: {
        1: "待入账",
        3: "已入账",
        4: "已作废",
        5: "已退款",
      },
    };
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
}
</style>
