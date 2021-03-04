<template>
  <div>
    <el-row>
      <el-col :lg="8">
        <div class="timeCard">
          <div>
            <h3>小程序在线人数</h3>
            <div class="time_num">
              <span>{{ wechat_count }}</span
              >人
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="8">
        <div class="timeCard">
          <div>
            <h3>PC端在线人数</h3>
            <div class="time_num">
              <span>{{ pc_count }}</span
              >人
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="8">
        <div class="timeCard">
          <div>
            <h3>最多在线人数</h3>
            <div class="time_num">
              <span>{{ total_count }}</span
              >人
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :lg="6">
        <div class="timeCard">
          <div>
            <h3>累计互动人数</h3>
            <div class="time_num">
              <span>{{ num_of_live }}</span
              >次
            </div>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <div class="practive">
      <div style="display:flex; height: 400px;">
        <!-- <eachertline :lines="msg" :xdata="xdata" style="flex:1" title="在线人数"/> -->
        <!-- <dynamicLine
          :lines="msg"
          :xdata="xdata"
          :Yseries="Yseries"
          ref="dynamic"
        /> -->
        <eachertline
          :lines="msg"
          :xdata="chart.x_axis"
          :Yseries="chart.y_axis"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      msg: [],
      single_qualified: '',
      multiple_qualified: '',
      judge_qualified: '',
      fill_qualified: '',
      scenes_qualified: '',
      Yseries: [],
      xdata: [],
      chart: {},
      challengeList: [],
      schoolData: [],
      practice: [],
      pc_count: 0,
      total_count: 0,
      wechat_count: 0,
      // study_days: 0,
      // answer_days: 0,
      // watch_video_time: 0,
      // num_of_live: 0,
    }
  },
  computed: {
    examTest: function() {
      let arr = []
      arr = [
        {
          quesTitle: '单选题',
          quesType: this.single_qualified,
        },
        {
          quesTitle: '多选题',
          quesType: this.multiple_qualified,
        },
        {
          quesTitle: '判断题',
          quesType: this.judge_qualified,
        },
        {
          quesTitle: '填空题',
          quesType: this.fill_qualified,
        },
        {
          quesTitle: '场景题',
          quesType: this.scenes_qualified,
        },
      ]
      console.log(arr)
      return arr
    },
  },
  props: {
    uid: {
      type: Number,
    },
    course_id: {
      type: String,
    },
  },
  mounted() {
    this.$api.getLiveSummary(this, name)
    // this.ChangeData('today')
    // axios
    //   .get('/api/data')
    //   .then((res) => {
    //     //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
    //     this.data = res.data.data
    //     console.log(res.data) //在console中看到数据
    //   })
    //   .catch((res) => {
    //     alert('wrong')
    //   }) //获取本地模拟数据
    // this.set = setTimeout(() => {
    //   this.xdata = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    // }, 2000)
  },
  created() {
    // console.log(this.uid)
    // this.$api.studyReportForWord(this, 'schoolData')
  },
  methods: {
    // ChangeData(data) {
    //   axios.interceptors.request.use(
    //     (config) => {
    //       if (config.method === 'post') {
    //         config.data = qs.stringify(config.data)
    //       }
    //       return config
    //     },
    //     (error) => {
    //       // 对请求错误做些什么
    //       return Promise.reject(error)
    //     }
    //   )
    //   let that = this
    //   axios({
    //     method: 'get',
    //     url: '/api/data',
    //     data: JSON.stringify({
    //       data: data,
    //     }),
    //   })
    //     .then((res) => {
    //       console.log(that.Yseries, res.data.data[0])
    //       that.xdata = res.data.data[0].data
    //       console.log(that.xdata)
    //       res.data.data.splice(0, 1)
    //       //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
    //       if (that.Yseries.length != 0) {
    //         that.Yseries.length = 0
    //       }
    //       console.log(that.Yseries, that.Yseries.length)
    //       for (let item of res.data.data) {
    //         that.Yseries.push(item.attention_degree)
    //       }
    //       console.log(that.Yseries) //在console中看到数据
    //       // this.dyan()
    //     })
    //     .catch((res) => {
    //       console.log('wrong')
    //     }) //获取本地模拟数据
    // },
    // dyan(){
    //     this.$refs.dynamic.set()
    // }
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.timeCard {
  width: 70%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;
  h3 {
    font-family: 'Microsoft YaHei UI', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #606266;
    font-size: 14px;
  }
  .time_num {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      font-family: 'Microsoft YaHei UI', sans-serif;
      font-weight: 400;
      font-style: normal;
      color: #606266;
      font-size: 35px;
    }
  }
}
.practive {
  padding-top: 20px;

  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 6px;
    margin-bottom: 20px;
    border-left: 4px solid #199fff;
    font-weight: 600;
  }
}
</style>
