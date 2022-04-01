<template>
  <div class="expense-statistics">
    <div class="head_remind">
      *本模块主要是渠道用来进行日常学生数据的跟进管理。
    </div>
    <div class="expense-statistics-container">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
            color: '#909399',
          }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.surname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.mobile" />
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="推荐机构"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="department"
            label="所属部门"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="届别名称"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="year"
            label="所属年份"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            v-for="(item, type) in expenseTypeColumns"
            :key="type"
            :label="item"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="isPay(row.fee, type)"
                type="text"
                @click="updateExpenseStatus(row, item, type, 0)"
                class="success"
                >已缴</el-button
              >
              <el-button
                v-else
                type="text"
                @click="updateExpenseStatus(row, item, type, 1)"
                class="danger"
                >未缴</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <el-button type="text">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table_bottom">
        <div>
          <el-button @click="openPayDialog">补齐费用</el-button>
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <PayDialog v-model="payDialogVisible" />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils/index";
import { getproject, getAdminSelect } from "@/api/eda";
import { getFeeList, getOrgName } from "@/api/crm";
import { getCateList, getGradeOptions } from "@/api/sou";
import { getDepartmentlists } from "@/api/set";
import { getPlanYearOptions } from "@/utils/date";
import { mapGetters } from "vuex";
import PayDialog from "./PayDialog";
export default {
  name: "ExpenseStatistics",
  components: {
    PayDialog,
  },
  data() {
    return {
      importVisible: false,
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "from_org",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 220,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "department_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "所属部门",
            clearable: true,
            props: {
              multiple: true,
              checkStrictly: true,
            },
            "collapse-tags": true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "category_id",
          type: "select",
          options: [],
          optionValue: "category_id",
          optionLabel: "category_name",
          attrs: {
            placeholder: "所属分类",
            "collapse-tags": true,
            filterable: true,
            clearable: true,
            multiple: true,
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          width: 300,
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "jiebie_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "category_name,title",
          attrs: {
            placeholder: "届别名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "year",
          type: "select",
          options: (getPlanYearOptions() || []).map((item) => ({
            label: item,
            value: item,
          })),
          attrs: {
            placeholder: "所属年份",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      payDialogVisible: false,
      uids: [],
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    expenseTypeColumns() {
      for (const k in this.expenseType) {
        this.searchOptions.splice(-1, 0, {
          key: `type${k}`,
          type: "select",
          width: 120,
          options: [
            { label: "已缴", value: 1 },
            { label: "未缴", value: 0 },
          ],
          attrs: {
            placeholder: this.expenseType[k],
            clearable: true,
          },
        });
      }
      return this.expenseType;
    },
  },
  created() {
    this.getFeeList();
    this.getOrgName();
    this.getproject();
    this.getCateList();
    this.getDepartmentlists();
    this.getAdminSelect();
    this.getGradeOptions();
  },

  methods: {
    isPay(list, type) {
      const res = list.filter((item) => item.fee_type == type && item.status);
      return !!res.length;
    },
    handleSeletChange(selection) {
      this.uids = selection.map((item) => item.uid);
    },
    openPayDialog() {
      if (!this.uids.length) {
        this.$message.warning("请选择学生");
        return;
      }
      this.payDialogVisible = true;
    },
    updateExpenseStatus(row, expenseName, type, status) {
      this.$confirm(
        `您确认要修改 ${row.surname}-${
          row.project_name || ""
        } 的 ${expenseName} 状态为【${status ? "已缴" : "未缴"}】吗?"`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {});
    },
    handleSearch(data) {
      this.pageNum = 1;
      const {
        department_id = [],
        date,
        category_id,
        project_id,
        from_org,
        staff_id,
      } = data;
      this.searchData = {
        ...data,
        department_id: department_id.map((item) => item.pop()).join(","),
        date: (date || []).join(" - "),
        category_id: category_id.join(","),
        project_id: project_id.join(","),
        from_org: [...(from_org || [])].pop(),
        staff_id: staff_id.join(","),
      };
      this.getFeeList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getFeeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getFeeList();
    },
    //学生列表
    async getFeeList() {
      this.uids = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        channel: 1,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getFeeList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.searchOptions[6].options = res.data;
      }
    },
    // 获取部门
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.searchOptions[3].attrs.options = cloneOptions(
          res.data,
          "title",
          "id",
          "children"
        );
      }
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[5].options = res.data;
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
      }
    },
    // 获取机构
    async getOrgName() {
      const data = { state: 0 };
      const res = await getOrgName(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "from_organization_id",
          "children"
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.expense-statistics {
  .head_remind {
    padding: 0 20px 20px 20px;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #909399;
    width: 100%;
    border-bottom: 15px solid #f2f6fc;
  }
  &-container {
    padding: 20px;
    .success {
      color: #43d100;
    }
    .danger {
      color: #fd6500;
    }
  }
  .table_bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
