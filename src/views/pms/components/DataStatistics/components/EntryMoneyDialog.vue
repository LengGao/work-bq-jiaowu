<template>
  <el-dialog
    title="入账列表"
    :visible="value"
    width="80%"
    :close-on-click-modal="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <!--列表-->
    <div class="userTable">
      <el-table
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
        height="550"
        top="5vh"
      >
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="100"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="coursDetail(scope.row.uid)">
              {{ scope.row.surname }}
            </el-button>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="pay_date"
          label="回款日期"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="plan_info"
          label="关联计划"
          show-overflow-tooltip
          min-width="220"
        >
        </el-table-column>

        <el-table-column
          prop="pay_money"
          label="回款金额"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.pay_money | moneyFormat }}
          </template>
        </el-table-column>

        <el-table-column
          prop="pay_type"
          label="支付方式"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="业绩归属"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="department_name"
          label="部门名称"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="回款创建日期"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="verify_status"
          label="入账状态"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.verify_status == 0"
              class="approve-status approve-status--none"
              >未入账</span
            >
            <span
              v-if="row.verify_status == 1"
              class="approve-status approve-status--success"
              >已入账</span
            >
            <span v-if="row.verify_status == 2" class="approve-status"
              >已驳回 <i class="el-icon-question" :title="row.tips"></i>
            </span>
            <span v-if="row.verify_status == 3" class="approve-status--wait"
              >多级审批中
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_time"
          label="入账时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getPayLogList } from "@/api/workbench.js";
export default {
  name: "EntryMoneyDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Array,
      default: () => [],
    },
    userIds: {
      type: Array,
      default: () => [],
    },
    returnedType: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
    };
  },
  methods: {
    handleOpen() {
      this.getPayLogList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getPayLogList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getPayLogList();
    },
    async getPayLogList() {
      const [start_date, end_date] = this.date || [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        is_entry: 1,
        returned_type: this.returnedType,
        arr_uid: this.userIds.length
          ? this.userIds
          : [this.$store.getters.userInfo.staff_id],
        start_date,
        end_date,
      };
      this.listLoading = true;
      const res = await getPayLogList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
</style>