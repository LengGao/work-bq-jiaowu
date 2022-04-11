<template>
  <el-dialog
    title="订单列表"
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
        <!-- <el-table-column
          prop="order_id"
          label="订单编号"
          show-overflow-tooltip
          min-width="160"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toCrmOrderDetail(scope.row.order_id)"
            >
              {{ scope.row.order_no }}
            </el-button>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="90"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="toStudentDetail(scope.row.uid)">
              {{ scope.row.surname }}
            </el-button>
          </template> -->
        </el-table-column>
        <!-- <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="130"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column> -->
        <el-table-column
          prop="jiebie_name"
          label="届别名称"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="from"
          label="客户来源"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="220"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="业绩归属"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="total_money"
          label="订单总金额"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.total_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="学费金额"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.order_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="other_money"
          label="其他金额"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.other_money | moneyFormat }}
          </template>
        </el-table-column>

        <el-table-column
          prop="pay_money"
          label="已回款金额"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.pay_money | moneyFormat }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="pay_progress"
          label="回款进度"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-progress
              :percentage="+(row.pay_progress || '').split('%')[0] || 0"
            ></el-progress>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="pay_status"
          label="支付状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" :type="row.pay_status | orderTagType">{{
              row.pay_status | orderStatus
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_status"
          label="审批状态"
          min-width="100"
          style="overflow: auto"
          class-name="badge"
        >
          <template slot-scope="{ row }">
            <el-badge :value="row.reshuffle ? '异' : ''" class="item">
              <el-tag
                size="small"
                :type="verifyStatusMap[row.verify_status || 1].type"
              >
                {{ verifyStatusMap[row.verify_status || 1].text }}
              </el-tag>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_status"
          label="合同状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              v-if="row.order_id"
              size="small"
              :type="statusMap[row.contract_status || 0].type"
            >
              {{ statusMap[row.contract_status || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
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
import { getCrmOrderList } from "@/api/crm.js";
export default {
  name: "OrderDialog",
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
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      statusMap: {
        0: {
          text: "未生成",
          type: "info",
        },
        1: {
          text: "未审核",
          type: "primary",
        },
        2: {
          text: "已审核",
          type: "success",
        },
        3: {
          text: "已驳回",
          type: "danger",
        },
        4: {
          text: "签署完成",
          type: "success",
        },
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
          type: "danger",
        },
      },
    };
  },
  methods: {
    handleOpen() {
      this.getCrmOrderList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getCrmOrderList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCrmOrderList();
    },
    async getCrmOrderList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        // pay_status: "1,2,3",
        // verfity_status: 1,
        staff_id: this.userIds.length
          ? this.userIds.join(",")
          : this.$store.getters.userInfo.staff_id,
        date: (this.date || []).join(" - "),
      };
      this.listLoading = true;
      const res = await getCrmOrderList(data);
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
</style>