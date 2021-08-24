<template>
  <div class="all-question">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      ref="search"
      @on-search="handleSearch"
    />

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          align="center"
          label="题目ID"
          show-overflow-tooltip
          min-width="70"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          align="left"
          prop="topic_description"
          label="题干内容"
          min-width="400"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="topic_type_name"
          label="题目类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="question_bank_name"
          label="题库名称"
          min-width="220"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toQusetionBank(row)">{{
              row.question_bank_name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="chapter_type_name"
          label="题库类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="chapter_name"
          label="章节试卷名称"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="answer_num"
          label="做题人数"
          min-width="90"
          sortable
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="collection_num"
          label="收藏人数"
          sortable
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="fail_num"
          label="错题人数"
          min-width="90"
          sortable
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="110"
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toQuestionEdit(row)"
                >编辑</el-button
              >

              <el-button type="text" @click="deleteConfirm(row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
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
import { getAllQuestionList, deleteQuestion, getSelectList } from "@/api/sou";
export default {
  name: "allQuestionList",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        question_bank_id: "",
      },
      searchOptions: [
        {
          key: "question_bank_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "题库名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "请输入内容",
            maxLength: 100,
          },
        },
      ],
    };
  },
  activated() {
    this.searchData.keyword && this.getAllQuestionList();
  },
  created() {
    this.getSelectList();
    this.getAllQuestionList();
  },
  methods: {
    async getSelectList() {
      const res = await getSelectList();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    toQusetionBank(row) {
      this.$router.push({
        name: "configureQuestionBank",
        query: {
          id: row.question_bank_id,
          title: row.question_bank_name,
          topic_course_id: row.question_bank_id,
        },
      });
    },
    // 编辑题目
    toQuestionEdit(row) {
      this.$router.push({
        name: "questionConfigure",
        query: {
          type: row.topic_type,
          chapterType: row.chapter_type,
          qid: row.question_bank_id,
          pid: row.id,
        },
      });
    },
    // 删除题目
    deleteConfirm(id) {
      this.$confirm("确定要删除此题目吗?", { type: "warning" })
        .then(() => {
          this.deleteQuestion(id);
        })
        .catch(() => {});
    },
    async deleteQuestion(id) {
      const data = { id };
      const res = await deleteQuestion(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getAllQuestionList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getAllQuestionList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getAllQuestionList();
    },
    async getAllQuestionList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getAllQuestionList(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.all-question {
  color: #606266;
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  padding: 20px;
}
</style>
