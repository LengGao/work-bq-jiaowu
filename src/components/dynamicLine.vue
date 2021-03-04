<template>
  <!-- <div class="about"> -->
  <div
    style="width:100%;height:100%"
    id="myChart"
    :style="{ width: '100%', height: '90%', float: 'left' }"
  ></div>
  <!-- </div> -->
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
    Yseries: Array,
    title: {
      type: String,
      default: '访问量',
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      set: null,
    }
  },
  watch: {
    xdata: {
      handler(newValue, oldValue) {
        this.drawLine()
        console.log(newValue)
      },
    },
    Yseries: {
      handler(newValue, oldValue) {
        // this.Yseries.length = 0
        this.drawLine()
        console.log(newValue)
      },
    },
  },
  mounted() {
    this.drawLine()
    console.log(12313231, this.Yseries)
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      let option = {
        title: {
          text: this.title,
          left: 'left',
          fontSize: '14px',
          textStyle: {
            //文字颜色
            color: '#000000',
            //字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '600',
            //字体系列
            fontFamily: 'sans-serif',
            //字体大小
            fontSize: 14,
          },
        },
        animation: true,
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          data: this.lines,
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '6%',
          containLabel: true,
        },
        xAxis: [
          {
            // type: "category",
            // boundaryGap: false,
            // data: this.xdata,
            // splitLine: {
            //   show: this.gridShow,
            // },
            // show: this.show,
            type: 'category',
            boundaryGap: false,
            data: (function() {
              var res = []
              var len = 10
              while (len--) {
                res.push(10 - len - 1)
              }
              return res
            })(),
          },
        ],
        yAxis: [
          {
            type: 'value',
            scale: false,
            // max: 1200,
            // min: 0,
            // boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#bbe1fc',
              },
            },
            areaStyle: {},
            data: (function() {
              var res = []
              var len = 0
              while (len < 10) {
                res.push((Math.random() * 100 + 5).toFixed(1) - 0)
                len++
              }
              return res
            })(),
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
      }
      if (this.set != null) {
        clearInterval(this.set)
      }
      this.set = setInterval(() => {
        var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')
        console.log(axisData)
        var data0 = option.series[0].data
        data0.shift()
        data0.push(Math.round(Math.random() * 1000))
        option.xAxis[0].data.shift()
        option.xAxis[0].data.push(axisData)
        myChart.setOption(option)
      }, 3100)
    },
  },
  beforeDestroy() {
    clearInterval(this.set)
    this.set = null
  },
}
</script>
