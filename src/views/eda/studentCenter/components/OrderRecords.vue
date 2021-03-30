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
          min-width="160"
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
              <el-button
                type="text"
                v-if="excludes(row, 0)"
                @click="openOrderActions(row, 1)"
                >收款</el-button
              >
              <el-button
                type="text"
                v-if="excludes(row, 5)"
                @click="openOrderActions(row, 2)"
                >退款</el-button
              >
              <el-button
                type="text"
                v-if="excludes(row, 4)"
                @click="openOrderActions(row, 3)"
                >作废</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <CollectionOrder
      v-model="orderActionDialog"
      :type="dialogType"
      :orderInfo="dialogInfo"
      @on-success="getOrderList"
    />
  </div>
</template>

<script>
import CollectionOrder from "@/views/fina/components/CollectionOrder";
import { getOrderList } from "@/api/eda";
export default {
  name: "orderRecords",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    CollectionOrder,
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
      orderActionDialog: false,
      dialogInfo: {},
      dialogType: 1,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 按钮操作
    excludes(row, type) {
      const auth = {
        0: row.overdue_money > 0, // 收款
        4: ![4, 5].includes(row.pay_status) && row.pay_money > 0, // 退款
        5: ![4, 5].includes(row.pay_status), // 作废
      };
      return auth[type];
    },
    openOrderActions(row, type) {
      this.dialogType = type;
      this.dialogInfo = row;
      this.orderActionDialog = true;
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