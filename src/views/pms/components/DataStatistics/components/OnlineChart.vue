<template>
  <div class="online">
    <div id="online-chart"></div>
    <div class="online-info">
      <div class="online-info-item">
        <p class="online-info-item-title">累计在线人数</p>
        <p class="online-info-item-value">{{ data.gains.total.current }}</p>
        <p class="online-info-item-other">
          <span
            >上一周期
            <span> {{ data.gains.total.before }} </span> 同比涨幅</span
          >
          <span :class="isRise(data.gains.total.gains) ? 'rise' : 'drop'">
            {{ data.gains.total.gains }} %
            <i
              :class="
                isRise(data.gains.total.gains)
                  ? 'el-icon-caret-top'
                  : 'el-icon-caret-bottom'
              "
            ></i
          ></span>
        </p>
      </div>
      <div class="online-info-item">
        <p class="online-info-item-title">PC端在线人数</p>
        <p class="online-info-item-value">{{ data.gains.pc.current }}</p>
        <p class="online-info-item-other">
          <span
            >上一周期 <span>{{ data.gains.pc.before }}</span> 同比涨幅</span
          >
          <span :class="isRise(data.gains.pc.gains) ? 'rise' : 'drop'"
            >{{ data.gains.pc.gains }}%
            <i
              :class="
                isRise(data.gains.pc.gains)
                  ? 'el-icon-caret-top'
                  : 'el-icon-caret-bottom'
              "
            ></i
          ></span>
        </p>
      </div>
      <div class="online-info-item">
        <p class="online-info-item-title">小程序在线人数</p>
        <p class="online-info-item-value">{{ data.gains.applet.current }}</p>
        <p class="online-info-item-other">
          <span
            >上一周期 <span>{{ data.gains.applet.before }}</span> 同比涨幅</span
          >
          <span :class="isRise(data.gains.applet.gains) ? 'rise' : 'drop'"
            >{{ data.gains.applet.gains }}%
            <i
              :class="
                isRise(data.gains.applet.gains)
                  ? 'el-icon-caret-top'
                  : 'el-icon-caret-bottom'
              "
            ></i
          ></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import resizeMixin from "../mixins";
export default {
  name: "OnlineChart",
  mixins: [resizeMixin],
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
    isRise(val) {
      return val >= 0;
    },
    chartInit() {
      const xAxisData = Object.keys(this.data.list.applet);
      const appletData = Object.values(this.data.list.applet);
      const pcData = Object.values(this.data.list.pc);
      const totalData = Object.values(this.data.list.total);
      this.chartInstance = this.$echarts.init(
        document.getElementById("online-chart")
      );
      this.chartInstance.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: "value",
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: "累计在线",
            type: "line",
            smooth: true,
            color: "#2CA7FF",
            data: totalData,
          },
          {
            name: "pc端",
            type: "line",
            smooth: true,
            color: "#4CD30C",
            data: pcData,
          },
          {
            name: "小程序",
            type: "line",
            smooth: true,
            color: "#FDC70B",
            data: appletData,
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.online {
  display: flex;
  align-items: center;
  #online-chart {
    width: 83%;
    height: 450px;
  }
  .online-info {
    &-item {
      padding: 20px 0;
      color: #999;
      font-size: 14px;
      &-value {
        font-size: 34px;
        padding: 10px 0;
        color: #666;
      }
      &-other {
        color: #ccc;
        .rise {
          color: #ff6c59;
        }
        .drop {
          color: #62a682;
        }
      }
    }
  }
}
</style>