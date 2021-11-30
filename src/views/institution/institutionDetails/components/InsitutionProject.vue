<template>
  <div class="college-student">
    <div class="college-student-container">
      <!-- <div class="tree-list">
        <div class="question-bank-list">
          <div class="tree-list">
            <p class="title">项目分类</p>
            <v-tree ref="tree" :tpl="tpl" :data="treeData" />
          </div>
        </div>
      </div> -->
      <div class="table-list">
        <!--搜索模块-->
        <!-- <div class="college-student-search">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
        </div> -->

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
          >
            <el-table-column
              prop="project_id"
              label="项目ID"
              min-width="60"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="project_name"
              label="项目名称"
              min-width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="category_name"
              label="所属分类"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <!-- <el-table-column
              prop="buy_num"
              label="购买人数"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column> -->
            <el-table-column
              v-for="(item, index) in classTypes"
              :key="index"
              :label="item.title"
              show-overflow-tooltip
              min-width="100"
            >
              <template slot-scope="{ row }">
                <span>
                  {{ row.org_class_type[index].price | moneyFormat }}
                </span>
              </template>
            </el-table-column>

            <!-- <el-table-column label="操作" min-width="120">
              <template slot-scope="{ row }">
                <el-button
                  type="text"
                  @click="handleDelete(row.id, row.question_bank_id)"
                >
                  移除
                </el-button>
              </template>
            </el-table-column> -->
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
    </div>
  </div>
</template>

<script>
import {
  getOrgProjectr,
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
        category_id: "",
      },
      classTypes: [],
    };
  },
  created() {
    this.getOrgProjectr();
    this.questionBankCategoryList();
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
        this.getOrgProjectr();
        this.dialogVisible = false;
      }
      this.getOrgProjectr();
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
      this.getOrgProjectr();
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.getOrgProjectr();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getOrgProjectr();
    },

    handlePageChange(val) {
      this.pageNum = val;
      this.getOrgProjectr();
    },
    // 获取列表
    async getOrgProjectr() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
        from_organization_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await getOrgProjectr(data);
      this.listLoading = false;
      if (res.code === 0) {
        if (res.data.list.length) {
          this.classTypes = res.data.list[0].org_class_type;
        }
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
