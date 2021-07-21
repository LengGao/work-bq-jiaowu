<template>
  <!-- 职称-学习进度 -->
  <div class="title-progress">
    <Title text="学习进度" />
    <div class="step">
      <el-steps
        :active="graduate"
        finish-status="success"
        process-status="success">
        <el-step title="报名"></el-step>
        <el-step title="培训"></el-step>
        <el-step title="考试"></el-step>
        <el-step title="毕业"></el-step>
      </el-steps>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
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
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="video_progress"
          label="学习进度"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.video_progress }}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_problem"
          label="做题总数"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="problem_rate"
          label="做题进度"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.problem_rate }}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_topic_score"
          label="历年真题平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_score"
          label="模拟考试平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="self_determination_score"
          label="自主出题最高分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="live_time"
          label="参加直播时长"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="live_time"
          label="操作"
          min-width="100"
          show-overflow-tooltip
        >
        <template slot-scope="scope">
          <div style="display: flex; justify-content:center;">
            <el-button type="text" @click="learningDetails(scope.row)"
              >学习详情</el-button>
          </div>
        </template>
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getstudentcourse } from "@/api/eda";
export default {
  name: "titleProgress",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
    graduate: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      active: 1,
      listData: [],
      listLoading: false,
    };
  },
  created() {
    this.getstudentcourse();
  },
  methods: {
    async getstudentcourse() {
      this.listLoading = true;
      const data = {
        uid: this.uid,
      };
      const res = await getstudentcourse(data);
      this.listLoading = false;
      this.listData = res.data;
    },

    learningDetails(row) {
      this.$router.push({
        name: "learningDetails",
        query: {
         uid: row.uid,
         course_id:row.course_id,
         course_name:row.course_name,
         project_id:row.project_id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.step {
  padding: 0 110px;
  margin: 16px 0;
}

</style>