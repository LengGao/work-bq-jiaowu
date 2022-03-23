<template>
  <div class="refund-record">
    <div class="header">
      <div>
        <span class="title">订单金额：</span>
        <span class="value">{{ data.total_money | moneyFormat }} </span>
      </div>
      <div>
        <span class="title">学费金额：</span>
        <span class="value">{{ data.order_money | moneyFormat }} </span>
      </div>
      <div>
        <span class="title">其他金额：</span>
        <span class="value">{{ data.other_money | moneyFormat }} </span>
      </div>
      <div>
        <span class="title">已回款金额：</span>
        <span class="value">{{ data.pay_money | moneyFormat }} </span>
      </div>
      <div>
        <span class="title">未回款金额：</span>
        <span class="value">{{ data.overdue_money | moneyFormat }} </span>
      </div>
      <div class="actions" v-if="!$route.query.isFromApprove">
        <el-button type="primary" @click="handleAddPlan"
          >配置回款计划</el-button
        >
        <el-button type="primary" @click="handleAdd">添加回款记录</el-button>
      </div>
    </div>
    <Title text="订单回款" style="margin-top: 20px"></Title>
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
        prop="pay_date"
        label="回款日期"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="relation_plan"
        label="关联计划"
        min-width="200"
        align="left"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="回款总金额"
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
        label="收款人员"
        align="center"
        prop="admin_name"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="回款凭证"
        align="center"
        prop="admin_name"
        min-width="100"
      >
        <template slot-scope="{ row }">
          <template v-if="row.receipt_file && row.receipt_file.length">
            <img
              :src="src"
              @click="handlePreview(src)"
              style="height: 40px; cursor: pointer; margin-left: 10px"
              v-for="(src, index) in row.receipt_file"
              :key="index"
              alt=""
            />
          </template>
          <span v-else>无</span>
        </template>
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
          <span>{{ payStatusMap[row.verify_status] || "--" }}</span>
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
    <Title text="回款计划" style="margin-top: 20px"></Title>
    <div class="term">
      <el-table
        :data="data.pay_plan"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="50"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="回款类型"
          show-overflow-tooltip
          min-width="80"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>
              {{ expenseType[row.type] || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="year"
          label="所属年份"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
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
          label="实际回款时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <AddPaymentCollectionRecord
      v-model="dialogVisible"
      :order-id="data.order_id"
      @on-success="$parent.getCrmOrderDetail"
      :plan-data="data.pay_plan"
      @refresh="$parent.getCrmOrderDetail"
    />
    <AddPaymentCollectionPlan
      v-model="planDialogVisible"
      :order-id="data.order_id"
      @on-success="$parent.getCrmOrderDetail"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import AddPaymentCollectionRecord from "./AddPaymentCollectionRecord.vue";
import AddPaymentCollectionPlan from "./AddPaymentCollectionPlan.vue";
import { mapGetters } from "vuex";
export default {
  name: "CollectionRecord",
  components: {
    AddPaymentCollectionRecord,
    AddPaymentCollectionPlan,
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
      dialogVisible: false,
      planDialogVisible: false,
      payStatusMap: {
        0: "待入账",
        1: "已入账",
        2: "已驳回",
        3: "确认入账中",
      },
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
  },
  created() {},
  methods: {
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    handleAddPlan() {
      this.planDialogVisible = true;
    },
    handleAdd() {
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
    flex-shrink: 0;
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
}
</style>
