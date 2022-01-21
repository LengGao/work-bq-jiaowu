<template>
  <div class="admin" v-loading="loading">
    <Block date-type="1" v-model="salesDateType" @date-change="getBriefing">
      <Title slot="header-title" text="销售简报"></Title>
      <SalesData
        @item-click="handleItemClick"
        :data="salesData"
        v-loading="salesLoading"
      />
    </Block>
    <div class="admin-container">
      <Block
        date-type="2"
        v-model="performanceType"
        @date-change="performanceIndicators"
      >
        <Title slot="header-title" text="业绩指标"></Title>
        <GaugeChart :data="performanceData" v-loading="performanceLoading" />
      </Block>
      <Block date-type="3" v-model="trendYear" @year-change="getTrendData">
        <Title slot="header-title" text="销售趋势"></Title>
        <TrendBar :data="trendData" v-loading="trendLoading" />
      </Block>
      <Block
        date-type="4"
        v-model="salesRankMonth"
        @date-change="getSalesRankData"
        class="scroll-chart"
      >
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
          <span
            class="tab-item"
            :class="{ 'tab-item--active-r': rankType === 3 }"
            @click="handleRankTypeChange(3)"
            >退款金额</span
          >
        </div>
        <RankBar
          v-loading="salesRankLoading"
          :data="salesRankCheckedData"
          type="1"
          :series-name="rankTypeName"
        />
      </Block>
      <Block
        class="scroll-chart"
        date-type="4"
        v-model="customerRankMonth"
        @date-change="getCustomerRankData"
      >
        <Title slot="header-title" text="客户分析"></Title>
        <div class="tab" slot="header-center">
          <span
            class="tab-item"
            @click="handleCustomerChange(0)"
            :class="{ 'tab-item--active': customerState === 0 }"
            >客户来源</span
          >
          <span
            class="tab-item"
            :class="{ 'tab-item--active': customerState === 1 }"
            @click="handleCustomerChange(1)"
            >客户拥有量</span
          >
        </div>
        <RankBar
          v-if="customerState === 1"
          bar-color="#24A3FF"
          bar-id="bar2"
          type="2"
          :data="customerRankData.chart"
          series-name="客户数量"
          v-loading="customerRankLoading"
        />
        <Pie
          v-else
          v-loading="customerRankLoading"
          :data="customerRankData.cake"
        />
      </Block>
      <Block date-type="4" v-model="jobMonth" @date-change="getJobTitleList">
        <Title slot="header-title" text="职业教育数据"></Title>
        <OrderTable
          v-loading="jobLoading"
          :data="jobData"
          :userIds="userIds"
          :month="jobMonth"
          :returned-type="returnedType"
        />
      </Block>
      <Block date-type="4" v-model="eduMonth" @date-change="getEducationList">
        <Title slot="header-title" text="学历教育数据"></Title>
        <OrderTable
          type="edu"
          v-loading="eduLoading"
          :data="eduData"
          :userIds="userIds"
          :month="eduMonth"
          :returned-type="returnedType"
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
  getJobTitleList,
  getEducationList,
} from "@/api/workbench.js";
import { dateMap } from "@/utils/date";
import Block from "./components/Block";
import SalesData from "./components/SalesData";
import GaugeChart from "./components/GaugeChart";
import TrendBar from "./components/TrendBar";
import RankBar from "./components/RankBar";
import OnlineChart from "./components/OnlineChart";
import Pie from "./components/Pie";
import OrderTable from "./components/OrderTable";
export default {
  name: "Administrators",
  components: {
    Block,
    SalesData,
    GaugeChart,
    TrendBar,
    RankBar,
    OnlineChart,
    Pie,
    OrderTable,
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
      date: new Date(),
      // 销售简报
      salesData: {},
      salesLoading: false,
      salesDateType: 6,
      // 业绩目标
      performanceData: {},
      performanceLoading: false,
      performanceType: 0,
      // 销售趋势
      trendData: [],
      trendLoading: false,
      trendType: 1,
      trendYear: new Date().getFullYear() + "",
      // 销售龙虎榜
      salesRankData: {},
      salesRankCheckedData: [],
      rankType: 1,
      rankTypeName: "回款",
      salesRankLoading: false,
      salesRankMonth:
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      // 录入客户排行榜
      customerRankData: [],
      customerRankLoading: false,
      customerRankMonth:
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      customerState: 0,
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
      //职业教育数据
      jobMonth: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      jobData: [],
      jobLoading: false,
      //学历教育数据
      eduMonth: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
      eduData: [],
      eduLoading: false,
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
      this.performanceIndicators();
      this.getTrendData();
      this.getSalesRankData();
      this.getCustomerRankData();
      this.getOnlineStatistics();
      this.getBriefing();
      this.getJobTitleList();
      this.getEducationList();
    },
    // 学历教育数据
    async getEducationList() {
      const data = {
        returned_type: this.returnedType,
        month: this.eduMonth,
        arr_uid: this.userIds,
      };
      this.eduLoading = true;
      const res = await getEducationList(data).catch(() => {
        this.eduData = [];
      });
      this.eduLoading = false;
      if (res.code === 0) {
        this.eduData = res.data;
      }
    },
    // 职业教育数据
    async getJobTitleList() {
      const data = {
        returned_type: this.returnedType,
        month: this.jobMonth,
        arr_uid: this.userIds,
      };
      this.jobLoading = true;
      const res = await getJobTitleList(data).catch(() => {
        this.jobData = [];
      });
      this.jobLoading = false;
      if (res.code === 0) {
        this.jobData = res.data;
      }
    },
    // 销售简报
    handleItemClick(type) {
      let router = "";
      switch (type) {
        case 1:
          router = "crmCustomer";
          break;
        case 2:
          router = "channelStudent";
          break;
        case 3:
          router = "crmOrder";
          break;
        case 4:
          router = "collectionList";
          break;
        case 5:
          router = "collectionList";
          break;
        case 6:
          router = "studentOrder";
          break;
        case 7:
          router = "paymentRebate";
          break;
        case 8:
          router = "paymentRebate";
          break;
        case 9:
          router = "crmOrder";
          break;
      }
      router &&
        this.$router.push({
          name: router,
          query: {
            date: dateMap[this.salesDateType],
            staff_id:
              this.userIds.join(",") ||
              this.$store.getters.userInfo.staff_id + "",
          },
        });
    },
    async getBriefing() {
      const data = {
        type: this.salesDateType,
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
    handleCustomerChange(state) {
      this.customerState = state;
    },
    // 录入客户排行榜
    async getCustomerRankData() {
      const data = {
        month: this.customerRankMonth,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
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
      const keyNameMap = {
        1: "payRank",
        2: "orderRank",
        3: "refundRank",
      };
      const typeNameMap = {
        1: "回款",
        2: "订单",
        3: "退款",
      };
      this.rankType = type;
      this.rankTypeName = typeNameMap[type];
      this.salesRankCheckedData = this.salesRankData[keyNameMap[type]];
    },
    async getSalesRankData() {
      const data = {
        month: this.salesRankMonth,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.salesRankLoading = true;
      const res = await getSalesRankData(data).catch(() => {});
      this.salesRankLoading = false;
      if (res.code === 0) {
        const keyNameMap = {
          1: "payRank",
          2: "orderRank",
          3: "refundRank",
        };
        this.salesRankData = res.data;
        this.salesRankCheckedData =
          this.salesRankData[keyNameMap[this.rankType]];
      }
    },
    // 销售趋势
    async getTrendData(type) {
      type && (this.trendType = type);
      const data = {
        year: this.trendYear,
        type: this.trendType,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.trendLoading = true;
      const res = await getTrendData(data).catch(() => {});
      this.trendLoading = false;
      if (res.code === 0) {
        this.trendData = res.data;
      }
    },
    // 业绩指标
    async performanceIndicators() {
      const data = {
        type: this.performanceType,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
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