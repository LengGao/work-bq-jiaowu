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
        height="550"
      >
        <el-table-column
          prop="question_bank_id"
          label="题库ID"
          width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="question_bank_name"
          label="题库名称"
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
          prop="punch_in_days"
          label="打卡天数"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="practice_progress"
          label="章节练习进度"
          min-width="140"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="height_test_exam_mark"
          label="模拟考试最高分"
          min-width="140"
          show-overflow-tooltip
          align="center"
        ></el-table-column>

        <el-table-column
          prop="challenge_num"
          label="刷题挑战次数"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="collection_num"
          label="收藏夹"
          min-width="100"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fail_num"
          label="错题集"
          min-width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toLearningDetails(scope.row)"
                >做题详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { getBuyQuestionBank } from "@/api/eda";
export default {
  name: "QuestionProgress",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      active: 1,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.getBuyQuestionBank();
  },
  methods: {
    toLearningDetails(row) {
      this.$router.push({
        name: "learningDetails",
        query: {
          uid: this.uid,
          question_bank_id: row.question_bank_id,
          question_bank_name: row.question_bank_name,
        },
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getBuyQuestionBank();
    },
    async getBuyQuestionBank() {
      this.listLoading = true;
      const data = {
        uid: this.uid,
        page: this.pageNum,
      };
      const res = await getBuyQuestionBank(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>