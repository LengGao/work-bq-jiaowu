<template>
  <el-dialog
    :title="title"
    :visible="value"
    width="1000px"
    :close-on-click-modal="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="card">
      <div class="card-item">
        <div class="card-item-title">订单数量</div>
        <div class="card-item-value">1322</div>
      </div>
      <div class="card-item">
        <div class="card-item-title">订单金额</div>
        <div class="card-item-value">155445</div>
      </div>
      <div class="card-item">
        <div class="card-item-title">回款金额</div>
        <div class="card-item-value">11122</div>
      </div>
      <div class="card-item">
        <div class="card-item-title">退款金额</div>
        <div class="card-item-value">245454</div>
      </div>
    </div>
    <div id="dialog-chart"></div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  methods: {
    handleOpen() {
      this.$nextTick(this.chartInit);
    },
    chartInit() {
      this.chartInstance = this.$echarts.init(
        document.getElementById("dialog-chart")
      );
      console.log(this.chartInstance);
      this.chartInstance.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
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
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            barWidth: 30,
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "Mail Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Affiliate Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: "Search Engine",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  &-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    padding: 25px 70px;
    &-title {
      margin-bottom: 8px;
    }
    &-value {
      font-size: 22px;
      color: #333;
    }
  }
}
#dialog-chart {
  width: 100%;
  height: 400px;
}
</style>