<template>
  <div class="college-student">
    <div class="college-student-container">
      <div class="tree-list">
        <div class="question-bank-list">
          <div class="tree-list">
            <p class="title">题库分类</p>
            <v-tree ref="tree" :tpl="tpl" :data="treeData" />
          </div>
      </div>
      </div>
      <div class="table-list">

        <!--搜索模块-->
        <div class="college-student-search">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
          </span>
          <el-button type="primary" class="addcourse" @click="addcoursebtn">添加题库</el-button>
        </div>

        <!--列表-->
        <div class="userTable">
          <el-table
            :data="listData"
            v-loading="listLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            tooltip-effect="light"
            stripe
            style="width: 100%"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="690"
            :key="isActiveAll"
          >
          <el-table-column
          prop="question_bank_id"
          label="题库ID"
          min-width="60"
          show-overflow-tooltip
        >
        </el-table-column>
            <el-table-column
            v-if="isActiveAll"
              prop="question_bank_name"
              label="题库名称"
              min-width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            v-if="isActiveAll"
              prop="category_name"
              label="所属分类"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
            prop="detect_info"
            label="题库信息"
            align="center"
            min-width="260"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span class="circle"
                >章节练习<span
                  class="circle-value"
                  :class="{ info: !row.practice }"
                  >({{ row.practice }})</span
                ></span
              >
              <span class="circle"
                >历年真题<span class="circle-value" :class="{ info: !row.real }"
                  >({{ row.real }})</span
                ></span
              >
              <span class="circle"
                >自主出题<span
                  class="circle-value"
                  :class="{ info: !row.selfs }"
                  >({{ row.selfs }})</span
                ></span
              >
            </template>
          </el-table-column>

            <el-table-column
              v-if="isActiveAll"
              prop="buy_num"
              label="购买人数"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
   
          <el-table-column
          prop="wholesale_price"
          label="题库价格"
          show-overflow-tooltip
          min-width="100"
        >
        <template slot-scope="{ row }">
          <el-input
            type="number"
            size="small"
            v-model="row.wholesale_price"
            placeholder="请输入"
            @blur="handlePriceBlur(row)"
          >
          </el-input>
        </template>
        </el-table-column>

            <el-table-column label="操作" min-width="120">
              <template slot-scope="{ row }">
                <el-button type="text" @click="handleDelete(row.id,row.question_bank_id)">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <AddQuestion v-model="adddialogVisible" @on-success="questionBankList" />
    </div>
  </div>
</template>

<script>
import {
  questionBankList,
  questionBankCategoryList,
  BankRelationremove,
  assignOrgQuestionBank,
} from "@/api/institution";
import AddQuestion from "./addQuestion";
export default {
  name: "InsitutionQuestion",
  components: {
    AddQuestion,
  },
  data() {
    return {
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "题库名称",
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      treeData: [],
      treeParams: {
        cate_id: "",
        category_id: "",
      },
      isActiveAll: true,
      adddialogVisible: false,
      dialogTitle: "",
    };
  },
  created() {
    this.questionBankList(), this.questionBankCategoryList();
  },
  methods: {
    async handlePriceBlur({ question_bank_id, wholesale_price }) {
      const data = {
        institution_arr: [this.$route.query.institution_id],
        question_bank_arr: [
          {
            question_bank_id,
            wholesale_price,
          },
        ],
      };
      const res = await assignOrgQuestionBank(data);
      if (res.code === 0) {
        this.$message.success("保存成功");
      }
    },
    addcoursebtn() {
      this.dialogTitle = "添加题库";
      this.adddialogVisible = true;
    },

    handleDelete(id, question_bank_id) {
      this.$confirm("此操作将永久删除该题库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.BankRelationremove(id, question_bank_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 移除题库
    async BankRelationremove(id, question_bank_id) {
      const data = {
        id,
        institution_id: this.$route.query?.institution_id || "",
        question_bank_id,
      };
      console.log(data);
      const res = await BankRelationremove(data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.questionBankList();
        this.dialogVisible = false;
      }
      this.questionBankList();
    },

    tpl(node) {
      return (
        <span
          class={{
            "tree-node": true,
            "tree-node--active":
              this.treeParams.category_id === node.category_id,
          }}
          onClick={() => this.onNodeClick(node)}
        >
          {node.category_name === "全部"
            ? node.category_name
            : `${node.category_name}`}
        </span>
      );
    },
    async questionBankCategoryList() {
      const data = {
        org_id: this.$route.query.institution_id,
      };
      console.log(data);
      const res = await questionBankCategoryList(data);
      if (res.code === 0) {
        this.treeData = [
          {
            category_id: "",
            category_name: "全部",
            expanded: true,
            children: res.data.map(({ children, ...rest }) => rest),
          },
        ];
      }
    },

    onNodeClick(data) {
      const { category_id: category_id } = data;
      this.treeParams = { category_id };
      this.questionBankList();
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.questionBankList();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.questionBankList();
    },

    handlePageChange(val) {
      this.pageNum = val;
      this.questionBankList();
    },
    // 获取列表
    async questionBankList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
        org_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await questionBankList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 去掉number样式 */
/deep/.el-input {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
.college-student {
  &-container {
    padding: 10px 20px 20px 0;
    display: flex;
    .tree-list {
      width: 200px;
      flex-shrink: 0;
      border-right: 1px solid #eee;
      margin-right: 20px;
      height: 80vh;
      overflow-y: auto;
      overflow-x: hidden;
      .title {
        color: #444;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h5 {
        color: #444;
        margin-bottom: 10px;
      }
    }
    .table-list {
      flex: 1;
      overflow: hidden;
    }
  }
  .copy-number {
    color: #199fff;
    cursor: pointer;
    margin-left: 8px;
  }
  .table_bottom {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    float: right;
  }
}
.college-student-search {
  display: flex;
  justify-content: flex-start;
  span {
    font-size: 14px;
    color: #999;
    line-height: 40px;
  }
}
.addcourse {
  margin-left: auto;
  height: 40px;
  line-height: 18px;
}

.circle {
  margin-right: 8px;
  &-value {
    display: inline-block;
    margin-left: 3px;
    text-align: center;
    color: #6dd152;
    &.info {
      color: #bbb;
    }
  }
}
</style>
