<template>
  <div class="refund-record">
    <div class="header">
      <div class="item">
        <span class="title">异动后学费金额：</span>
        <span class="value">{{ data.order_money | moneyFormat }} </span>
      </div>
      <!-- <div class="item">
        <span class="title">优惠金额：</span>
        <span class="value">{{ data.reduction | moneyFormat }} </span>
      </div> -->
      <div class="item">
        <span class="title">已回款金额：</span>
        <span class="value">{{ data.pay_money | moneyFormat }} </span>
      </div>
      <div class="item">
        <span class="title">未回款金额：</span>
        <span class="value">{{ data.overdue_money | moneyFormat }} </span>
      </div>
      <div class="item">
        <span class="title">共享业绩：</span>
        <span>{{ data.union_staff_name || "--" }} </span>
      </div>
      <div class="item">
        <span class="title">届别名称：</span>
        <span>{{ data.jiebie_name || "--" }} </span>
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
        <template slot-scope="{ row }">
          <span>{{ row.pay_money | moneyFormat }}</span>
        </template>
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
          <template
            v-if="
              row.receipt_file &&
              row.receipt_file.length &&
              Array.isArray(row.receipt_file)
            "
          >
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
          <el-tag
            v-if="payStatusMap[row.verify_status]"
            size="small"
            :type="payStatusMap[row.verify_status].type"
            >{{ payStatusMap[row.verify_status].text }}</el-tag
          >
          <span v-else>--</span>
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
    <template v-if="data.type === 1">
      <Title text="学历信息" style="margin-top: 20px"></Title>
      <el-table
        :key="data.type"
        :data="getTableData"
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
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="学历形式"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="type.value"
        >
        </el-table-column>
        <el-table-column
          prop="university.value"
          label="院校名称"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="层次名称"
          align="center"
          prop="level.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="专业名称"
          align="center"
          prop="major.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="关联项目"
          align="center"
          min-width="100"
          prop="project_name"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="总学费"
          align="center"
          min-width="100"
          prop="total_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.total_money | moneyFormat }} </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <Title text="项目信息" style="margin-top: 20px"></Title>
      <el-table
        :key="data.type"
        :data="getTableData"
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
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="project_name"
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="项目价格"
          align="center"
          min-width="100"
          prop="project_price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.project_price | moneyFormat }} </span>
          </template>
        </el-table-column>
        <el-table-column
          label="实收金额"
          align="center"
          min-width="100"
          prop="must_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> {{ row.must_money | moneyFormat }} </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UnusualRecord",
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
      payStatusMap: {
        0: {
          type: "primary",
          text: "待入账",
        },
        1: {
          type: "success",
          text: "已入账",
        },
        2: {
          type: "danger",
          text: "已驳回",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    getTableData() {
      const tableData = this.data.project || [];
      return tableData;
    },
  },
  methods: {
    handlePreview(src) {
      this.$refs.view.show(src);
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .item {
    margin-right: 20px;
  }
  .value {
    color: #199fff;
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
</style>
