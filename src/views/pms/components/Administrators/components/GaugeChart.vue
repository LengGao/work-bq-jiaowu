<template>
  <div>
    <div id="gauge-chart"></div>
  </div>
</template>
<script>
export default {
  name: "GaugeChart",
  data() {
    return {};
  },
  mounted() {
    this.chartInit();
  },
  methods: {
    chartInit() {
      let myChart = this.$echarts.init(document.getElementById("gauge-chart"));
      myChart.setOption({
        series: [
          {
            type: "gauge",
            max: 120,
            splitNumber: 12,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.168, "#FD6500"],
                  [0.668, "#FDC400"],
                  [0.835, "#199FFF"],
                  [1, "#43D100"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: 0,
              length: 15,
              lineStyle: {
                color: "auto",
                width: 1,
              },
            },
            splitLine: {
              distance: 0,
              length: 20,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 20,
              fontSize: 14,
            },
            detail: {
              fontSize: 24,
              valueAnimation: true,
              formatter: "{value}",
              color: "auto",
            },
            title: {
              offsetCenter: [0, 85],
              fontSize: 14,
            },
            data: [
              {
                value: 80,
                name: "完成率(%)",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
#gauge-chart {
  width: 500px;
  height: 400px;
}
</style>