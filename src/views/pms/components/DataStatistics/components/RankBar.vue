<template>
  <div class="rank-bar" ref="barEl" :id="barId"></div>
</template>
<script>
import resizeMixin from "../mixins";
export default {
  name: "RankBar",
  mixins: [resizeMixin],
  props: {
    barColor: {
      type: String,
      default: "#FF6C59",
    },
    barId: {
      type: String,
      default: "bar",
    },
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "1", // 1:销售龙虎榜 2录入客户排行榜
    },
    seriesName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    data: {
      handler() {
        this.handleDataChange();
        this.chartInstance && this.chartInstance.resize();
      },
      deep: true,
    },
  },
  mounted() {
    this.handleDataChange();
  },
  methods: {
    handleDataChange() {
      if (this.data.length > 15) {
        this.$refs.barEl.style.height = this.data.length * 26 + "px";
      } else {
        this.$refs.barEl.style.height = 400 + "px";
      }
      this.chartInit();
    },
    unitFormat(val) {
      if (!val) {
        return `0.00元`;
      }
      if (Math.abs(val / 10000) >= 1) {
        return (val / 10000).toFixed(2) + "万元";
      }
      return val.toFixed(2) + "元";
    },
    chartInit() {
      let seriesData = [];
      let yAxisData = [];
      // 销售龙虎榜
      if (this.type == 1) {
        seriesData = this.data.map(({ num }) => +num).reverse();
        yAxisData = this.data
          .map(({ name }, index) => index + 1 + ". " + name)
          .reverse();
      }
      // 录入客户龙虎榜
      if (this.type == 2) {
        seriesData = this.data.map(({ num }) => +num).reverse();
        yAxisData = this.data
          .map(({ name }, index) => index + 1 + ". " + name)
          .reverse();
      }
      this.chartInstance = this.$echarts.init(
        document.getElementById(this.barId)
      );
      this.chartInstance.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: yAxisData,
          axisTick: {
            //刻度线
            show: false,
          },
        },
        series: [
          {
            name: this.seriesName,
            type: "bar",
            color: this.barColor,
            data: seriesData,
            label: {
              show: true,
              precision: 1,
              position: "right",
              valueAnimation: true,
              fontFamily: "monospace",
              formatter: (params) => {
                if (this.type == 1) {
                  return this.unitFormat(params.value);
                }
                if (this.type == 2) {
                  return params.value + "个";
                }
                return params.value;
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.rank-bar {
  width: 100%;
  height: 400px;
}
</style>