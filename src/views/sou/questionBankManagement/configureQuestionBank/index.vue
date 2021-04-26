<template>
  <div class="configure-question">
    <section class="mainwrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="章节练习" name="1"></el-tab-pane>
        <el-tab-pane label="历年真题" name="2"></el-tab-pane>
        <el-tab-pane label="自主出题" name="3"></el-tab-pane>
      </el-tabs>
      <div class="container">
        <div class="container-left">
          <div class="container-left-header">
            <h4>章节名称</h4>
            <el-button
              type="primary"
              plain
              circle
              size="mini"
              icon="el-icon-plus"
              @click="openAdd"
            ></el-button>
          </div>
          <ul class="container-left-list" v-loading="chapterLoading">
            <li class="list-item" v-for="item in chapterList" :key="item.id">
              <span class="list-item-title">{{ item.chapter_name }}</span>
              <div class="list-item-actions">
                <i class="el-icon-edit" @click="openEdit(item.id)"></i>
                <i class="el-icon-delete"></i>
              </div>
            </li>
          </ul>
        </div>
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
                  <li v-for="item in questionOptions" :key="item.value">
                    {{ item.name }}
                  </li>
                  <li>单选题</li>
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
                prop="title"
                label="题干内容"
                min-width="400"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                align="center"
                prop="category_name"
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
                    <!-- @click="deleteConfirm(row.id)" -->
                    <el-button type="text">删除</el-button>
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
    <editChapterDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :chapterType="activeName"
      @on-success="getTopicChapterList"
    />
  </div>
</template>

<script>
import {
  getQuestionBankList,
  updateQuestionBankStatus,
  deleteQuestionBank,
  getTopicChapterList,
} from "@/api/sou";
import editChapterDialog from "./components/editChapterDialog";
export default {
  name: "questionBank",
  components: {
    editChapterDialog,
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
        title: "",
      },
      searchOptions: [
        {
          key: "title",
          attrs: {
            placeholder: "题干内容",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加章节",
      dialogVisible: false,
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
          name: "填空题",
          value: 4,
        },
        {
          name: "简答题",
          value: 5,
        },
        {
          name: "案例题",
          value: 6,
        },
      ],
      chapterList: [],
      chapterLoading: false,
    };
  },

  created() {
    this.getTopicChapterList();
    this.getQuestionBankList();
  },

  methods: {
    handleClick() {
      this.getTopicChapterList();
    },
    linkTo(name, id) {
      this.$router.push({ name, query: { id } });
    },
    // 获取章节列表
    async getTopicChapterList() {
      const data = {
        question_bank_id: this.$route.query.id,
        chapter_type: this.activeName,
      };
      this.chapterLoading = true;
      const res = await getTopicChapterList(data).catch(() => {
        this.chapterLoading = false;
      });
      this.chapterLoading = false;
      if (res.code === 0) {
        this.chapterList = res.data;
      }
    },
    // 删除题库
    deleteConfirm(id) {
      this.$confirm("确定要删除此题库吗?", { type: "warning" })
        .then(() => {
          this.deleteQuestionBank(id);
        })
        .catch(() => {});
    },
    async deleteQuestionBank(id) {
      const data = { id };
      const res = await deleteQuestionBank(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionBankList();
      }
    },
    // 修改题库状态
    async updateQuestionBankStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateQuestionBankStatus(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },

    link(id) {
      this.$router.push({ name: "inventoryDetails", query: { id } });
    },
    openEdit(id) {
      this.dialogTitle = "编辑章节";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加章节";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getQuestionBankList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getQuestionBankList();
    },
    async getQuestionBankList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getQuestionBankList(data);
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
    justify-content: space-between;
    &-left {
      width: 300px;
      border: 1px solid #e4e7ed;
      flex-shrink: 0;
      &-header {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        border-bottom: 1px solid #e4e7ed;
      }
      &-list {
        font-size: 14px;
        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          height: 44px;
          border-bottom: 1px solid #e4e7ed;
          cursor: pointer;
          &-actions {
            display: none;
            i {
              font-size: 18px;
              padding: 0 10px;
            }
          }
          &:hover {
            background-color: #ecf5ff;
            color: #199fff;
            .list-item-actions {
              display: block;
            }
          }
          &--active {
            color: #fff;
            background-color: #199fff;
            .list-item-actions {
              display: block;
            }
          }
          &--active:hover {
            color: #fff;
            background-color: #199fff;
            .list-item-actions {
              display: block;
            }
          }
        }
      }
    }
    &-right {
      flex: 1;
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
