<template>
  <div class="rank-bar" ref="barEl" :id="chartId"></div>
</template>
<script>
import resizeMixin from "../mixins";
export default {
  name: "RankBar",
  mixins: [resizeMixin],
  props: {
    chartColor: {
      type: String,
      default: "#FF6C59",
    },
    chartId: {
      type: String,
      default: "bar",
    },
    data: {
      type: Array,
      default: () => [],
    },
    unit: {
      type: String,
      default: "元",
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
        this.$nextTick(() => {
          this.handleDataChange();
          this.chartInstance && this.chartInstance.resize();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.handleDataChange();
  },
  methods: {
    handleDataChange() {
      if (this.data.length > 10) {
        this.$refs.barEl.style.height = this.data.length * 45 + "px";
      } else {
        this.$refs.barEl.style.height = 350 + "px";
      }
      this.chartInit();
    },
    unitFormat(val) {
      if (!val) {
        return `0${this.unit}`;
      }
      if (Math.abs(val / 10000) >= 1) {
        return `${(val / 10000).toFixed(3).slice(0, -1)}万${this.unit}`;
      }
      return `${val}${this.unit}`;
    },
    chartInit() {
      const seriesData = this.data.map(({ num }) => +num).reverse();
      const yAxisData = this.data
        .map(
          ({ institution_name, name }, index) =>
            index + 1 + ". " + (name || institution_name)
        )
        .reverse();
      this.chartInstance = this.$echarts.init(
        document.getElementById(this.chartId)
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
          bottom: "0",
          top: "16px",
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
            color: this.chartColor,
            data: seriesData,
            barWidth: 25,
            label: {
              show: true,
              precision: 1,
              position: "right",
              valueAnimation: true,
              fontFamily: "monospace",
              formatter: (params) => {
                return this.unitFormat(params.value);
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