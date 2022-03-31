<template>
  <div class="configure-question">
    <section class="mainwrap">
      <p class="question-bank-name">
        当前题库：<span>{{ $route.query.title || "--" }}</span>
      </p>
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
          ref="chapterMenu"
        />
        <div class="container-right">
          <div class="client_head">
            <SearchList
              :options="searchOptions"
              :data="searchData"
              ref="search"
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
                    @click="toQuestionEdit(item.value)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </el-popover>
              <el-button type="primary" @click="openUploadDialog"
                >批量录入</el-button
              >
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
              height="650"
              @selection-change="handleTableSelect"
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
                prop="sort"
                align="center"
                label="排序"
                min-width="70"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <el-input
                    type="number"
                    @mousewheel.native.prevent
                    v-if="isSort"
                    v-model="row.sort"
                  />
                  <span v-else>{{ row.sort }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="answer_num"
                label="做题次数"
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
                label="错题次数"
                min-width="90"
                sortable
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
                    <el-button
                      type="text"
                      @click="toQuestionEdit(row.topic_type, row.id)"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      @click="handleMove(row.id, row.topic_chapter_id)"
                      >移动</el-button
                    >

                    <el-button type="text" @click="deleteConfirm(row.id)"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="table_bottom">
              <div>
                <el-button @click="handleBatchMove">批量移动</el-button>
                <el-button @click="handleBatchDel">批量删除</el-button>
                <el-button v-if="isSort" @click="handleSortCancel"
                  >取消</el-button
                >
                <el-button v-if="isSort" type="primary" @click="handleBatchSort"
                  >保存</el-button
                >
                <el-button v-if="!isSort" @click="showSort">批量排序</el-button>
              </div>
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
    <MoveQusetionDialog
      v-model="dialogVisible"
      :id="currentId"
      :currentChapterId="currentChapterId"
      :chapter-type="activeName"
      @on-success="moveSuccess"
    />
    <UploadQusetionDialog
      v-model="uploadDialog"
      :chapter-type="activeName"
      @on-success="moveSuccess"
    />
  </div>
</template>

<script>
import ChapterMenu from "./components/ChapterMenu";
import {
  getQuestionList,
  deleteQuestion,
  batchDeleteQuestion,
  batchTopicSort,
} from "@/api/sou";
import MoveQusetionDialog from "./components/MoveQusetionDialog.vue";
import UploadQusetionDialog from "./components/UploadQusetionDialog.vue";
export default {
  name: "configureQuestionBank",
  components: {
    ChapterMenu,
    MoveQusetionDialog,
    UploadQusetionDialog,
  },
  data() {
    return {
      // 1：章节 2：历年真题 3：自主出题
      activeName: "1",
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
      currentChapterId: "",
      currentId: "",
      dialogVisible: false,
      uploadDialog: false,
      selectionIds: [],
      topic_chapter_id: "",
      isSort: false,
    };
  },
  activated() {
    this.getQuestionList();
    this.$refs.chapterMenu.getTopicChapterList();
  },
  methods: {
    async handleBatchSort() {
      const data = {
        arr: this.listData.map((item) => ({
          id: item.id,
          sort: item.sort,
        })),
      };
      const res = await batchTopicSort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionList();
      }
    },
    handleSortCancel() {
      this.getQuestionList();
    },
    showSort() {
      this.isSort = true;
    },
    handleTableSelect(selection) {
      this.selectionIds = selection.map((item) => item.id);
    },
    handleBatchMove() {
      if (!this.selectionIds.length) {
        this.$message.warning("请选择题目");
        return;
      }
      this.currentId = this.selectionIds;
      this.currentChapterId = "";
      this.dialogVisible = true;
    },
    // 批量删除
    handleBatchDel() {
      if (!this.selectionIds.length) {
        this.$message.warning("请选择题目");
        return;
      }
      this.$confirm("确定要删除选中题目吗?", { type: "warning" })
        .then(() => {
          this.batchDeleteQuestion();
        })
        .catch(() => {});
    },
    async batchDeleteQuestion() {
      const data = {
        arr_id: this.selectionIds,
        question_bank_id: this.$route.query.id,
      };
      const res = await batchDeleteQuestion(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionList();
        this.$refs.chapterMenu.getTopicChapterList();
      }
    },
    openUploadDialog() {
      this.uploadDialog = true;
    },
    moveSuccess() {
      this.getQuestionList();
      this.$refs.chapterMenu.getTopicChapterList();
    },
    handleMove(id, chapterId) {
      this.currentId = id;
      this.currentChapterId = chapterId;
      this.dialogVisible = true;
    },
    // 添加题目
    toQuestionEdit(type, pid) {
      this.$router.push({
        name: "questionConfigure",
        query: {
          type,
          chapterType: this.activeName,
          qid: this.$route.query.id,
          pid,
        },
      });
    },
    // 章节类型变化
    handleChapterTypeChange() {
      this.pageNum = 1;
      this.$refs.search.handleReset();
    },
    // 章节变化
    handleChapterChange(id) {
      this.pageNum = 1;
      this.topic_chapter_id = id;
      this.getQuestionList();
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
        this.getQuestionList();
        this.$refs.chapterMenu.getTopicChapterList();
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
    async getQuestionList() {
      this.isSort = false;
      const data = {
        topic_chapter_id: this.topic_chapter_id,
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
  .question-bank-name {
    text-align: right;
    span {
      font-weight: bold;
    }
  }
  .table_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
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
      height: 780px;
    }
    &-right {
      width: calc(100% - 320px);
      margin-left: 20px;
      overflow: hidden;
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
