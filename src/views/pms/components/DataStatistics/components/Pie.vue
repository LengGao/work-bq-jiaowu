<template>
  <div id="pie"></div>
</template>
<script>
import resizeMixin from "../mixins";
export default {
  name: "Pie",
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
        this.chartInit();
      },
      deep: true,
    },
  },
  mounted() {
    this.chartInit();
  },
  methods: {
    chartInit() {
      this.chartInstance = this.$echarts.init(document.getElementById("pie"));
      this.chartInstance.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "客户来源",
            type: "pie",
            radius: "70%",
            data: this.data,
            label: {
              formatter: "{b}: {d}%",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
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
#pie {
  width: 100%;
  height: 400px;
}
</style>