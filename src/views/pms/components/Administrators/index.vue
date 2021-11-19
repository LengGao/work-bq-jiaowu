<template>
  <div class="admin" v-loading="loading">
    <Block>
      <Title slot="header-title" text="销售简报"></Title>
      <SalesData />
    </Block>
    <div class="admin-center">
      <div class="admin-center-left">
        <Block>
          <Title slot="header-title" text="业绩指标"></Title>
          <GaugeChart />
        </Block>
        <Block>
          <Title slot="header-title" text="销售趋势"></Title>
        </Block>
      </div>
      <div class="admin-center-right">
        <Block>
          <Title slot="header-title" text="销售龙虎榜"></Title>
        </Block>
        <Block>
          <Title slot="header-title" text="录入客户排行榜"></Title>
        </Block>
      </div>
    </div>
    <Block>
      <Title slot="header-title" text="在线人数"></Title>
      <div class="tab" slot="header-center">
        <span class="tab-item tab-item--active">东培学堂</span>
        <span class="tab-item">机构段</span>
      </div>
    </Block>
  </div>
</template>
<script>
import {
  getAdminWorkData,
  getVisitChart,
  getSaleChart,
} from "@/api/workbench.js";
import Block from "./components/Block";
import SalesData from "./components/SalesData";
import GaugeChart from "./components/GaugeChart";
export default {
  name: "Administrators",
  components: {
    Block,
    SalesData,
    GaugeChart,
  },
  data() {
    return {
      loading: false,
    };
  },

  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.admin {
  &-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left,
    &-right {
      width: calc(50% - 10px);
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
    }
  }
}
</style>