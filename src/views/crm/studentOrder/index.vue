<template>
  <section>
    <div class="head_remind">*渠道订单管理</div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
          all="1"
        >
          <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
          <el-table-column
            prop="order_id"
            label="订单编号"
            show-overflow-tooltip
            min-width="190"
          >
            <template slot-scope="scope">
              <div class="link" @click="toDetail(scope.row.order_id)">
                {{ scope.row.order_no }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="客户姓名"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="from_institution_name"
            label="所属机构"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="业绩归属"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_money"
            label="订单总金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }"> ￥{{ row.order_money }} </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetail(row.order_id)"
                >订单详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getShortcuts, today } from "@/utils/date";
import { getproject } from "@/api/eda";
import { getStaffList, getDepartmentlists } from "@/api/set";
import { getCrmOrderList, getOrgName } from "@/api/crm";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "studentOrder",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        date: (this.$route.query.date || `${today},${today}`).split(","),
        from_org: [],
        keyword: "",
        project_id: "",
        staff_id: this.$route.query.staff_id
          ? this.$route.query.staff_id.split(",").map((item) => +item)
          : [],
        pay_status: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "所属分类（多选）",
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
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          width: 280,
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "staff_id",
          type: "select",
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "业绩归属",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
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
          key: "department_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "部门名称",
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
          key: "order_money",
          type: "numberRange",
          width: 280,
          attrs: {
            startPlaceholde: "订单金额起",
            endPlaceholde: "订单金额止",
            valueFormat: " - ",
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
    this.getCrmOrderList();
    this.getStaffList();
    this.getproject();
    this.getCateList();
    this.getDepartmentlists();
    this.getOrgName();
  },
  methods: {
    toInstitutionalCollection() {
      this.$router.push({
        name: "institutionalCollection",
      });
    },
    toDetail(id) {
      this.$router.push({
        name: "studentOrderDetail",
        query: {
          id,
        },
      });
    },
    // 获取部门
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.searchOptions[5].attrs.options = cloneOptions(
          res.data,
          "title",
          "id",
          "children"
        );
      }
    },
    // 获取机构
    async getOrgName() {
      const data = { state: 0 };
      const res = await getOrgName(data);
      if (res.code === 0) {
        this.searchOptions[4].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "from_organization_id",
          "children"
        );
      }
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 业绩归属
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.searchOptions[3].options = res.data.list;
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      data.department_id = data.department_id || [];
      this.searchData = {
        ...data,
        department_id: data.department_id.map((item) => item.pop()).join(","),
      };
      this.getCrmOrderList(data);
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getCrmOrderList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCrmOrderList();
    },
    async getCrmOrderList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        channel: 1,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
        from_org: Array.isArray(this.searchData.from_org)
          ? [...this.searchData.from_org].pop()
          : "",
        staff_id: Array.isArray(this.searchData.staff_id)
          ? this.searchData.staff_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getCrmOrderList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },
    coursDetail(uid) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
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
.customer_navigation {
  display: flex;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 20px;
  li {
    min-width: 60px;
    height: 28px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
    border-bottom: 2px solid #fff;
    &.active {
      color: #199fff;
      border-color: #199fff;
    }
  }
  li:last-child {
    margin-right: 0px;
  }
  li:hover {
    color: #199fff;
    border-color: #199fff;
  }
}
.link {
  cursor: pointer;
  color: #199fff;
}
.panel-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
  .panel-item {
    width: calc(100% / 3);
    margin-left: 16px;
    border: 1px solid #e4e7ed;
    text-align: center;
    padding: 16px;
    .time_num {
      margin-top: 6px;
      font-size: 22px;
    }
    &:first-child {
      margin-left: 0;
    }
  }
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  text-align: right;
}
</style>
