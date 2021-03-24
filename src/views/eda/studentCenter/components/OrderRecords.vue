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
          prop="id"
          label="订单编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="订单状态"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="订单总价"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="优惠金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="应收金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_id"
          label="实收金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_books"
          label="欠缴金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

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

<style>
</style>