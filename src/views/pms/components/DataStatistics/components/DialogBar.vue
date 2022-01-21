<template>
  <el-dialog
    :title="title"
    :visible="value"
    width="1000px"
    :close-on-click-modal="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div v-loading="loading">
      <div class="card">
        <div class="card-item">
          <div class="card-item-title">订单数量</div>
          <div class="card-item-value">{{ data.order_count }}</div>
        </div>
        <div class="card-item">
          <div class="card-item-title">订单金额</div>
          <div class="card-item-value">
            {{ data.order_money | moneyFormat }}
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-title">回款金额</div>
          <div class="card-item-value">
            {{ data.order_returned_money_this_month | moneyFormat }}
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-title">退款金额</div>
          <div class="card-item-value">
            {{ data.order_refund_money | moneyFormat }}
          </div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="dialog-chart" :id="`chart-${type}`" ref="chart"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getJobTitleDetail, getEducationDetail } from "@/api/workbench.js";
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
    type: {
      type: String,
      default: "job",
    },
    returnedType: {
      type: [Number, String],
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    userIds: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartInstance: null,
      loading: false,
    };
  },
  methods: {
    handleOpen() {
      if (this.type === "edu") {
        this.getEducationDetail();
      } else {
        this.getJobTitleDetail();
      }
    },
    async getEducationDetail() {
      const data = {
        type_id: this.data.id,
        month: this.month,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.loading = true;
      const res = await getEducationDetail(data);
      this.loading = false;
      if (res.code === 0) {
        this.chartInit(res.data);
      }
    },
    async getJobTitleDetail() {
      const data = {
        category_id: this.data.category_id,
        month: this.month,
        arr_uid: this.userIds,
        returned_type: this.returnedType,
      };
      this.loading = true;
      const res = await getJobTitleDetail(data);
      this.loading = false;
      if (res.code === 0) {
        this.chartInit(res.data);
      }
    },
    chartInit(data) {
      const orderMoneyData = [];
      const orderRefundMoneyData = [];
      const orderReturnedMoneyData = [];
      const yAxisData = [];
      if (data.length > 8) {
        this.$refs.chart.style.height = data.length * 60 + "px";
      } else {
        this.$refs.chart.style.height = 400 + "px";
      }
      data.reverse().forEach((item) => {
        orderMoneyData.push(item.order_money);
        orderRefundMoneyData.push(item.order_refund_money);
        orderReturnedMoneyData.push(item.order_returned_money);
        yAxisData.push(item.name);
      });
      this.chartInstance && this.chartInstance.resize();
      this.chartInstance = this.$echarts.init(
        document.getElementById(`chart-${this.type}`)
      );
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
          data: yAxisData,
        },
        series: [
          {
            name: "订单金额",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            barWidth: 30,
            emphasis: {
              focus: "series",
            },
            data: orderMoneyData,
          },
          {
            name: "回款金额",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: orderRefundMoneyData,
          },
          {
            name: "退款金额",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: orderReturnedMoneyData,
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
    padding: 25px 0;
    width: 24%;
    &-title {
      margin-bottom: 8px;
    }
    &-value {
      font-size: 22px;
      color: #333;
    }
  }
}
.dialog-content {
  height: 400px;
  overflow-y: auto;
}
.dialog-chart {
  width: 100%;
  height: 400px;
}
</style>