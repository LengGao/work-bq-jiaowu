<template>
  <div class="admin" v-loading="loading">
    <Block date-type="5" v-model="salesDate" @date-change="handleDateChange">
      <Title slot="header-title" text="数据概览"></Title>
      <SalesData :data="salesData" v-loading="salesLoading" />
    </Block>
    <div class="admin-container">
      <Block
        date-type="none"
        v-model="salesRankDate"
        @date-change="getOrgSalesRank"
        class="scroll-chart"
      >
        <Title slot="header-title" text="销售增量数据"></Title>
        <Tabs :data="salesRankTabs" v-model="salesRankType" type="danger" />
        <RankBar
          chart-id="sales-chart"
          v-loading="salesRankLoading"
          :data="salesRankData[salesRankType]"
          :series-name="salesRankTypeNameMap[salesRankType]"
        />
      </Block>
      <Block date-type="none" v-model="studentRankDate" class="scroll-chart">
        <Title slot="header-title" text="学生增量数据"></Title>
        <Tabs
          :data="studentRankTabs"
          v-model="studentRankType"
          type="primary"
        />
        <RankBar
          unit="人"
          v-loading="studentRankLoading"
          :data="studentRankData[studentRankType]"
          chart-id="student-chart"
          chartColor="#199fff"
          :series-name="studentRankTypeNameMap[studentRankType]"
        />
      </Block>
      <Block date-type="none" v-model="tuitionRankDate" class="scroll-chart">
        <Title slot="header-title" text="订单增量数据"></Title>
        <Tabs
          :data="tuitionRankTabs"
          v-model="tuitionRankType"
          type="success"
        />
        <RankBar
          v-loading="tuitionRankLoading"
          :data="tuitionRankData[tuitionRankType]"
          chart-id="order-money-chart"
          chartColor="#43d100"
          :series-name="tuitionRankTypeNameMap[tuitionRankType]"
        />
      </Block>
      <Block date-type="none" v-model="otherRankDate" class="scroll-chart">
        <Title slot="header-title" text="其他金额增量数据"></Title>
        <RankBar
          v-loading="otherRankLoading"
          :data="otherRankData[otherRankType]"
          chart-id="other-money-chart"
          chartColor="#fdc400"
          series-name="其他金额"
        />
      </Block>
    </div>
  </div>
</template>
<script>
import {
  getOrgSalesRank,
  getBriefing,
  getOrgTuitionRank,
  getOrgOtherMoneyRank,
  getOrgStudentRank,
} from "@/api/workbench.js";
import { today } from "@/utils/date";
import Tabs from "./components/Tabs";
import Block from "./components/Block";
import SalesData from "./components/SalesData";
import RankBar from "./components/RankBar";
export default {
  name: "OrgStatistics",
  components: {
    Block,
    SalesData,
    RankBar,
    Tabs,
  },
  props: {
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
      loading: false,
      // 销售简报
      salesData: {},
      salesLoading: false,
      salesDate: [today, today],
      // 销售数据
      salesRankData: {},
      salesRankType: "pay_money",
      salesRankTypeNameMap: {
        pay_money: "回款",
        overdue_money: "欠缴",
        total_money: "订单",
        refund_money: "退款",
      },
      salesRankLoading: false,
      salesRankDate: [today, today],
      salesRankTabs: [
        {
          label: "回款金额",
          value: "pay_money",
        },
        {
          label: "欠缴金额",
          value: "overdue_money",
        },
        {
          label: "订单金额",
          value: "total_money",
        },
        {
          label: "退款金额",
          value: "refund_money",
        },
      ],
      // 学生数据
      studentRankData: {},
      studentRankDataField: {
        1: "pay_money",
        2: "overdue_money",
        3: "total_money",
        4: "refund_money",
      },
      studentRankType: "user_total",
      studentRankTypeNameMap: {
        user_total: "用户",
        archives_total: "学生档案",
        registered_total: "已报名",
        not_registered_total: "未报名",
      },
      studentRankLoading: false,
      studentRankDate: [today, today],
      studentRankTabs: [
        {
          label: "用户总数",
          value: "user_total",
        },
        {
          label: "学生档案数",
          value: "archives_total",
        },
        {
          label: "已报名",
          value: "registered_total",
        },
        {
          label: "未报名",
          value: "not_registered_total",
        },
      ],
      // 学费排行
      tuitionRankData: {},
      tuitionRankDataField: {
        1: "orderMoney",
        2: "payMoney",
        3: "entryMoney",
      },
      tuitionRankType: "orderMoney",
      tuitionRankTypeNameMap: {
        orderMoney: "订单",
        payMoney: "回款",
        entryMoney: "入账",
      },
      tuitionRankLoading: false,
      tuitionRankDate: [today, today],
      tuitionRankTabs: [
        {
          label: "订单金额",
          value: "orderMoney",
        },
        {
          label: "回款金额",
          value: "payMoney",
        },
        {
          label: "入账金额",
          value: "entryMoney",
        },
      ],
      // 其他金额排行
      otherRankData: {},
      otherRankType: "otherMoney",
      otherRankLoading: false,
      otherRankDate: [today, today],
    };
  },
  watch: {
    userIds() {
      this.getAllData();
    },
    returnedType() {
      this.getAllData();
    },
  },
  activated() {
    this.getAllData();
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      this.getBriefing();
      this.getOrgSalesRank();
      this.getOrgStudentRank();
      this.getOrgTuitionRank();
      this.getOrgOtherMoneyRank();
    },
    handleDateChange(date) {
      console.log(date);
      this.salesRankDate = date;
      this.studentRankDate = date;
      this.tuitionRankDate = date;
      this.otherRankDate = date;
      this.getAllData();
    },
    // 数据概览
    async getBriefing() {
      const [start_date, end_date] = this.salesDate || ["", ""];
      const data = {
        start_date,
        end_date,
        select_type: 2,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.salesLoading = true;
      const res = await getBriefing(data).catch(() => {});
      this.salesLoading = false;
      if (res.code === 0) {
        this.salesData = res.data;
      }
    },
    // 销售数据
    async getOrgSalesRank() {
      const [start_date, end_date] = this.salesRankDate || ["", ""];
      const data = {
        start_date,
        end_date,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.salesRankLoading = true;
      const res = await getOrgSalesRank(data).catch(() => {});
      this.salesRankLoading = false;
      if (res.code === 0) {
        this.salesRankData = res.data;
      }
    },
    // 学生数据
    async getOrgStudentRank() {
      const [start_date, end_date] = this.studentRankDate || ["", ""];
      const data = {
        start_date,
        end_date,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.studentRankLoading = true;
      const res = await getOrgStudentRank(data).catch(() => {});
      this.studentRankLoading = false;
      if (res.code === 0) {
        this.studentRankData = res.data;
      }
    },
    // 学费
    async getOrgTuitionRank() {
      const [start_date, end_date] = this.tuitionRankDate || ["", ""];
      const data = {
        start_date,
        end_date,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.tuitionRankLoading = true;
      const res = await getOrgTuitionRank(data).catch(() => {});
      this.tuitionRankLoading = false;
      if (res.code === 0) {
        this.tuitionRankData = res.data;
      }
    },
    // 学费
    async getOrgOtherMoneyRank() {
      const [start_date, end_date] = this.otherRankDate || ["", ""];
      const data = {
        start_date,
        end_date,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.otherRankLoading = true;
      const res = await getOrgOtherMoneyRank(data).catch(() => {});
      this.otherRankLoading = false;
      if (res.code === 0) {
        this.otherRankData = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  &-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .block {
      width: calc(50% - 10px);
      &.online {
        width: 100%;
      }
      @media only screen and (max-width: 1200px) {
        width: 100%;
      }
    }
  }

  .scroll-chart {
    /deep/.block-container {
      height: 400px;
      overflow-y: auto;
    }
  }
}
</style>