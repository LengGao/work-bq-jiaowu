<template>
  <div class="about">
    <div id="myChart" :style="{ width: '70%', height: '300px' }"></div>
  </div>
</template>
<script>
export default {
  name: 'Eachertline',
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
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  watch: {
    xdata: {
      handler(newValue, oldValue) {
        this.drawLine()
        console.log(newValue)
      },
    },
  },

  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '在线人数',
          left: 'left',
        },
        textStyle: {
          //文字颜色
          color: '#000000',
          //字体风格,'normal','italic','oblique'
          fontStyle: 'normal',
          //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          fontWeight: '700',
          //字体系列
          fontFamily: 'sans-serif',
          //字体大小
          fontSize: 16,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#cecece',
            },
          },
        },
        legend: {
          data: this.lines,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xdata,
            splitLine: {
              show: this.gridShow,
            },
            show: this.show,
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: this.gridShow,
            },
            show: this.show,
          },
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            symbol: 'none',
            smooth: true,
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#515c64',
              },
            },
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      })
    },
  },
}
</script>
