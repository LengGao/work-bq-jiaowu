<template>
  <div class="admin" v-loading="loading">
    <Block date-type="1" :value="6" @date-change="getBriefing">
      <Title slot="header-title" text="销售简报"></Title>
      <SalesData
        @item-click="handleItemClick"
        :data="salesData"
        v-loading="salesLoading"
      />
    </Block>
    <div class="admin-container">
      <Block date-type="2" :value="0" @date-change="performanceIndicators">
        <Title slot="header-title" text="业绩指标"></Title>
        <GaugeChart :data="performanceData" v-loading="performanceLoading" />
      </Block>
      <Block date-type="3" @year-change="getTrendData">
        <Title slot="header-title" text="销售趋势"></Title>
        <TrendBar :data="trendData" v-loading="trendLoading" />
      </Block>
      <Block date-type="4" @date-change="getSalesRankData" class="scroll-chart">
        <Title slot="header-title" text="销售龙虎榜"></Title>
        <div class="tab" slot="header-center">
          <span
            class="tab-item"
            :class="{ 'tab-item--active-r': rankType === 1 }"
            @click="handleRankTypeChange(1)"
            >回款金额</span
          >
          <span
            class="tab-item"
            :class="{ 'tab-item--active-r': rankType === 2 }"
            @click="handleRankTypeChange(2)"
            >订单金额</span
          >
        </div>
        <RankBar
          v-loading="salesRankLoading"
          :data="salesRankCheckedData"
          type="1"
          :series-name="rankType === 1 ? '回款' : '订单'"
        />
      </Block>
      <Block
        class="scroll-chart"
        date-type="4"
        @date-change="getCustomerRankData"
      >
        <Title slot="header-title" text="录入客户排行榜"></Title>
        <RankBar
          bar-color="#24A3FF"
          bar-id="bar2"
          type="2"
          :data="customerRankData"
          series-name="客户数量"
          v-loading="customerRankLoading"
        />
      </Block>
      <Block class="online" @date-change="getOnlineStatistics">
        <Title slot="header-title" text="在线人数"></Title>
        <div class="tab" slot="header-center">
          <span
            class="tab-item"
            @click="handleOnlineChange(0)"
            :class="{ 'tab-item--active': onlineState === 0 }"
            >东培学堂</span
          >
          <span
            class="tab-item"
            :class="{ 'tab-item--active': onlineState === 1 }"
            @click="handleOnlineChange(1)"
            >机构端</span
          >
        </div>
        <OnlineChart :data="onlineData" v-loading="onlineLoading" />
      </Block>
    </div>
  </div>
</template>
<script>
import {
  performanceIndicators,
  getTrendData,
  getSalesRankData,
  getCustomerRankData,
  getOnlineStatistics,
  getBriefing,
} from "@/api/workbench.js";
import Block from "./components/Block";
import SalesData from "./components/SalesData";
import GaugeChart from "./components/GaugeChart";
import TrendBar from "./components/TrendBar";
import RankBar from "./components/RankBar";
import OnlineChart from "./components/OnlineChart";
export default {
  name: "Administrators",
  components: {
    Block,
    SalesData,
    GaugeChart,
    TrendBar,
    RankBar,
    OnlineChart,
  },
  props: {
    userIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      date: new Date(),
      // 销售简报
      salesData: {},
      salesLoading: false,
      salesDateType: 6,
      // 业绩目标
      performanceData: {},
      performanceLoading: false,
      // 销售趋势
      trendData: [],
      trendLoading: false,
      // 销售龙虎榜
      salesRankData: {},
      salesRankCheckedData: [],
      rankType: 1,
      salesRankLoading: false,
      // 录入客户排行榜
      customerRankData: [],
      customerRankLoading: false,
      // 在线人数
      onlineData: {
        list: {
          applet: {},
          total: {},
          pc: {},
        },
        gains: {
          applet: {},
          total: {},
          pc: {},
        },
      },
      onlineState: 0,
      onlineType: 0,
      onlineLoading: false,
    };
  },
  watch: {
    userIds: {
      handler() {
        this.performanceIndicators(0);
        this.getTrendData(this.date.getFullYear(), 1);
        this.getSalesRankData(this.currentMonth);
        this.getCustomerRankData(this.currentMonth);
        this.getBriefing(6);
      },
      deep: true,
    },
  },
  computed: {
    currentMonth() {
      return `${this.date.getFullYear()}-${this.date.getMonth() + 1}`;
    },
  },
  created() {
    this.performanceIndicators(0);
    this.getTrendData(this.date.getFullYear(), 1);
    this.getSalesRankData(this.currentMonth);
    this.getCustomerRankData(this.currentMonth);
    this.getOnlineStatistics();
    this.getBriefing(6);
  },
  methods: {
    // 销售简报
    handleItemClick(type) {
      console.log(this.$moment().startOf("month").format("YYYY-MM-DD"));
      const today = this.$moment().format("YYYY-MM-DD");
      const yesterday = this.$moment().subtract(1, "day").format("YYYY-MM-DD");
      const thisMonth = this.$moment().startOf("month").format("YYYY-MM-DD");
      const lastMonthStart = this.$moment()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const lastMonthEnd = this.$moment()
        .subtract(1, "month")
        .endOf("month")
        .format("YYYY-MM-DD");
      const dateMap = {
        0: `${thisMonth},${today}`,
        1: `${lastMonthStart},${lastMonthEnd}`,
        6: `${today},${today}`,
        7: `${yesterday},${yesterday}`,
      };
      let router = "";
      switch (type) {
        case 1:
          router = "crmCustomer";
          break;
        case 2:
          router = "crmOrder";
          break;
        case 3:
          router = "channelStudent";
          break;
      }
      // router &&
      //   this.$router.push({
      //     name: router,
      //     query: {
      //       date: [],
      //     },
      //   });
    },
    async getBriefing(type) {
      this.salesDateType = type;
      const data = {
        type,
        arr_uid: this.userIds,
      };
      this.salesLoading = true;
      const res = await getBriefing(data).catch(() => {});
      this.salesLoading = false;
      if (res.code === 0) {
        this.salesData = res.data;
      }
    },
    // 在线人数
    handleOnlineChange(state) {
      this.onlineState = state;
      this.getOnlineStatistics();
    },
    async getOnlineStatistics(type) {
      this.onlineType = type || 0;
      const data = {
        type: this.onlineType,
        state: this.onlineState,
      };
      this.onlineLoading = true;
      const res = await getOnlineStatistics(data).catch(() => {});
      this.onlineLoading = false;
      if (res.code === 0) {
        this.onlineData = res.data;
      }
    },
    // 录入客户排行榜
    async getCustomerRankData(month) {
      const data = {
        month,
        arr_uid: this.userIds,
      };
      this.customerRankLoading = true;
      const res = await getCustomerRankData(data).catch(() => {});
      this.customerRankLoading = false;
      if (res.code === 0) {
        this.customerRankData = res.data;
      }
    },
    // 销售龙虎榜
    handleRankTypeChange(type) {
      this.rankType = type;
      this.salesRankCheckedData =
        type === 1 ? this.salesRankData.payRank : this.salesRankData.orderRank;
    },
    async getSalesRankData(month) {
      const data = {
        month,
        arr_uid: this.userIds,
      };
      this.salesRankLoading = true;
      const res = await getSalesRankData(data).catch(() => {});
      this.salesRankLoading = false;
      if (res.code === 0) {
        this.salesRankData = res.data;
        this.salesRankCheckedData =
          this.rankType === 1
            ? this.salesRankData.payRank
            : this.salesRankData.orderRank;
      }
    },
    // 销售趋势
    async getTrendData(year, type) {
      const data = {
        year,
        type,
        arr_uid: this.userIds,
      };
      this.trendLoading = true;
      const res = await getTrendData(data).catch(() => {});
      this.trendLoading = false;
      if (res.code === 0) {
        this.trendData = res.data;
      }
    },
    // 业绩指标
    async performanceIndicators(type) {
      const data = {
        type,
        arr_uid: this.userIds,
      };
      this.performanceLoading = true;
      const res = await performanceIndicators(data).catch(() => {});
      this.performanceLoading = false;
      if (res.code === 0) {
        this.performanceData = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  &-container {
    display: flex;
    align-items: center;
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
  .tab {
    font-size: 14px;
    color: #333;
    &-item {
      padding: 0 20px;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid #666;
      }
      &--active {
        color: #199fff;
      }
      &--active-r {
        color: #ff6c59;
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