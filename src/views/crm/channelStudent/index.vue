<template>
  <section>
    <div class="head_remind">
      *本模块主要是渠道用来进行日常学生数据的跟进管理。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <div class="header">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>

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
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="100"
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
            prop="from_institution_name"
            label="所属机构"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="customer_type"
            label="客户性质"
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
            prop="create_time"
            label="报名时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toStudentDetail(row.uid)"
                  >学生详情</el-button
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
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils/index";
import { getproject, getAdminSelect } from "@/api/eda";
import { getChannelStudentList } from "@/api/crm";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
export default {
  name: "channelStudent",
  components: {
    PartiallyHidden,
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
        date: (this.$route.query.date || "").split(","),
        category_id: [],
        project_id: [],
        from_org: "",
        keyword: "",
        uid: this.$route.query.uid || "",
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
          width: 140,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
          },
        },
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
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
            multiple: true,
          },
        },

        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
    };
  },

  created() {
    this.getChannelStudentList();
    this.getInstitutionSelectData();
    this.getproject();
    this.getCateList();
    this.getAdminSelect();
  },

  methods: {
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
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
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getChannelStudentList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getChannelStudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getChannelStudentList();
    },
    //学生列表
    async getChannelStudentList() {
      this.intent_id = "";
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        channel: 1,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        from_org: Array.isArray(this.searchData.from_org)
          ? [...this.searchData.from_org].pop()
          : "",
      };
      this.listLoading = true;
      const res = await getChannelStudentList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[3].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.mainPart {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.actions {
  padding-top: 10px;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
