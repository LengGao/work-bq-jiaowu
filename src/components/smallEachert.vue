<template>
  <!-- <div class="about"> -->
  <div id="mysmallChart" :style="{ width: '100%', height:'140px'}"></div>
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
    console.log(12313231, this.Yseries);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mysmallChart"));
      // 绘制图表
      myChart.setOption({
        title: {
       
          left: "left",
          fontSize: "30px",
          textStyle: {
            //文字颜色
            color: "rgba(0, 0, 0, 0.847058823529412)",
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
        grid: {
          left: "0%",
          // top:'0%',
          // right: "2%",
          // bottom: "5px",
          containLabel: false,
        },
          tooltip: {
            trigger: "axis",
            axisPointer: {
             type: 'shadow',
              label: {
                backgroundColor: "#cecece",
              },
            },
          },
        xAxis: {
          type: "category",
          data: this.xdata,
          show: false
         
        },
        yAxis: {
          type: "value",
          show: false
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
      });
    },
  },
};
</script>
