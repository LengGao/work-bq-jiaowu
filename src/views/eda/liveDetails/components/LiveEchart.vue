<template>
  <div class="live-echart">
    <div class="cards">
      <div class="card-item">
        <p>小程序在线人数</p>
        <span class="card-item-number">55 <span>人</span></span>
      </div>
      <div class="card-item">
        <p>PC端在线人数</p>
        <span class="card-item-number">55 <span>人</span></span>
      </div>
      <div class="card-item">
        <p>最多在线人数</p>
        <span class="card-item-number">55 <span>人</span></span>
      </div>
    </div>
    <div class="chart">
      <Eachertline :xdata="lineXData" title="在线人数" :Yseries="lineYData" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LiveEchart",
  data() {
    return {
      lineXData: [],
      lineYData: [],
    };
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
}
</style>