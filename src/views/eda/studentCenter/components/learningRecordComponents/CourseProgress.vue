<template>
  <!-- 职称-课程进度 -->
  <div class="course-progress">
    <Title text="课程进度" />
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
      >
        <el-table-column
          prop="course_id"
          label="课程ID"
          width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="category_name"
          label="所属分类"
          width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="total_lesson_count"
          label="总课时"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="first_time"
          label="首次学习时间"
          min-width="140"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="last_time"
          label="最后学习时间"
          min-width="140"
          show-overflow-tooltip
          align="center"
        ></el-table-column>

        <el-table-column
          prop="duration"
          label="学习时长"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="finish_lesson_count"
          label="完成课时"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="课程进度"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.progress }}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="live_time"
          label="操作"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toChapter(scope.row)"
                >学习详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { userCourseVideoStatisticsList } from "@/api/eda";
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
    this.userCourseVideoStatisticsList();
  },
  methods: {
    toChapter(row) {
      this.$router.push({
        name: "studentChapter",
        query: {
          uid: this.uid,
          course_id: row.course_id,
        },
      });
    },
    async userCourseVideoStatisticsList() {
      this.listLoading = true;
      const data = {
        uid: this.uid,
      };
      const res = await userCourseVideoStatisticsList(data);
      this.listLoading = false;
      this.listData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>