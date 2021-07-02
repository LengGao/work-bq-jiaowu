<template>
  <section>
    <el-row style="min-width:1100px;border-top: 8px solid #f2f6fc;padding:10px 20px 0 20px;">
      <el-col :lg="18" :md="18" :sm="18" :xs="18">
        <el-row>
          <el-col :lg="5" :md="5" :sm="5" :xs="5">
            <div class="detail-name">
              <div class="detail-info">
                <div class="detail-label">学生姓名</div>
                <div class="detail-con">张小北</div>
              </div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">手机号码</div>
              <div class="detail-con">13535019471</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">身份证号</div>
              <div class="detail-con">445454654565456545</div>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="6" :xs="6">
            <div class="detail-info">
              <div class="detail-label">课程名称</div>
              <div class="detail-con">低压电工作业（初训）</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

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
          <div class="information" v-if="isTagactive == 1">
            <div class="punchclock">
              <ul>
                <li>
                  <p>累计打卡天数</p>
                  <div>
                    <strong>35</strong>
                    <span>天</span>
                  </div>
                </li>
                <li>
                  <p>平均打卡用时</p>
                  <strong>35:20</strong>
                </li>
                <li>
                  <p>答题总数</p>
                  <strong>828</strong>
                </li>
                <li>
                  <p>打卡正确率</p>
                  <strong>35%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
                <el-table-column prop="course_id" label="打卡时间" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="题目总数" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="正确题数" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="正确率" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="打卡用时" min-width="100" show-overflow-tooltip>6:30
                </el-table-column>
                <el-table-column prop="course_price" label="打卡排行" min-width="100" show-overflow-tooltip>10
                </el-table-column>
              </el-table>


            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>

            </div>
          </div>

          <!--章节练习-->
          <div class="certificate" v-if="isTagactive == 2">
            <div class="chapter">
              <ul>
                <li>
                  <p>做题总数</p>
                  <div>
                    <strong>358</strong>
                  </div>
                </li>
                <li>
                  <p>做题进度</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>收藏夹</p>
                  <strong>25</strong>
                </li>
                <li>
                  <p>错题集</p>
                  <strong>550</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
                <el-table-column prop="course_id" label="章节名称" show-overflow-tooltip min-width="100">
                </el-table-column>
                <el-table-column prop="course_name" label="最后做题时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="category_name" label="题目总数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="class_type_name" label="做题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="做题进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>

            </div>
          </div>

          <!--历年真题-->
          <div v-if="isTagactive == 3">
            <div class="punchclock">
              <ul>
                <li>
                  <p>做题总数</p>
                  <div>
                    <strong>654</strong>
                  </div>
                </li>
                <li>
                  <p>做题进度</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>35:20</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="试卷名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="模式" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="做题时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="题目总数" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="正确题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="course_price" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>


            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>

          </div>

          <!--模拟考试-->
          <div v-if="isTagactive == 4">
            <div class="punchclock">
              <ul>
                <li>
                  <p>模拟考试次数</p>
                  <div>
                    <strong>54</strong>
                  </div>
                </li>
                <li>
                  <p>做题总数</p>
                  <strong>788</strong>
                </li>
                <li>
                  <p>模拟考试最高分</p>
                  <strong>80</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>35:20</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="试卷名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="考试时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="题目总数" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="正确题数" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="course_price" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>

          </div>

          <!--刷题挑战-->
          <div v-if="isTagactive == 5">
            <div class="punchclock">
              <ul>
                <li>
                  <p>刷题挑战次数</p>
                  <div>
                    <strong>54</strong>
                  </div>
                </li>
                <li>
                  <p>做题总数</p>
                  <strong>788</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>35:20</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="挑战时间" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="题目总数" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="正确题数" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="得分" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="挑战排名" min-width="100" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>
          </div>

          <!--录播视频-->
          <div v-if="isTagactive == 6">
            <div class="punchclock">
              <ul>
                <li>
                  <p>视频总个数</p>
                  <div>
                    <strong>75</strong>
                  </div>
                </li>
                <li>
                  <p>累计完成个数</p>
                  <strong>788</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>80%</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>35:20</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="章节名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="开始学习时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="最后学习时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="章节时长" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="操作" min-width="100" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div style="display: flex; justify-content:center;">
                      <el-button type="text" @click="">课时详情</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>

          </div>
          <!--直播视频-->
          <div v-if="isTagactive == 7">
            <div class="punchclock">
              <ul>
                <li>
                  <p>直播场数</p>
                  <div>
                    <strong>65</strong>
                  </div>
                </li>
                <li>
                  <p>观看场数</p>
                  <strong>35</strong>
                </li>
                <li>
                  <p>观看总时长</p>
                  <strong>35:20</strong>
                </li>
                <li>
                  <p>到课率</p>
                  <strong>55%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="直播场数" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="直播名称" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="开始加入时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="最后离开时间" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>

              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>
          </div>
          <!--回播视频-->
          <div v-if="isTagactive == 8">
            <div class="punchclock">
              <ul>
                <li>
                  <p>回播场数</p>
                  <div>
                    <strong>35</strong>
                  </div>
                </li>
                <li>
                  <p>观看场数</p>
                  <strong>22</strong>
                </li>
                <li>
                  <p>观看总时长</p>
                  <strong>35:20</strong>
                </li>
                <li>
                  <p>观看总进度</p>
                  <strong>55%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe style="width: 100%;"
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="回播场数" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="回播名称" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="开始加入时间" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="最后离开时间" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="观看时长" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="观看进度" min-width="100" show-overflow-tooltip>
                </el-table-column>

              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>
          </div>
          <!--面授约课-->
          <div v-if="isTagactive == 9">
            <div class="punchclock">
              <ul>
                <li>
                  <p>面授课次数</p>
                  <div>
                    <strong>10</strong>
                  </div>
                </li>
                <li>
                  <p>完成次数</p>
                  <strong>8</strong>
                </li>
                <li>
                  <p>失约次数</p>
                  <strong>1</strong>
                </li>
                <li>
                  <p>到课率</p>
                  <strong>90%</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="面授课名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="课程内容" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="任课老师" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="上课时间" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="上课地点" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="完成状态" min-width="100" show-overflow-tooltip>
                </el-table-column>

              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>
          </div>
          <!--自主出题-->
          <div v-if="isTagactive == 10">
            <div class="punchclock">
              <ul>
                <li>
                  <p>做题总数</p>
                  <div>
                    <strong>654</strong>
                  </div>
                </li>
                <li>
                  <p>做题进度</p>
                  <strong>88%</strong>
                </li>
                <li>
                  <p>正确率</p>
                  <strong>88%</strong>
                </li>
                <li>
                  <p>平均做题用时</p>
                  <strong>30:25</strong>
                </li>
              </ul>
            </div>
            <!--表格-->
            <div class="userTable">
              <el-table ref="multipleTable" :data="schoolData" tooltip-effect="light" stripe
                :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                class="min_table">
                <el-table-column prop="course_id" label="试卷名称" show-overflow-tooltip min-width="100">2020-06-04 16:30
                </el-table-column>
                <el-table-column prop="course_name" label="做题时间" min-width="100" column-key="course_id"
                  show-overflow-tooltip>200</el-table-column>
                <el-table-column prop="category_name" label="题目总数" min-width="100" show-overflow-tooltip>100
                </el-table-column>
                <el-table-column prop="class_type_name" label="正确题数" min-width="100" show-overflow-tooltip>50%
                </el-table-column>
                <el-table-column prop="course_price" label="错误题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="未回答题数" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="做题用时" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="course_price" label="得分" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="course_price" label="正确率" min-width="100" show-overflow-tooltip>
                </el-table-column>

              </el-table>
            </div>
            <div class="tablebottom">
              <button class="exportData">导出数据</button>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isTagactive: 1,
        schoolData: [
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },
          { course_id: "2020-06-04  16:30" },

        ],
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
          {
            id: 6,
            name: '录播视频',
          },
          {
            id: 7,
            name: '直播视频',
          },
          {
            id: 8,
            name: '回播视频',
          },
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
    },
    methods: {
      statusSwitch(ab) {
        this.isTagactive = ab.id
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
  .detail-info {
    height: 100%;
    margin-top: 18px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;

    .detail-label {}

    .detail-con {
      font-size: 16px;
      padding-left: 30px;
    }
  }
  .navigationBox {
    height: 45px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .navigation {
      width: 820px;
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