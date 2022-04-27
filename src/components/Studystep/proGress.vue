<template>
  <div class="progresss">
    <div class="studentTag">
      <ul>
        <li
          v-for="item in tags"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <el-row>
      <template v-if="panelShow.punchPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>累计打卡天数</h3>
              <div class="time_num">
                <span>{{ panelData.day }}</span
                >天
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>平均打卡用时</h3>
              <div class="time_num">
                <span>{{ panelData.use_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>答题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>打卡正确率</h3>
              <div class="time_num">
                <span>{{ panelData.accuracy }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.practicePanel">
        <el-col :lg="4">
          <div class="timeCard">
            <div>
              <h3>做题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="4">
          <div class="timeCard">
            <div>
              <h3>做题进度</h3>
              <div class="time_num">
                <span>{{ panelData.make_problem_progress }} </span><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="4">
          <div class="timeCard">
            <div>
              <h3>正确率</h3>
              <div class="time_num">
                <span>{{ panelData.right_progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="4">
          <div class="timeCard">
            <div>
              <h3>收藏夹</h3>
              <div class="time_num">
                <span>{{ panelData.collection_count }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="4">
          <div class="timeCard">
            <div>
              <h3>错题集</h3>
              <div class="time_num">
                <span>{{ panelData.error_count }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.realTopicPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题进度</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>正确率</h3>
              <div class="time_num">
                <span>{{ panelData.accuracy }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>平均做题用时</h3>
              <div class="time_num">
                <span>{{ panelData.use_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.mockTestPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>模拟考试次数</h3>
              <div class="time_num">
                <span>{{ panelData.num }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>正确率</h3>
              <div class="time_num">
                <span>{{ panelData.accuracy }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>平均做题用时</h3>
              <div class="time_num">
                <span>{{ panelData.use_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </template>

      <template v-if="panelShow.topicChallengePanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>刷题挑战次数</h3>
              <div class="time_num">
                <span>{{ panelData.num }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>正确率</h3>
              <div class="time_num">
                <span>{{ panelData.accuracy }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>平均做题用时</h3>
              <div class="time_num">
                <span>{{ panelData.use_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.videoChapterPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>视频总个数</h3>
              <div class="time_num">
                <span>{{ panelData.total }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看个数</h3>
              <div class="time_num">
                <span>{{ panelData.watch_total }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看总时长</h3>
              <div class="time_num">
                <span>{{ panelData.watch_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看总进度</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.videoLiveingPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>直播场数</h3>
              <div class="time_num">
                <span>{{ panelData.total }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看场数</h3>
              <div class="time_num">
                <span>{{ panelData.watch_count }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看总时长</h3>
              <div class="time_num">
                <span>{{ panelData.stay_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>到课率</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.videoReviewPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>回播场数</h3>
              <div class="time_num">
                <span>{{ panelData.total_video }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看场数</h3>
              <div class="time_num">
                <span>{{ panelData.total_watch_num }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看总时长</h3>
              <div class="time_num">
                <span>{{ panelData.watch_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>观看总进度</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.selfDeterminationPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题总数</h3>
              <div class="time_num">
                <span>{{ panelData.total_problem }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>做题进度</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>正确率</h3>
              <div class="time_num">
                <span>{{ panelData.accuracy }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>平均做题用时</h3>
              <div class="time_num">
                <span>{{ panelData.use_time }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-if="panelShow.subscribeClassroomPanel">
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>面授课次数</h3>
              <div class="time_num">
                <span>{{ panelData.total }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>完成次数</h3>
              <div class="time_num">
                <span>{{ panelData.achieve }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>失约次数</h3>
              <div class="time_num">
                <span>{{ panelData.miss }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="timeCard">
            <div>
              <h3>到课率</h3>
              <div class="time_num">
                <span>{{ panelData.progress }}</span
                ><em>%</em>
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
    <!--table部分-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          v-for="(item, index) in headTitle"
          :key="index"
          :prop="item.prop"
          :label="item.title"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTagactive: 1,
      schoolData: [],
      headTitle: [],
      panelData: [],
      state: 0,
      page: 1,
      punch: [],
      practice: [],
      realTopic: [],
      mockTest: [],
      topicChallenge: [],
      selfDetermination: [],
      subscribeClassroom: [],
      apiText: 'punch',
      panelShow: {
        punchPanel: false,
        practicePanel: false,
        realTopicPanel: false,
        mockTestPanel: false,
        videoLiveingPanel: false,
        videoReviewPanel: false,
        topicChallengePanel: false,
        videoChapterPanel: false,
        selfDeterminationPanel: false,
        subscribeClassroomPanel: false,
      },

      //每日打卡
      punchTitle: [
        { prop: 'date_time', title: '打卡时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'accuracy', title: '正确率' },
        { prop: 'use_time', title: '打卡用时' },
        { prop: 'ranking', title: '打卡排行' },
      ],
      //章节练习
      practiceTitle: [
        { prop: 'chapter_name', title: '章节名称' },
        { prop: 'create_time', title: '做题时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'do_problem', title: '做题数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'progress', title: '做题进度' },
        { prop: 'use_time', title: '做题用时' },
        { prop: 'accuracy', title: '正确率' },
      ],
      //历年真题
      realTopicTitle: [
        { prop: 'chapter_name', title: '试卷名称' },
        { prop: 'operation_type', title: '模式' },
        { prop: 'create_time', title: '做题时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'error_problem', title: '错误题数' },
        { prop: 'unanswered', title: '未回答题数' },
        { prop: 'use_time', title: '做题用时' },
        { prop: 'mark', title: '得分' },
        { prop: 'accuracy', title: '正确率' },
      ],
      //模拟考试
      mockExamTitle: [
        { prop: 'create_time', title: '考试时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'error_problem', title: '错误题数' },
        { prop: 'unanswered', title: '未回答题数' },
        { prop: 'use_time', title: '做题用时' },
        { prop: 'mark', title: '得分' },
        { prop: 'accuracy', title: '正确率' },
      ],
      //刷题挑战
      topicChallengeTitle: [
        { prop: 'create_time', title: '挑战时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'mark', title: '得分' },
        { prop: 'accuracy', title: '正确率' },
        { prop: 'use_time', title: '做题用时' },
      ],
      //录播视频
      videoChapterTitle: [
        { prop: 'chapter_name', title: '章节视频' },
        { prop: 'start_time', title: '开始学习时间' },
        { prop: 'finished_time', title: '最后学习时间' },
        { prop: 'watch_time', title: '观看时长' },
        { prop: 'progress', title: '观看进度' },
      ],
      //直播视频
      videoLiveingTitle: [
        { prop: 'live_id', title: '直播场数' },
        { prop: 'live_name', title: '直播名称' },
        { prop: 'entry_time', title: '开始加入时间' },
        { prop: 'leave_time', title: '最后离开时间' },
        { prop: 'play_duration', title: '观看时长' },
        { prop: 'progress', title: '观看进度' },
      ],
      //回播视频
      videoReviewTitle: [
        { prop: 'live_video_name', title: '回播场次' },
        { prop: 'media_name', title: '回播名称' },
        { prop: 'start_time', title: '开始加入时间' },
        { prop: 'leave_time', title: '最后离开时间' },
        { prop: 'height_time', title: '观看时长' },
        { prop: 'progress', title: '观看进度' },
      ],
      //自主出题
      selfDeterminationTitle: [
        { prop: 'chapter_name', title: '试卷名称' },
        { prop: 'create_time', title: '做题时间' },
        { prop: 'total_problem', title: '题目总数' },
        { prop: 'right_problem', title: '正确题数' },
        { prop: 'error_problem', title: '错误题数' },
        { prop: 'unanswered', title: '未回答题数' },
        { prop: 'use_time', title: '做题用时' },
        { prop: 'mark', title: '得分' },
        { prop: 'accuracy', title: '正确率' },
      ],
      //面授约课
      subscribeClassroomTitle: [
        { prop: 'classroom_name', title: '面授课名称' },
        { prop: 'chapter_name', title: '课程内容' },
        { prop: 'teacher_name', title: '任课老师' },
        { prop: 'specific_time_range', title: '上课时间' },
        { prop: 'address', title: '上课地点' },
        { prop: 'status_name', title: '完成状态' },
      ],

      tags: [
        {
          id: 1,
          name: '每日打卡',
          state: 0,
          apiText: 'punch',
        },
        {
          id: 2,
          name: '章节练习',
          state: 1,
          apiText: 'practice',
        },
        {
          id: 3,
          name: '历年真题',
          state: 2,
          apiText: 'realTopic',
        },
        {
          id: 4,
          name: '模拟考试',
          state: 3,
          apiText: 'mockExam',
        },
        {
          id: 5,
          name: '刷题挑战',
          state: 4,
          apiText: 'topicChallenge',
        },
        {
          id: 6,
          name: '录播视频',
          state: 5,
          apiText: '',
        },
        {
          id: 7,
          name: '直播视频',
          state: 6,
          apiText: '',
        },
        {
          id: 8,
          name: '回播视频',
          state: 7,
          apiText: '',
        },
        {
          id: 9,
          name: '面授约课',
          state: 8,
          apiText: 'subscribeClassroom',
        },
        {
          id: 10,
          name: '自主出题',
          state: 9,
          apiText: 'selfDetermination',
        },
      ],
      //每日打卡面板
    }
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
    this.headTitle = this.punchTitle
    let all = {
      id: 1,
      name: '每日打卡',
      apiText: 'punch',
      state: 0,
    }
    this.statusSwitch(all)
  },
  mounted() {
    // this.$api.studyProgressReport(this)
    // this.$api.getProgressList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getProgressList(this, 'schoolData')
    },
    statusSwitch(all) {
      //单击tag是切换背景颜色
      this.state = all.state
      this.isTagactive = all.id
      this.apiText = all.apiText
      this.$api.getProgressList(this, 'schoolData')
      if (all.id == 1) {
        this.headTitle = this.punchTitle
        this.panelShow.punchPanel = true
        // this.panelData = this.punch
        for (var i in this.panelShow) {
          // console.log(i)
          if (i != 'punchPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
      } else if (all.id == 2) {
        this.panelShow.practicePanel = true
        // this.panelData = this.practice
        for (var i in this.panelShow) {
          // console.log(i)
          if (i != 'practicePanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.practiceTitle
      } else if (all.id == 3) {
        this.panelShow.realTopicPanel = true
        this.panelData = this.realTopic
        for (var i in this.panelShow) {
          if (i != 'realTopicPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.realTopicTitle
      } else if (all.id == 4) {
        this.panelShow.mockTestPanel = true
        this.panelData = this.mockTest
        for (var i in this.panelShow) {
          if (i != 'mockTestPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.mockExamTitle
      } else if (all.id == 5) {
        this.panelShow.topicChallengePanel = true
        // this.panelData = this.topicChallenge
        for (var i in this.panelShow) {
          if (i != 'topicChallengePanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.topicChallengeTitle
      } else if (all.id == 6) {
        this.panelShow.videoChapterPanel = true
        // this.panelData = this.topicChallenge
        for (var i in this.panelShow) {
          if (i != 'videoChapterPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.videoChapterTitle
      } else if (all.id == 7) {
        this.panelShow.videoLiveingPanel = true
        // this.panelData = this.topicChallenge
        for (var i in this.panelShow) {
          if (i != 'videoLiveingPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.videoLiveingTitle
      } else if (all.id == 8) {
        this.panelShow.videoReviewPanel = true
        // this.panelData = this.topicChallenge
        for (var i in this.panelShow) {
          if (i != 'videoReviewPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.videoReviewTitle
      } else if (all.id == 9) {
        this.panelShow.subscribeClassroomPanel = true
        this.panelData = this.subscribeClassroom
        for (var i in this.panelShow) {
          if (i != 'subscribeClassroomPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.subscribeClassroomTitle
      } else if (all.id == 10) {
        this.panelShow.selfDeterminationPanel = true
        this.panelData = this.selfDetermination
        for (var i in this.panelShow) {
          if (i != 'selfDeterminationPanel') {
            console.log(this.panelShow[i])
            this.panelShow[i] = false
          }
        }
        this.headTitle = this.selfDeterminationTitle
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tabg {
  background: #2798ee;
  color: #fff !important;
  border: 1px solid #2798ee !important;
}
.studentTag {
  padding: 20px 0;
  ul {
    max-width: 790px;
    display: flex;
    justify-content: space-between;
    li {
      width: 68px;
      height: 28px;
      font-size: 14px;
      border-radius: 2px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      color: #666666;
    }
    li:last-child {
      margin-right: 0px !important;
    }
  }
}
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;

  .time_num {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      font-size: 35px;
      font-weight: 600;
    }
    em {
      font-size: 20px;
    }
  }
}
.userTable {
  padding-top: 20px;
}
</style>
