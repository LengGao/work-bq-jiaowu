<template>
  <div class="chart-head">
    <div class="chart-head-tabs">
      <div
        class="tab-item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'tab-item-active': index === activeTabIndex }"
        @click="handleTabChange(index)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="chart-head-date">
      <div
        class="date-item"
        :class="{ 'date-item-active': index === activeDateIndex }"
        v-for="(item, index) in dateTypes"
        :key="index"
        @click="handleDateChange(index)"
      >
        {{ item.name }}
      </div>
      <!-- <el-date-picker
        v-model="dateSlect"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker> -->
    </div>
  </div>
</template>
<script >
export default {
  name: "ChartHead",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dateSlect: "",
      activeDateIndex: 1,
      activeTabIndex: 0,
      dateTypes: [
        {
          name: "近1天",
        },
        {
          name: "近7天",
        },
        {
          name: "近30天",
        },
        {
          name: "近1年",
        },
      ],
    };
  },
  methods: {
    handleTabChange(index) {
      this.activeTabIndex = index;
      this.$emit("on-tab-change", index);
    },
    handleDateChange(index) {
      this.activeDateIndex = index;
      this.$emit("on-date-change", index + 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
  .chart-head-tabs {
    display: flex;
    align-items: center;
    .tab-item {
      padding: 12px 16px;
      border-bottom: 2px solid #fff;
      cursor: pointer;
      &.tab-item-active {
        color: #199fff;
        border-color: #199fff;
      }
    }
  }
  .chart-head-date {
    display: flex;
    align-items: center;
    .date-item {
      color: #909399;
      padding: 0 16px;
      font-size: 14px;
      cursor: pointer;
      &.date-item-active {
        color: #199fff;
      }
    }
  }
}
</style>