<template>
  <div class="chart-head">
    <div class="chart-head-tabs">
      <div class="tab-item" v-for="(tab, index) in tabs" :key="index">
        {{ tab.name }}
      </div>
    </div>
    <div class="chart-head-date">
      <div class="date-item" :class="{'date-item-active':index === activeIndex}" v-for="(item, index) in dateTypes" :key="index" @click="handleDateChange(index)">
        {{ item.name }}
      </div>
       <el-date-picker
         v-model="dateSlect"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
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
        dateSlect:'',
        activeIndex:0,
      dateTypes: [
        {
          name: "今日",
        },
        {
          name: "昨天",
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
  methods:{
      handleDateChange(index){
          console.log(index)
          this.activeIndex = index
          this.$emit('on-date-change',index)
      }
  }
};
</script>
<style lang="scss" scoped>
.chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .chart-head-tabs {
    display: flex;
    align-items: center;
    .tab-item{
        padding: 0 16px;
    }
  }
  .chart-head-date{
      display: flex;
    align-items: center;
    .date-item{
        color: #909399;
        padding: 0 16px;
        font-size: 14px;
        cursor: pointer;
        &.date-item-active{
            color: #199FFF;
        }
    }
  }
}
</style>