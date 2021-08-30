<template>
  <!-- 题库进度 -->
  <div class="question-progress">
    <!--搜索模块-->
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
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
        ><el-table-column
          prop="uid"
          label="UID"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学员姓名"
          show-overflow-tooltip
          min-width="90"
          prop="nickname"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)">{{
              row.nickname
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码"
          show-overflow-tooltip
          min-width="110"
          prop="mobile"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
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
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getClassQuestionStatistics } from "@/api/eda";
export default {
  name: "QuestionProgress",
  data() {
    return {
      active: 1,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
    };
  },
  components: {
    PartiallyHidden,
  },
  created() {
    this.getClassQuestionStatistics();
  },
  methods: {
    toLearningDetails(row) {
      this.$router.push({
        name: "learningDetails",
        query: {
          uid: row.uid,
          question_bank_id: row.question_bank_id,
          question_bank_name: row.question_bank_name,
        },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassQuestionStatistics();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassQuestionStatistics();
    },
    async getClassQuestionStatistics() {
      this.listLoading = true;
      const data = {
        class_id: this.$route.query.id,
        page: this.pageNum,
        ...this.searchData,
      };
      const res = await getClassQuestionStatistics(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>