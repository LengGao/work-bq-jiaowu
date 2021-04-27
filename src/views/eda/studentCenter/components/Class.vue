<template>
  <div class="class">
    <!--项目班级-->
    <h4 class="table-title">报读项目</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        border
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          align="center"
          label="项目编号"
          prop="project_id"
          min-width="90"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="project_name"
          label="项目名称"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="category_name"
          label="所属分类"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="项目价格"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="left"
          prop="project_name"
          label="课程"
          min-width="220"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.course.length
                ? row.course.map((item) => item.course_name).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="classroom_id"
          label="题库"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.problem && row.problem.length
                ? row.problem.map((item) => item.title).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="total_books"
          label="教材"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.textbook && row.textbook.length
                ? row.textbook.map((item) => item.book_name).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="create_time"
          label="报名时间"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <h4 class="table-title">归属班级</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="classData"
        tooltip-effect="light"
        v-loading="classLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        border
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          label="编号"
          align="center"
          type="index"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="200"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="班主任"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="班级人数"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="add_time"
          label="加入时间"
          align="center"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <div class="operation_btn">
              <el-button type="text" @click="toClassDetail(row.classroom_id)"
                >班级详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h4 class="table-title">未分班课程</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        border
        :data="unClassData"
        tooltip-effect="light"
        v-loading="unClassLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="220"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="video_time_total"
          label="学习时长"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="video_progress"
          label="学习进度"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="total_problem"
          label="做题总数"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="problem_rate"
          label="做题进度"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="real_topic_score"
          label="历年真题平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="exam_score"
          label="模拟考试平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="self_determination_score"
          label="自主出题最高分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="video_time"
          label="参加直播时长"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getstudendclass, getuserproject, unClassCourse } from "@/api/eda";
export default {
  name: "class",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      classData: [],
      classLoading: false,
      unClassData: [],
      unClassLoading: false,
    };
  },
  created() {
    this.getstudendclass();
    this.getuserproject();
    this.unClassCourse();
  },
  methods: {
    // 未分班课程列表
    async unClassCourse() {
      const data = {
        uid: this.uid,
      };
      this.unClassLoading = true;
      const res = await unClassCourse(data);
      this.unClassLoading = false;
      if (res.code === 0) {
        this.unClassData = res.data;
      }
    },
    //学生所在项目列表
    async getuserproject() {
      const data = {
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await getuserproject(data);
      this.listLoading = false;
      this.listData = res.data;
    },
    //学生所在班级列表
    async getstudendclass() {
      const data = {
        uid: this.uid,
      };
      this.classLoading = true;
      const res = await getstudendclass(data);
      this.classLoading = false;
      this.classData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.class {
  .table-title {
    padding: 20px 0;
    display: flex;
    align-items: center;
    color: #606266;
    &::before {
      display: block;
      content: "";
      width: 4px;
      height: 16px;
      background-color: #199fff;
      margin-right: 10px;
    }
  }
}
</style>