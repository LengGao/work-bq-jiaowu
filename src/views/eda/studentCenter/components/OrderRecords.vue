<template>
  <div class="class">
    <!--订单记录-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSeletChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="order_id"
          label="订单编号"
          show-overflow-tooltip
          min-width="190"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toCrmOrderDetail(scope.row.order_id)"
            >
              {{ scope.row.order_no }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="130"
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
          prop="order_money"
          label="订单总金额"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }"> ￥{{ row.order_money }} </template>
        </el-table-column>

        <el-table-column
          prop="pay_money"
          label="已回款金额"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.pay_money }}</span>
          </template>
        </el-table-column>

        <el-table-column
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
        </el-table-column>
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
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              :type="verifyStatusMap[row.verify_status || 0].type"
            >
              {{ verifyStatusMap[row.verify_status || 0].text }}
            </el-tag>
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
        <el-table-column label="操作" fixed="right" min-width="140">
          <template slot-scope="{ row }">
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
              >订单详情</el-button
            >
            <el-button @click="openOrderActions(row)" type="text"
              >作废</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-button @click="openStaffDialog">更改业绩归属人</el-button>
      </div>
    </div>
    <CollectionOrder
      v-model="orderActionDialog"
      :type="3"
      :orderInfo="dialogInfo"
      @on-success="getCrmOrderList"
    />
    <UpdatePerformanceAttribution
      v-model="staffDialog"
      :orderIds="checkedIds"
      @on-success="getCrmOrderList"
    />
  </div>
</template>

<script>
import CollectionOrder from "@/views/fina/components/CollectionOrder";
import UpdatePerformanceAttribution from "@/views/eda/components/UpdatePerformanceAttribution";
import { getCrmOrderList } from "@/api/crm";
export default {
  name: "OrderRecords",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    CollectionOrder,
    UpdatePerformanceAttribution,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
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
      dialogInfo: {},
      orderActionDialog: false,
      checkedIds: [],
      staffDialog: false,
    };
  },
  activated() {
    this.getCrmOrderList();
  },
  created() {
    this.getCrmOrderList();
  },
  methods: {
    openStaffDialog() {
      if (!this.checkedIds.length) {
        this.$message.warning("请选择订单");
        return;
      }
      this.staffDialog = true;
    },
    handleSeletChange(selection) {
      this.checkedIds = selection.map((item) => item.order_id);
    },
    //作废弹窗
    openOrderActions(row) {
      this.dialogInfo = row;
      this.orderActionDialog = true;
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
        },
      });
    },

    //订单列表
    async getCrmOrderList() {
      this.checkedIds = [];
      this.listLoading = true;
      const data = {
        uid: this.uid,
        person: 1,
      };
      const res = await getCrmOrderList(data);
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
.footer {
  padding: 10px 0;
}
</style>