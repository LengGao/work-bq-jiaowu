<template>
  <div id="trend-bar"></div>
</template>
<script>
import resizeMixin from "../mixins";
export default {
  name: "TrendBar",
  mixins: [resizeMixin],
  props: {
    data: {
      type: Array,
      default: () => [],
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
          this.chartInit();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.chartInit();
  },
  methods: {
    chartInit() {
      const totalData = [];
      const payData = [];
      const refundData = [];
      this.data.forEach(({ order_money, pay_money, refund_money }) => {
        totalData.push(order_money);
        payData.push(pay_money);
        refundData.push(refund_money);
      });

      const xData =
        this.data.length !== 12
          ? ["第一季度", "第二季度", "第三季度", "第四季度"]
          : [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ];
      this.chartInstance = this.$echarts.init(
        document.getElementById("trend-bar")
      );
      this.chartInstance.setOption({
        color: ["#FFE5c8", "#FFB76A", "#ff6c59"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
        },
        legend: {
          formatter: function (name) {
            return name;
          },
        },
        xAxis: {
          data: xData,
          axisTick: {
            //刻度线
            show: false,
          },
        },
        yAxis: {
          splitArea: { show: false },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLine: {
            //y轴
            show: false,
          },
        },

        series: [
          {
            barWidth: 20,
            data: totalData,
            name: "订单",
            type: "bar",
          },
          {
            barGap: "-100%",
            barWidth: 20,
            data: payData,
            name: "回款",
            type: "bar",
          },
          {
            barWidth: 20,
            data: refundData,
            name: "退款",
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
#trend-bar {
  width: 100%;
  height: 400px;
}
</style>