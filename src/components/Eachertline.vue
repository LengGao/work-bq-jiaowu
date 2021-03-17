<template>
  <!-- <div class="about"> -->
  <div
    id="myChart"
    :style="{ width: '83%', height: '90%', float: 'left', marginLeft: '10px' }"
  ></div>
  <!-- </div> -->
</template>
<script>
export default {
  name: "Eachertline",
  props: {
    lines: Array,
    xdata: Array,
    show: {
      type: Boolean,
      default: true,
    },
    gridShow: {
      type: Boolean,
      default: false,
    },
    Yseries: Array,
    title: {
      type: String,
      default: "访问量",
    },
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  watch: {
    xdata: {
      handler(newValue, oldValue) {
        this.drawLine();
      },
    },
    Yseries: {
      handler(newValue, oldValue) {
        // this.Yseries.length = 0
        this.drawLine();
        console.log(newValue);
      },
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          show: true,
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   label: {
          //     backgroundColor: "#6a7985",
          //   },
          // },
        },
        title: {
          text: this.title,
          left: "left",
          fontSize: "14px",
          textStyle: {
            //文字颜色
            color: "#000000",
            //字体风格,'normal','italic','oblique'
            fontStyle: "normal",
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "normal",
            //字体系列
            fontFamily: "sans-serif",
            //字体大小
            fontSize: 14,
          },
        },
        animation: true,

        legend: {
          data: this.lines,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "6%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            interval: 0,
            data: this.xdata,
            splitLine: {
              show: this.gridShow,
            },
            show: this.show,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: this.gridShow,
            },
            show: this.show,
          },
        ],
        series: [
          {
            // name: '邮件营销',
            type: "line",
            symbol: "none",
            smooth: true,
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#bbe1fc",
              },
            },
            areaStyle: {},
            // data: [120, 132, 101, 134, 90, 230, 210],
            data: this.Yseries,
          },
        ],
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.set);
  },
};
</script>
