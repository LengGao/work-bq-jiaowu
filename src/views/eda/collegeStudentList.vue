<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近学历报名的学生。</div>
    <div class="college-student-container">
      <div class="tree-list">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          @node-click="onNodeClick"
        >
        </el-tree>
      </div>
      <div class="table-list">
        <!--搜索模块-->
        <div class="college-student-search">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
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
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
          >
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
              prop="project_name"
              label="项目名称"
              show-overflow-tooltip
              min-width="220"
            ></el-table-column>
            <el-table-column
              prop="from_institution_name"
              label="推荐机构"
              show-overflow-tooltip
              min-width="130"
            ></el-table-column>
            <el-table-column
              prop="institution_name"
              label="所属校区"
              show-overflow-tooltip
              min-width="130"
            ></el-table-column>
            <el-table-column
              prop="staff_name"
              label="所属老师"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="pay_type"
              label="支付方式"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="order_money"
              label="订单金额"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="pay_money"
              label="支付金额"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="100">
              <template slot-scope="{ row }">
                <el-button type="text" @click="toOrderDetail(row.order_id)">
                  订单详情
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
    </div>
  </div>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getEduList, getAdminSelect, getTreeCategory } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import { getShortcuts } from "@/utils/date";
export default {
  name: "collegeStudentList",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      searchData: {
        // keyword: "",
        // organization_id: "",
        // staff_id: "",
        date: "",
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
        // {
        //   key: "organization_id",
        //   type: "cascader",
        //   attrs: {
        //     placeholder: "推荐机构",
        //     filterable: true,
        //     clearable: true,
        //     options: [],
        //   },
        // },
        // {
        //   key: "staff_id",
        //   type: "select",
        //   options: [],
        //   optionValue: "staff_id",
        //   optionLabel: "staff_name",
        //   attrs: {
        //     placeholder: "所属老师",
        //     clearable: true,
        //     filterable: true,
        //   },
        // },
        // {
        //   key: "keyword",
        //   attrs: {
        //     placeholder: "学生姓名",
        //   },
        // },
      ],

      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      defaultProps: {
        children: "child",
        label: (data) => {
          return data.title === "全部"
            ? data.title
            : `${data.title} (${data.count})`;
        },
      },
      treeData: [],
      treeParams: {},
    };
  },
  created() {
    this.getTreeCategory();
    this.getEduList();
    // this.getInstitutionSelectData();
    // this.getAdminSelect();
  },
  methods: {
    onNodeClick(data) {
      console.log(data);
      const {
        type_id = "",
        university_id = "",
        level_id = "",
        major_id = "",
      } = data;
      this.treeParams = { type_id, university_id, level_id, major_id };
      this.getEduList();
    },
    async getTreeCategory() {
      const res = await getTreeCategory();
      if (res.code === 0) {
        this.treeData = [
          {
            title: "全部",
          },
        ].concat(res.data);
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      this.detaiLoading = true;
      const res = await getAdminSelect().catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: Array.isArray(data.organization_id)
          ? data.organization_id.pop()
          : data.organization_id,
        date: data.date.length ? data.date.join(" - ") : "",
      };
      this.getEduList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getEduList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getEduList();
    },
    // 获取列表
    async getEduList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getEduList(data);
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
.college-student {
  &-container {
    padding: 20px;
    display: flex;
    .tree-list {
      width: 300px;
      flex-shrink: 0;
      border-right: 1px solid #eee;
      margin-right: 20px;
      max-height: 80vh;
      overflow-y: auto;
    }
    .table-list {
      flex: 1;
    }
  }
  .copy-number {
    color: #199fff;
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>