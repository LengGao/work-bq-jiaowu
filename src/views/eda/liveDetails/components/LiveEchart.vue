<template>
  <div class="live-echart" v-loading="loading">
    <div class="cards">
      <div class="card-item">
        <p>小程序在线人数</p>
        <span class="card-item-number"
          >{{ data.wechat_count || 0 }} <span>人</span></span
        >
      </div>
      <div class="card-item">
        <p>PC端在线人数</p>
        <span class="card-item-number"
          >{{ data.pc_count || 0 }} <span>人</span></span
        >
      </div>
      <div class="card-item">
        <p>最多在线人数</p>
        <span class="card-item-number"
          >{{ data.total_count || 0 }} <span>人</span></span
        >
      </div>
    </div>
    <div class="chart">
      <Eachertline
        width="95%"
        :xdata="lineXData"
        title="在线人数"
        :Yseries="lineYData"
      />
    </div>
  </div>
</template>

<script>
import { getLiveSummary } from "@/api/eda";
export default {
  name: "LiveEchart",
  data() {
    return {
      lineXData: [],
      lineYData: [],
      loading: false,
      data: {},
    };
  },
  created() {
    this.getLiveSummary();
  },
  methods: {
    async getLiveSummary() {
      const data = {
        live_id: this.$route.query?.live_id || "",
      };
      this.loading = true;
      const res = await getLiveSummary(data).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (res.code === 0) {
        this.data = res.data;
        this.lineXData = res.data.chart.x_axis;
        this.lineYData = res.data.chart.y_axis;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.live-echart {
  .cards {
    display: flex;
    .card-item {
      border: 1px solid #d7d7d7;
      border-radius: 4px;
      padding: 16px;
      flex: 1;
      margin-right: 20px;
      color: #606266;
      &:last-child {
        margin-right: 0;
      }
      p {
        margin-bottom: 10px;
      }
      &-number {
        font-size: 32px;
        span {
          font-size: 14px;
        }
      }
    }
  }
  .chart {
    padding-top: 30px;
    height: 450px;
  }
}
</style>