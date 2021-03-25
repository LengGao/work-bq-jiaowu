<template>
  <div class="class">
    <!--订单记录-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="order_no"
          label="订单编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="pay_status"
          label="订单状态"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ statusMap[row.pay_status] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="订单总价"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="reduction"
          label="优惠金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="order_money"
          label="应收金额"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ (row.order_money - row.reduction).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_money"
          label="实收金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="overdue_money"
          label="欠缴金额"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span class="overdue-money">{{ row.overdue_money }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="{ row }">
            <div class="operation_btn">
              <el-button type="text" @click="linkTo(row.id)">收款</el-button>
              <el-button type="text" @click="linkTo(row.id)">退费</el-button>
              <el-button type="text" @click="linkTo(row.id)">作废</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/eda";
export default {
  name: "orderRecords",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      statusMap: {
        0: "待验证/等待付款",
        1: "新订单/待入账/已付款",
        2: "部分入账",
        3: "已入账",
        4: "已作废",
        5: "已退款",
      },
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    linkTo(id) {
      console.log(id);
    },
    //订单列表
    async getOrderList() {
      this.checkedIds = [];
      this.listLoading = true;
      const data = {
        uid: this.uid,
      };
      const res = await getOrderList(data);
      this.listLoading = false;
      this.listData = res.data.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.overdue-money {
  color: #f67979;
}
</style>