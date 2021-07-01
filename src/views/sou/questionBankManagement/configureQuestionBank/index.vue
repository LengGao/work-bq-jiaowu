<template>
  <div class="configure-question">
    <section class="mainwrap">
      <el-tabs v-model="activeName" @tab-click="handleChapterTypeChange">
        <el-tab-pane label="章节练习" name="1"></el-tab-pane>
        <el-tab-pane label="历年真题" name="2"></el-tab-pane>
        <el-tab-pane label="自主出题" name="3"></el-tab-pane>
      </el-tabs>
      <div class="container">
        <ChapterMenu
          @on-change="handleChapterChange"
          :chapterType="activeName"
          class="container-left"
        />
        <div class="container-right">
          <div class="client_head">
            <SearchList
              :options="searchOptions"
              :data="searchData"
              @on-search="handleSearch"
            />
            <div>
              <el-popover
                placement="bottom"
                popper-class="question-type-popover"
                width="100"
                trigger="hover"
              >
                <el-button slot="reference" style="margin-right: 10px"
                  >添加题目</el-button
                >
                <ul class="question-type-list">
                  <li
                    v-for="item in questionOptions"
                    :key="item.value"
                    @click="handleQuestionChange(item.value)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </el-popover>
              <el-button type="primary">批量录入</el-button>
            </div>
          </div>
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
              height="660"
            >
              <el-table-column align="center" type="selection" width="70">
              </el-table-column>
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
                min-width="110"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                min-width="120"
              >
                <template slot-scope="{ row }">
                  <div style="display: flex; justify-content: center">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">移动</el-button>

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
      </div>
    </section>
  </div>
</template>

<script>
import ChapterMenu from "./components/ChapterMenu";
import { getQuestionList, delQuestion } from "@/api/sou";

export default {
  name: "questionBank",
  components: {
    ChapterMenu,
  },
  data() {
    return {
      // 1：章节 2：历年真题 3：自主出题
      activeName: sessionStorage.getItem("activeName") || "1",
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        topic_description: "",
      },
      searchOptions: [
        {
          key: "topic_description",
          attrs: {
            placeholder: "题干内容",
          },
        },
      ],
      questionOptions: [
        {
          name: "单选题",
          value: 1,
        },
        {
          name: "多选题",
          value: 2,
        },
        {
          name: "判断题",
          value: 3,
        },
        {
          name: "不定项题",
          value: 4,
        },
        {
          name: "填空题",
          value: 5,
        },
        {
          name: "简答题",
          value: 6,
        },
        {
          name: "案例题",
          value: 7,
        },
      ],
    };
  },

  created() {
    this.getQuestionList();
  },

  methods: {
    // 添加题目
    handleQuestionChange(type) {
      this.$router.push({
        name: "questionConfigure",
        query: {
          type,
          chapterType: this.activeName,
          qid: this.$route.query.id,
        },
      });
      sessionStorage.setItem("activeName", this.activeName);
    },
    // 章节类型变化
    handleChapterTypeChange() {
      this.pageNum = 1;
      this.getQuestionList();
    },
    // 章节变化
    handleChapterChange(id) {
      this.pageNum = 1;
      this.getQuestionList(id);
    },
    // 删除题目
    deleteConfirm(id) {
      this.$confirm("确定要删除此题目吗?", { type: "warning" })
        .then(() => {
          this.delQuestion(id);
        })
        .catch(() => {});
    },
    async delQuestion(id) {
      const data = { id };
      const res = await delQuestion(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getQuestionList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getQuestionList();
    },
    async getQuestionList(topic_chapter_id) {
      const data = {
        topic_chapter_id: topic_chapter_id || "",
        question_bank_id: this.$route.query.id,
        chapter_type: this.activeName,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getQuestionList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.configure-question {
  color: #606266;
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .main {
    padding: 20px;
    margin: 20px;
    background: #fff;
  }
  .client_head {
    display: flex;
    justify-content: space-between;
  }
  .userTable {
    margin-top: 20px;
  }
  .container {
    display: flex;
    width: 100%;
    &-left {
      width: 300px;
      border: 1px solid #e4e7ed;
      flex-shrink: 0;
      height: 800px;
    }
    &-right {
      width: calc(100% - 320px);
      margin-left: 20px;
    }
  }
}
.question-type-popover {
  .question-type-list {
    li {
      padding: 6px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #ecf5ff;
        color: #199fff;
      }
    }
  }
}
</style>
