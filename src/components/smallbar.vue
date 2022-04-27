<template>
  <!-- <div class="about"> -->
  <div id="mysmallerChart" :style="{ width: '100%', height: '150px',marginLeft:'10px'}"></div>
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
    Yseries:Array,
    title:{
      type:String,
      default: '访问量',
    }
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
        console.log(newValue);
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
    console.log(12313231,this.Yseries)
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mysmallerChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          left: "left",
          fontSize: "14px",
          textStyle: {
            //文字颜色
            color: "#000000",
            //字体风格,'normal','italic','oblique'
            fontStyle: "normal",
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "600",
            //字体系列
            fontFamily: "sans-serif",
            //字体大小
            fontSize: 14,
          },
        },
        animation:true,
        // textStyle: {
        //   //文字颜色
        //   color: "#000000",
        //   //字体风格,'normal','italic','oblique'
        //   fontStyle: "normal",
        //   //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        //   fontWeight: "500",
        //   //字体系列
        //   fontFamily: "sans-serif",
        //   //字体大小
        //   fontSize: 16,
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#cecece",
            },
          },
        },
        legend: {
          data: this.lines,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          left: "0",
          // right: "2%",
          // bottom: "6%",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xdata,
            splitLine: {
              show: this.gridShow,
            },
            show: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: this.gridShow,
            },
            show:false,
          },
        ],
        series: [
          {
            name: "邮件营销",
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
            data:this.Yseries
          },
        ],
      });
    },
  },
};
</script>
