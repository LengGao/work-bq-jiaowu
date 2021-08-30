<template>
  <div class="question-statistics">
    <div class="question-info">
      <div class="question-info-item">
        <span class="name">题库名称</span>
        <span class="value">{{ questionData.question_bank_name }}</span>
      </div>
      <div class="question-info-item">
        <span class="name">所属分类</span>
        <span class="value">{{ questionData.category_name }}</span>
      </div>
      <div class="question-info-item">
        <span class="name">购买人数</span>
        <span class="value">{{ questionData.pay_num }}</span>
      </div>
    </div>
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="id"
          show-overflow-tooltip
          width="70"
          align="center"
          prop="uid"
        >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="学生姓名"
          min-width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)">
              {{ row.nickname }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="所属项目"
          min-width="180"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="punch_in_days"
          label="打卡天数"
          min-width="90"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="practice_progress"
          label="章节练习进度"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="height_test_exam_mark"
          label="模拟考试最高分"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="challenge_num"
          label="刷题挑战次数"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="collection_num"
          label="收藏夹"
          align="center"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="fail_num"
          label="错题集"
          align="center"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="toLearningDetails(scope.row)"
              >做题详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div>
          <!-- <el-button :loading="exportLoading" @click="exportData"
            >导出数据</el-button
          > -->
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { questionStatisticsList, questionStatisticsData } from "@/api/sou";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "questionStatistics",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        project_id: "",
      },
      searchOptions: [
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      questionData: {},
      exportLoading: false,
    };
  },

  created() {
    this.questionStatisticsList();
    this.questionStatisticsData();
  },
  methods: {
    toLearningDetails(row) {
      this.$router.push({
        name: "learningDetails",
        query: {
          uid: row.uid,
          question_bank_id: this.$route.query.id,
          question_bank_name: this.questionData.question_bank_name,
        },
      });
    },
    async questionStatisticsData() {
      const data = {
        question_bank_id: this.$route.query.id,
      };
      const res = await questionStatisticsData(data);
      if (res.code === 0) {
        this.questionData = res.data;
        this.searchOptions[0].options = res.data?.project_list || [];
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.questionStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.questionStatisticsList();
    },

    async questionStatisticsList() {
      const data = {
        page: this.pageNum,
        question_bank_id: this.$route.query.id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await questionStatisticsList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
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
.question-statistics {
  padding: 20px;
}

.question-info {
  display: flex;
  align-items: center;
  &-item {
    margin-right: 30px;
    padding: 16px 0;
    .name {
      color: #909399;
      margin-right: 8px;
    }
    .value {
      color: #666;
    }
  }
}
.table_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
