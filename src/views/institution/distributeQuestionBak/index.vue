<template>
  <div class="distribute-question">
    <div class="head_remind">*将题库批量分发给入驻机构</div>
    <div class="container">
      <div class="container-table">
        <div class="table-left">
          <Title text="分发题库" />
          <SearchList
            :options="searchLeftOptions"
            :data="searchLeftData"
            @on-search="handleLeftSearch"
          />
          <el-table
            ref="multipleTable"
            :data="listLeftData"
            style="width: 100%"
            v-loading="listLeftLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            class="table"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            @selection-change="handleLeftSelection"
            height="520"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="题库名称"
              show-overflow-tooltip
              min-width="240"
              align="left"
              prop="title"
            >
            </el-table-column>
            <el-table-column
              label="所属分类"
              show-overflow-tooltip
              min-width="120"
              align="center"
              prop="category_name"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="题库价格"
              min-width="100"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-input
                  type="number"
                  size="small"
                  v-model="row.price"
                  placeholder="请输入"
                >
                </el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listLeftTotal"
              :curpage="pageLeftNum"
              @pageChange="handleLeftPageChange"
              @pageSizeChange="handleLeftSizeChange"
            />
          </div>
        </div>
        <div class="table-right">
          <Title text="分发机构" />
          <SearchList
            :options="searchRightOptions"
            :data="searchRightData"
            @on-search="handleRightSearch"
          />
          <el-table
            ref="multipleTable"
            :data="listRightData"
            style="width: 100%"
            class="table"
            v-loading="listRightLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            height="520"
            @selection-change="handleRightSelection"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="机构名称"
              show-overflow-tooltip
              min-width="70"
              align="left"
              prop="institution_name"
            >
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listRightTotal"
              :curpage="pageRightNum"
              @pageChange="handleRightPageChange"
              @pageSizeChange="handleRightSizeChange"
            />
          </div>
        </div>
      </div>
      <div class="container-actions">
        <Title text="分发小结" />
        <p class="tips">
          分发题库数量：<span>{{ leftSelection.length }}</span>
          个，分发机构数量：<span>{{ rightSelection.length }}</span> 个
        </p>
        <div>
          <el-button @click="handleReset">取消</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="assignOrgQuestionBank"
            >确定分拨</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import { getOrgList, assignOrgQuestionBank } from "@/api/institution";
import { getQuestionBankList } from "@/api/sou";
export default {
  name: "distributequestion",
  data() {
    return {
      listLeftData: [],
      listLeftLoading: false,
      listLeftTotal: 0,
      pageLeftNum: 1,
      pageLeftSize: 20,
      searchLeftData: {
        title: "",
        category_id: [],
      },
      searchLeftOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "title",
          attrs: {
            placeholder: "题库名称",
          },
        },
      ],
      listRightData: [],
      listRightLoading: false,
      listRightTotal: 0,
      pageRightNum: 1,
      pageRightSize: 20,
      searchRightData: {
        search_box: "",
      },
      searchRightOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "机构名称",
          },
        },
      ],
      leftSelection: [],
      rightSelection: [],
      submitLoading: false,
    };
  },
  created() {
    this.getQuestionBankList();
    this.getOrgList();
    this.getCateList();
  },
  methods: {
    handleReset() {
      this.getOrgList();
      this.getQuestionBankList();
    },
    // 把输入的价格存到本地
    setquestionBankPrice(newData) {
      const oldData = JSON.parse(localStorage.getItem("questionBankPrice"));
      const newDataMap = {};
      newData.forEach((item) => {
        newDataMap[item.id] = item.price;
      });
      localStorage.setItem(
        "questionBankPrice",
        JSON.stringify({
          ...oldData,
          ...newDataMap,
        })
      );
    },
    // 分发
    async assignOrgQuestionBank() {
      if (!this.leftSelection.length) {
        this.$message.warning("请选择题库");
        return;
      }
      if (!this.rightSelection.length) {
        this.$message.warning("请选择机构");
        return;
      }
      if (this.leftSelection.some((item) => item.price === "")) {
        this.$message.warning("请输入选中题库的价格");
        return;
      }
      const data = {
        institution_arr: this.rightSelection,
        question_bank_arr: this.leftSelection.map((item) => ({
          question_bank_id: item.id,
          wholesale_price: item.price || 0,
        })),
      };
      this.submitLoading = true;
      const res = await assignOrgQuestionBank(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.setquestionBankPrice([...this.leftSelection]);
        this.handleReset();
      }
    },
    handleRightSelection(selection) {
      this.rightSelection = selection.map((item) => item.institution_id);
    },
    handleLeftSelection(selection) {
      this.leftSelection = selection;
    },
    handleLeftSearch(data) {
      this.pageLeftNum = 1;
      this.searchLeftData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getQuestionBankList();
    },
    handleLeftPageChange(val) {
      this.pageLeftNum = val;
      this.getQuestionBankList();
    },
    handleLeftSizeChange(size) {
      this.pageLeftSize = size;
      this.getQuestionBankList();
    },
    // 题库列表
    async getQuestionBankList() {
      const data = {
        page: this.pageLeftNum,
        limit: this.pageLeftSize,
        ...this.searchLeftData,
      };
      this.listLeftLoading = true;
      const res = await getQuestionBankList(data);
      const questionBankPrice = JSON.parse(
        localStorage.getItem("questionBankPrice")
      );
      this.listLeftLoading = false;
      this.listLeftTotal = res.data.total;
      this.listLeftData = res.data.list.map((item) => ({
        ...item,
        price: questionBankPrice ? questionBankPrice[item.id] || "" : "",
      }));
    },
    handleRightSearch(data) {
      this.pageRightNum = 1;
      this.searchRightData = {
        ...data,
      };
      this.getOrgList();
    },
    handleRightPageChange(val) {
      this.pageRightNum = val;
      this.getOrgList();
    },
    handleRightSizeChange(size) {
      this.pageRightSize = size;
      this.getOrgList();
    },
    // 机构列表
    async getOrgList() {
      const data = {
        page: this.pageRightNum,
        limit: this.pageRightSize,
        ...this.searchRightData,
      };
      this.listRightLoading = true;
      const res = await getOrgList(data);
      this.listRightLoading = false;
      this.listRightTotal = res.data.total;
      this.listRightData = res.data.list;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchLeftOptions[0].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
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

.distribute-question {
  .container {
    padding: 20px;
    &-table {
      display: flex;
      justify-content: space-between;
      .table_bottom {
        padding-bottom: 0;
      }
      .tips {
        color: #606266;
      }
      .table {
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
      .tab-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .table-left {
        width: 60%;
        flex-shrink: 0;
      }
      .table-right {
        width: 38%;
        flex-shrink: 0;
      }
    }
    &-actions {
      .tips {
        color: #606266;
        margin-bottom: 16px;
        span {
          color: #196ff1;
        }
      }
    }
  }
}
</style>