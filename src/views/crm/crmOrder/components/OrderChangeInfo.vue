<template>
  <div class="order-change-info">
    <Title :text="orderTitle"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value"
          ><el-button
            type="text"
            @click="coursDetail(data.uid || originData.uid)"
            style="padding: 0"
            >{{ data.surname || originData.surname }}</el-button
          ></span
        >
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red': isChange && originData.source != data.source,
        }"
      >
        <span class="info-item__name">订单来源</span>
        <span class="info-item__value">{{ data.source }}</span>
      </div>

      <div class="info-item">
        <span class="info-item__name">报名类型：</span>
        <span class="info-item__value">{{
          data.type === 1 ? "学历教育" : "职业教育"
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.project_name != data.project_name,
        }"
      >
        <span class="info-item__name">报名项目：</span>
        <span class="info-item__value">{{ data.project_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.jiebie_name != data.jiebie_name,
        }"
      >
        <span class="info-item__name">届别名称：</span>
        <span class="info-item__value">{{ data.jiebie_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.staff_name != data.staff_name,
        }"
      >
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ data.staff_name }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.total_money != data.total_money,
        }"
      >
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value">{{
          data.total_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.order_money != data.order_money,
        }"
      >
        <span class="info-item__name">学费金额：</span>
        <span class="info-item__value">{{
          data.order_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.other_money != data.other_money,
        }"
      >
        <span class="info-item__name">其他金额：</span>
        <span class="info-item__value">{{
          data.other_money | moneyFormat
        }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red': isChange && originData.pay_money != data.pay_money,
        }"
      >
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">{{ data.pay_money | moneyFormat }}</span>
      </div>
      <div
        class="info-item"
        :class="{
          'info-item--red':
            isChange && originData.overdue_money != data.overdue_money,
        }"
      >
        <span class="info-item__name">未回款金额：</span>
        <span class="info-item__value">{{
          data.overdue_money | moneyFormat
        }}</span>
      </div>

      <div class="info-item">
        <span class="info-item__name">回款凭证：</span>
        <span class="info-item__value">
          <template v-if="getReceiptFile(data.receipt_file).length">
            <img
              :src="item"
              alt=""
              title="点击预览大图"
              style="height: 30px; cursor: pointer; margin-right: 10px"
              v-for="(item, index) in getReceiptFile(data.receipt_file)"
              :key="index"
              @click="handlePreview(item)"
            />
          </template>
          <span v-else>--</span>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ data.tips || "--" }}</span>
      </div>
    </div>
    <Title :text="projectTitle"></Title>
    <template v-if="data.type === 1">
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
        <el-table-column
          label="实收金额"
          align="center"
          min-width="100"
          prop="must_money"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.must_money | moneyFormat }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
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
    <Title :text="payTitle" style="margin-top: 20px"></Title>
    <el-table
      :data="data.pay_log"
      style="width: 100%; border: 1px solid #eee; border-bottom: none"
      :header-cell-style="{
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
        min-width="120"
      >
        <template slot-scope="{ row }">
          <template v-if="getReceiptFile(row.receipt_file).length">
            <img
              :src="src"
              @click="handlePreview(src)"
              style="height: 30px; cursor: pointer; margin-left: 10px"
              v-for="(src, index) in getReceiptFile(row.receipt_file)"
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
    <Title :text="planTitle" style="margin-top: 20px"></Title>
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
        min-width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>
            {{ expenseType[row.type] || "--" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="project_name"
        show-overflow-tooltip
        min-width="200"
        align="center"
      >
        <template slot="header">
          <span>所属项目 </span>
          <el-tooltip
            class="item"
            effect="dark"
            content="除学费外的其他费用都必须选择费用所属项目"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
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
    <PreviewImg ref="view" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "OrderChangeInfo",
  props: {
    orderTitle: {
      type: String,
      default: "当前订单信息",
    },
    projectTitle: {
      type: String,
      default: "当前项目信息",
    },
    payTitle: {
      type: String,
      default: "当前订单回款",
    },
    planTitle: {
      type: String,
      default: "当前回款计划",
    },
    changeIndex: 0,
    data: {
      type: Object,
      default: () => ({}),
    },
    originData: {
      type: Object,
      default: () => ({}),
    },
    isChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      verifyTypeMap: {
        0: {
          text: "新订单",
          type: "success",
        },
        1: {
          text: "申请退款",
          type: "warning",
        },
        2: {
          text: "申请作废",
          type: "danger",
        },
        3: {
          text: "申请退差价",
          type: "warning",
        },
      },
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
      const tableData =
        typeof this.data.project === "string"
          ? JSON.parse(this.data.project) || []
          : this.data.project;
      return tableData;
    },
  },
  methods: {
    getReceiptFile(val) {
      if (typeof val === "string" && val !== "") {
        return [val];
      } else {
        return val || [];
      }
    },
    coursDetail(uid) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid,
        },
      });
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
  },
};
</script>
<style lang="less">
.order-change-info {
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &--red {
        color: red;
      }
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 200px;
        line-height: 1.5;
      }
    }
  }
}
</style>