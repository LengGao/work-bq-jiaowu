<template>
  <!-- 职称-学习进度 -->
  <div class="title-progress">
    <Title text="学习进度" />
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step title="报名" description="2021-03-20"></el-step>
        <el-step title="培训" description="2021-03-23"></el-step>
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
          prop="classroom_name"
          label="课程名称"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="学习时长"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="学习进度"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="做题总数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="做题进度"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="历年真题平均分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="模拟考试平均分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="自主出题最高分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="参加直播时长"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getClassList } from "@/api/eda";
export default {
  name: "titleProgress",
  data() {
    return {
      active: 1,
      listData: [],
      listLoading: false,
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    async getClassList() {
      this.listLoading = true;
      const res = await getClassList();
      this.listLoading = false;
      this.listData = res.data.list;
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