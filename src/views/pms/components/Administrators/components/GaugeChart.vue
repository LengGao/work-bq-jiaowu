<template>
  <div class="gauge">
    <div id="gauge-chart"></div>
    <div class="gauge-info">
      <div class="gauge-info-item">
        <p class="gauge-info-item-title">业绩目标</p>
        <p class="gauge-info-item-value">
          {{ unitFormat(data.totalPerformance)
          }}<span class="unit">{{
            data.totalPerformance >= 10000 ? "万元" : "元"
          }}</span>
        </p>
      </div>
      <div class="gauge-info-item">
        <p class="gauge-info-item-title">订单金额</p>
        <p class="gauge-info-item-value">
          {{ unitFormat(data.orderMoney)
          }}<span class="unit">{{
            data.orderMoney >= 10000 ? "万元" : "元"
          }}</span>
        </p>
      </div>
      <div class="gauge-info-item">
        <p class="gauge-info-item-title">回款金额</p>
        <p class="gauge-info-item-value">
          {{ unitFormat(data.payMoney)
          }}<span class="unit">{{
            data.payMoney >= 10000 ? "万元" : "元"
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GaugeChart",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.chartInit();
  },
  watch: {
    "data.completion"(val) {
      this.chartInit(val);
    },
  },
  methods: {
    unitFormat(val) {
      if (!val) {
        return `0.00`;
      }
      if (val / 10000 >= 1) {
        return (val / 10000).toFixed(2);
      }
      return (+val).toFixed(2);
    },
    chartInit(value = 0) {
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
                  [0.16666, "#FD6500"],
                  [0.66666, "#FDC400"],
                  [0.83333, "#199FFF"],
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
              distance: 5,
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
                value,
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
.gauge {
  display: flex;
  align-items: center;
  #gauge-chart {
    width: 70%;
    height: 400px;
  }
  &-info {
    &-item {
      padding: 20px;
      color: #666;
      &-title {
        font-size: 14px;
      }
      &-value {
        font-size: 34px;
        .unit {
          font-size: 14px;
        }
      }
    }
  }
}
</style>