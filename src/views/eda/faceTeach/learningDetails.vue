<template>
  <section>
    <div class="detail-content">
      <div class="detail-infoname">
        <div class="detail-label">学生姓名</div>
        <div class="detail-con">{{ruleForm.surname}}</div>
      </div>
      <div class="detail-info">
        <div class="detail-label">手机号码</div>
        <div class="detail-con">{{ruleForm.mobile}}</div>
      </div>
      <div class="detail-infonum">
        <div class="detail-label">身份证号</div>
        <div class="detail-con">{{ruleForm.id_card_number}}</div>
      </div>
      <div class="detail-infocon">
        <div class="detail-label">课程名称</div>
        <div class="detail-con">{{$route.query.course_name}}</div>
      </div>
    </div>

    <section class="main-contain">
      <el-row style="min-width:1100px;padding: 0 20px;">
        <el-col :lg="24" :md="24" :sm="24" :xs="24">

          <div class="navigationBox">
            <ul class="navigation">
              <li v-for="item in tabFun" :key="item.id" @click="statusSwitch(item)"
                :class="{ tabg: item.id == isTagactive }">
                {{ item.name }}
              </li>
            </ul>
          </div>

          <!--每日打卡-->
          <div v-if="isTagactive == 1">
            <div class="punchclock">
              <ul>
                <li>
                  <p>累计打卡天数</p>
                  <div>
                    <strong>{{dataTitle.total_day}}</strong>
                    <span>天</span>
                  </div>
                </li>
                <li>
                  <p>平均打卡用时</p>
                  <strong>{{dataTitle.use_time}}</strong>
                </li>
                <li>
                  <p>答对题数</p>
                  <strong>{{dataTitle.right_num}}</strong>
                </li>
                <li>
                  <p>打卡正确率</p>
                  <strong>{{dataTitle.correct_rate}}</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table :data="dataList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
                <el-table-column prop="create_time" label="打卡时间" show-overflow-tooltip min-width="100">
                </el-table-column>
                <el-table-column prop="total_num" label="题目总数" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="use_time" label="打卡用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="rank" label="打卡排行" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <!-- <div class="table_bottom">
              <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
            </div> -->
          </div>
          <!--章节练习-->
          <div v-if="isTagactive == 2">
            <div class="chapter">
              <ul>
                <li>
                  <p>做题总数</p>
                  <div>
                    <strong>{{chapterTitle.total_num}}</strong>
                  </div>
                </li>
                <li>
                  <p>做题进度</p>
                  <strong>{{chapterTitle.progress}}</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>{{chapterTitle.correct_rate}}</strong>
                </li>
                <li>
                  <p>收藏夹</p>
                  <strong>{{chapterTitle.favorites_num}}</strong>
                </li>
                <li>
                  <p>错题集</p>
                  <strong>{{chapterTitle.fail_num}}</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table :data="chapterList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="chapter_name" label="章节名称" show-overflow-tooltip min-width="140">
                </el-table-column>
                <el-table-column prop="create_time" label="最后做题时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="topic_num" label="题目总数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="total_num" label="做题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="progress" label="做题进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <!-- <div class="table_bottom">
                <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
              </div> -->
            </div>
          </div>
          <!--历年真题-->
          <div v-if="isTagactive == 3">
            <div class="punchclock">
              <ul>
                <!-- <li>
                  <p>最高分数</p>
                  <div>
                    <strong>{{pastTitle.max_mark}}</strong>
                  </div>
                </li> -->
                <li>
                  <p>平均分数</p>
                  <strong>{{pastTitle.mark}}</strong>
                </li>
                <li>
                  <p>考试次数</p>
                  <strong>{{pastTitle.num}}</strong>
                </li>
                <li>
                  <p>平均正确率</p>
                  <strong>{{pastTitle.correct_rate}}</strong>
                </li>
                <li>
                  <p>平均用时</p>
                  <strong>{{pastTitle.use_time}}</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="pastList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="chapter_name" label="试卷名称" show-overflow-tooltip min-width="140">
                </el-table-column>
                <el-table-column prop="model_name" label="模式" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="create_time" label="做题时间" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="total_num" label="题目总数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="fail_num" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="not_answer_num" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="create_time" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mark" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>

          </div>
          <!--模拟考试-->
          <div v-if="isTagactive == 4">
            <div class="punchclock">
              <ul>
                <li>
                  <p>模拟考试次数</p>
                  <div>
                    <strong>{{mockTitle.num}}</strong>
                  </div>
                </li>
               
                <li>
                  <p>模拟考试平均分数</p>
                  <strong>{{mockTitle.mark}}</strong>
                </li>
                <li>
                  <p>做题正确率</p>
                  <strong>{{mockTitle.correct_rate}}</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>{{mockTitle.use_time}}</strong>
                </li>
                
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="mockList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="name" label="试卷名称" show-overflow-tooltip min-width="150">
                </el-table-column>
                <el-table-column prop="create_time" label="考试时间" min-width="150" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="total_num" label="题目总数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="fail_num" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="not_answer_num" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="use_time" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mark" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>


          </div>
          <!--刷题挑战-->
          <div v-if="isTagactive == 5">
            <div class="punchclock">
              <ul>
                <li>
                  <p>刷题挑战次数</p>
                  <div>
                    <strong>{{challeTitle.num}}</strong>
                  </div>
                </li>
                <li>
                  <p>刷题挑战平均分数</p>
                  <strong>{{challeTitle.mark}}</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>{{challeTitle.correct_rate}}</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>{{challeTitle.use_time}}</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="challeList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="create_time" label="挑战时间" show-overflow-tooltip min-width="100">
                </el-table-column>
                <el-table-column prop="use_time" label="平均用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="total_num" label="题目总数" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="fail_num" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mark" label="得分" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
               
                <el-table-column prop="rank" label="挑战排名" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--录播视频-->
          <div v-if="isTagactive == 6">
            <div class="punchclock">
              <ul>
                <li>
                  <p>视频总个数</p>
                  <div>
                    <strong>{{dataTitle.total}}</strong>
                  </div>
                </li>
                <li>
                  <p>累计完成个数</p>
                  <strong>{{dataTitle.watch_total}}</strong>
                </li>
                <li>
                  <p>
                    观看总时长</p>
                  <strong>{{dataTitle.stay_time}}</strong>
                </li>
                <li>
                  <p>
                    观看总进度</p>
                  <strong>{{dataTitle.progress}}%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="dataList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="chapter_name" label="章节名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="start_time" label="开始学习时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="finished_time" label="最后学习时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <!-- <el-table-column prop="watch_time" label="章节时长" min-width="100" show-overflow-tooltip>50%
                </el-table-column> -->
                <el-table-column prop="watch_time" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="progress" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="course_price" label="操作" min-width="100" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div style="display: flex; justify-content:center;">
                      <el-button type="text" @click="">课时详情</el-button>
                    </div>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>

          </div>
          <!--直播视频-->
          <div v-if="isTagactive == 7">
            <div class="punchclock">
              <ul>
                <li>
                  <p>直播场数</p>
                  <div>
                    <strong>{{dataTitle.total}}</strong>
                  </div>
                </li>
                <li>
                  <p>观看场数</p>
                  <strong>{{dataTitle.watch_count}}</strong>
                </li>
                <li>
                  <p>观看总时长</p>
                  <strong>{{dataTitle.stay_time}}</strong>
                </li>
                <li>
                  <p>到课率</p>
                  <strong>{{dataTitle.progress}}%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="dataList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="stream_name" label="直播场数" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="live_name" label="直播名称" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="start_time" label="开始加入时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="leave_time" label="最后离开时间" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="watch_time" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="progress" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--回播视频-->
          <div v-if="isTagactive == 8">
            <div class="punchclock">
              <ul>
                <li>
                  <p>回播场数</p>
                  <div>
                    <strong>{{dataTitle.total_video}}</strong>
                  </div>
                </li>
                <li>
                  <p>观看场数</p>
                  <strong>{{dataTitle.total_watch_num}}</strong>
                </li>
                <li>
                  <p>观看总时长</p>
                  <strong>{{dataTitle.watch_time}}</strong>
                </li>
                <li>
                  <p>观看总进度</p>
                  <strong>{{dataTitle.progress}}%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="dataList" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="live_video_name" label="回播场数" show-overflow-tooltip min-width="100">2020-06-04
                  16:30
                </el-table-column>
                <el-table-column prop="media_name" label="回播名称" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="start_time" label="开始加入时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="leave_time" label="最后离开时间" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="watch_time" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="progress" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--面授约课-->
          <div v-if="isTagactive == 9">
            <div class="punchclock">
              <ul>
                <li>
                  <p>面授课次数</p>
                  <div>
                    <strong>{{faceTitle.total_num}}</strong>
                  </div>
                </li>
                <li>
                  <p>完成次数</p>
                  <strong>{{faceTitle.completions_num}}</strong>
                </li>
                <li>
                  <p>失约次数</p>
                  <strong>{{faceTitle.missed_num}}</strong>
                </li>
                <li>
                  <p>到课率</p>
                  <strong>{{faceTitle.attendance_rate}}%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="faceList" tooltip-effect="light" stripe
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="subscribe_classroom_name" label="面授课名称" show-overflow-tooltip min-width="100">
                </el-table-column>
                <el-table-column prop="chapter_name" label="课程内容" min-width="100" column-key="course_id"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="teacher_name" label="任课老师" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="specific_time_range" label="上课时间" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="上课地点" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status_name" label="完成状态" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--自主出题-->
          <div v-if="isTagactive == 10">
            <div class="punchclock">
              <ul>
                <li>
                  <p>做题总数</p>
                  <div>
                    <strong>{{selfTitle.num}}</strong>
                  </div>
                </li>
                <li>
                  <p>平均做题得分</p>
                  <strong>{{selfTitle.mark}}</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>{{selfTitle.correct_rate}}</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>{{selfTitle.use_time}}</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="selfList" tooltip-effect="light" stripe
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="chapter_name" label="试卷名称" show-overflow-tooltip min-width="100">
                </el-table-column>
                <!-- <el-table-column prop="use_time" label="做题时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="total_num" label="题目总数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="right_num" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="fail_num" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="not_answer_num" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="use_time" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mark" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="correct_rate" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </section>
</template>

<script>
  import { getStudentBasicDetail, dailyClockIn, chapterExercises, pastRealQuestions, mockExam, challenge, FaceToFaceLesson, selfProposed } from "@/api/eda";
  export default {
    data() {
      return {
        state: 0,
        isTagactive: 1,
        dataTitle: {},
        dataList: [{ create_time: "" }],
        chapterTitle: {},
        chapterList: [],
        pastTitle: {},
        pastList: [],
        mockTitle: {},
        mockList: [],
        challeTitle: {},
        challeList: [],
        faceTitle: {},
        faceList: [],
        selfTitle: {},
        selfList: [],
        ruleForm: {},
        tabFun: [
          {
            id: 1,
            name: '每日打卡',

          },
          {
            id: 2,
            name: '章节练习',

          },
          {
            id: 3,
            name: '历年真题',

          },
          {
            id: 4,
            name: '模拟考试',
          },
          {
            id: 5,
            name: '刷题挑战',

          },
          // {
          //   id: 6,
          //   name: '录播视频',
          // },
          // {
          //   id: 7,
          //   name: '直播视频',

          // },
          // {
          //   id: 8,
          //   name: '回播视频',

          // },
          {
            id: 9,
            name: '面授约课',

          },
          {
            id: 10,
            name: '自主出题',

          },
        ],
      }
    },
    created() {
      this.getStudentBasicDetail(),
      this.dailyClockIn()
    },
    methods: {
      statusSwitch(row) {
        this.isTagactive = row.id
        if (row.id === 1) {
          this.dailyClockIn()
        }
        else if (row.id === 2) {
          this.chapterExercises()
        }
        else if (row.id === 3) {
          this.pastRealQuestions()
        }
        else if (row.id === 4) {
          this.mockExam()
        }
        else if (row.id === 5) {
          this.challenge()
        }
        else if (row.id === 9) {
          this.FaceToFaceLesson()
        }
        else if (row.id === 10) {
          this.selfProposed()
        }
      },

      //学生基本信息
      async getStudentBasicDetail() {
        const data = {
          uid: this.$route.query.uid,
          // question_bank_id: this.$route.query.question_bank_id,
        };
        console.log(data)
        const res = await getStudentBasicDetail(data);
        if (res.code === 0) {
          this.ruleForm = res.data;
        }
      },
      // 每日打卡
      async dailyClockIn() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await dailyClockIn(data);
        if (res.code === 0) {
          this.dataTitle = res.data;
          this.dataList = res.data.list;
        }
      },
      // 章节练习
      async chapterExercises() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await chapterExercises(data);
        if (res.code === 0) {
          this.chapterTitle = res.data;
          this.chapterList = res.data.list;
        }
      },
      // 历年真题
      async pastRealQuestions() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await pastRealQuestions(data);
        if (res.code === 0) {
          this.pastTitle = res.data;
          this.pastList = res.data.list;
        }
      },
      // 模拟考试
      async mockExam() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await mockExam(data);
        if (res.code === 0) {
          this.mockTitle = res.data;
          this.mockList = res.data.list;
        }
      },
      // 刷题挑战
      async challenge() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await challenge(data);
        if (res.code === 0) {
          this.challeTitle = res.data;
          this.challeList = res.data.list;
        }
      },
      // 面授约课
      async FaceToFaceLesson() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await FaceToFaceLesson(data);
        if (res.code === 0) {
          this.faceTitle = res.data.data;
          this.faceList = res.data.list;
        }
      },
      // 自主出题
      async selfProposed() {
        const data = {
          uid: this.$route.query.uid,
          question_bank_id: this.$route.query.question_bank_id,
        };
        const res = await selfProposed(data);
        if (res.code === 0) {
          this.selfTitle = res.data;
          this.selfList = res.data.list;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }

  /deep/.el-button {
    padding: 9px 0;
    width: 80px;
  }

  .punchclock ul {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .punchclock li {
    border: 1px solid #d7d7d7;
    width: 24%;
    height: 90px;
    padding: 12px 15px;
    color: #606266;
  }

  .punchclock p {
    font-size: 14px;
  }

  .punchclock strong {
    font-size: 36px;
    font-weight: 400;
    line-height: 50px;
  }

  .chapter ul {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .chapter li {
    border: 1px solid #d7d7d7;
    width: 19%;
    height: 90px;
    padding: 12px 15px;
    color: #606266;
  }

  .chapter p {
    font-size: 14px;
  }

  .chapter strong {
    font-size: 36px;
    font-weight: 400;
    line-height: 50px;
  }

  .detail-name {
    display: flex;
    font-size: 16px;
    color: #909399;
    align-items: center;
  }

  .tabg {
    color: #fff !important;
    background: #199fff;
    border: none;
  }

  .detail-content {
    border-top: 8px solid #f2f6fc;
    padding: 10px 20px 0 20px;
    display: flex;
    justify-content: flex-start;
    margin-top: 18px;
    align-items: center;
    font-size: 16px;
    color: #666;
  }

  .detail-info {
    width: 16%;
    display: flex;
    margin-top: 18px;
  }

  .detail-con {
    font-size: 16px;
    padding-left: 30px;
    margin-top: 2px;
  }

  .detail-infocon {
    width: 28%;
    display: flex;
    margin-top: 18px;
  }

  .detail-infoname {
    width: 13%;
    display: flex;
    margin-top: 18px;
  }

  .detail-infonum {
    width: 20%;
    display: flex;
    margin-top: 18px;
  }

  .navigationBox {
    height: 45px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .navigation {
      width: 600px;
      display: flex;
      justify-content: space-between;
      font-family: 'Microsoft YaHei UI', sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      letter-spacing: normal;
      color: #333333;

      li {
        height: 30px;
        font-size: 14px;
        border: 1px solid #d7d7d7;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        color: #666666;
        border-radius: 3px;
        padding: 4px 6px;
      }

      li:last-child {
        margin-right: 0px !important;
      }

      li:hover {
        color: #fff;
        background: #199fff;
      }
    }
  }

  .userTable {
    margin-top: 20px;
  }

  .table_bottom {
    text-align: right;
    margin-top: 30px;
  }

  .exportData {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 6px 15px;
    cursor: pointer;
    color: #808080;
  }

  .tablebottom {
    margin-top: 30px;
  }
</style>