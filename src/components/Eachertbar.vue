<template>
  <!-- <div class="about"> -->
  <div
    id="myChart"
    :style="{ width: '83%', height: '80%', float: 'left', marginLeft: '10px' }"
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
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              opacity: 0,
            },
            label: {
              backgroundColor: "#cecece",
            },
          },
        },
        title: {
          text: "销售趋势",
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
        grid: {
          left: "1%",
          right: "2%",
          bottom: "6%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            barWidth: "50%",
            data: this.Yseries,
            itemStyle: {
              normal: {
                color: "#1890FF",
              },
            },
            type: "bar",
          },
        ],

        //   animation: true,
        //   tooltip: {
        //     trigger: "axis",
        //     axisPointer: {
        //       type: "cross",
        //       label: {
        //         backgroundColor: "#cecece",
        //       },
        //     },
        //   },
        //   legend: {
        //     data: this.lines,
        //   },
        //   // toolbox: {
        //   //   feature: {
        //   //     saveAsImage: {},
        //   //   },
        //   // },
        //   grid: {
        //     left: "1%",
        //     right: "2%",
        //     bottom: "6%",
        //     containLabel: true,
        //   },
        //   xAxis: [
        //     {
        //       type: "category",
        //       boundaryGap: false,
        //       data: this.xdata,
        //       splitLine: {
        //         show: this.gridShow,
        //       },
        //       show: this.show,
        //       // axisTick: {
        //       //   alignWithLabel: true,
        //       // },
        //     },
        //   ],
        //   yAxis: [
        //     {
        //       type: "value",
        //       // splitLine: {
        //       //   // show: this.gridShow,
        //       //   show:true
        //       // },
        //       // axisTick:{
        //       //   show:true,
        //       //   alignWithLabel:true
        //       // },
        //       // show: this.show,
        //       position:'left',
        //       offset:'20'
        //     },
        //   ],
        //   series: [
        //     {
        //       name: "邮件营销",
        //       type: "bar",
        //       symbol: "none",
        //       smooth: true,
        //       stack: "总量",
        //       barWidth: "40%",
        //       itemStyle: {
        //         normal: {
        //           color: "#1890FF",
        //         },
        //       },
        //       areaStyle: {},
        //       // data: [120, 132, 101, 134, 90, 230, 210],
        //       data: this.Yseries,
        //     },
        //   ],
      });
    },
  },
};
</script>
