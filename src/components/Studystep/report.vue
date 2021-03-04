<template>
  <div>
    <el-row>
      <el-col :lg="6">
        <div class="timeCard">
          <div>
            <h3>坚持学习天数</h3>
            <div class="time_num">
              <span>{{ study_days }}</span
              >天
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="6">
        <div class="timeCard">
          <div>
            <h3>累计刷题天数</h3>
            <div class="time_num">
              <span>{{ make_problem_day }}</span
              >天
            </div>
          </div>
        </div>
      </el-col>

      <el-col :lg="6">
        <div class="timeCard">
          <div>
            <h3>观看视频时间</h3>
            <div class="time_num">
              <span>{{ watch_video_time }}</span
              >分钟
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="6">
        <div class="timeCard">
          <div>
            <h3>参加直播场次</h3>
            <div class="time_num">
              <span>{{ watch_live_total }}</span
              >场
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="practive">
      <h1>章节练习</h1>
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="practice"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          class="min_table"
        >
          <el-table-column
            prop="total_problem"
            label="刷题总数"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="make_problem_progress"
            label="做题进度"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="right_progress"
            label="正确率"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="collection_count"
            label="收藏题数"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="error_count"
            label="错数题数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
      </div>
    </div>
    <div class="practive">
      <h1>模拟考试</h1>
      <div style="display:flex;">
        <smallbar :lines="msg" :xdata="allvisx" :Yseries="allvisy" />
        <div class="practive" style="width:333px">
          <h1>各类题型正确率</h1>
          <div class="userTable">
            <el-table
              ref="multipleTable"
              :data="examTest"
              tooltip-effect="light"
              stripe
              style="width: 100%;"
              class="min_table"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                prop="quesTitle"
                label="题型"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="quesType"
                label="正确率"
                min-width="110"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
            <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="practive">
      <h1>打卡挑战</h1>
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="challengeList"
          tooltip-effect="light"
          stripe
          style="width: 100%;"
          class="min_table"
        >
          <el-table-column
            prop="days"
            label="累计打卡天数"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="correctRate"
            label="打卡平均正确率"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total"
            label="刷题挑战次数"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="max_mark"
            label="最好挑战成绩"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
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
      allvisx: [],
      allvisy: [],
      allvis: null,
      single_qualified: '',
      multiple_qualified: '',
      judge_qualified: '',
      fill_qualified: '',
      scenes_qualified: '',

      xdata: [],
      challengeList: [],
      schoolData: [],
      practice: [],
      study_days: 0,
      make_problem_day: 0,
      watch_video_time: 0,
      watch_live_total: 0,
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
      type: Number,
    },
  },
  created() {
    console.log(this.uid)
  },
  mounted() {
    this.$api.studyReportForWord(this, 'schoolData')
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
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  border-radius: 4px;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;
  color: #666666;
  .time_num {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      font-size: 35px;
      font-weight: 600;
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
    color: #666;
  }
}
</style>
