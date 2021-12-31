<template>
  <div class="institution-user-manage">
    <!--搜索模块-->
    <div class="college-student-search">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSeletChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="订单编号"
          show-overflow-tooltip
          min-width="180"
          align="left"
          prop="order_no"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toDetail(row.order_id)">
              {{ row.order_no }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="订单时间"
          min-width="160"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="学生姓名"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile || ''" />
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="归属人"
          min-width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="开通课程"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.course_name">
              {{ row.course_name }}
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="problem_name"
          label="开通题库"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.problem_name">
              {{ row.problem_name }}
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="订单金额"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pay_status"
          label="订单状态"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ statusMap[row.pay_status] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div>
          <el-button @click="openStaffDialog">更改业绩归属人</el-button>
          <el-button @click="openOrderFromDialog">更换订单所属机构</el-button>
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <UpdatePerformanceAttribution
      v-model="staffDialog"
      :orderIds="checkedIds"
      @on-success="studentsOrder"
    />
    <UpdateInstitutionOrder
      v-model="orderFromDialog"
      :orderIds="checkedIds"
      @on-success="studentsOrder"
    />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { studentsOrder } from "@/api/institution";
import UpdatePerformanceAttribution from "@/views/eda/components/UpdatePerformanceAttribution";
import UpdateInstitutionOrder from "@/views/eda/components/UpdateInstitutionOrder";
export default {
  name: "StudentOrder",
  components: {
    PartiallyHidden,
    UpdatePerformanceAttribution,
    UpdateInstitutionOrder,
  },
  data() {
    return {
      statusMap: {
        0: "已成交",
        1: "已退款",
        2: "待退款",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
        pay_status: "",
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
        {
          key: "pay_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "已成交",
            },
            {
              value: 1,
              label: "已退款",
            },
            {
              value: 2,
              label: "待退款",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "订单状态",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      checkedIds: [],
      staffDialog: false,
      orderFromDialog: false,
    };
  },

  created() {
    this.studentsOrder();
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: "studentOrderDetail",
        query: {
          id,
        },
      });
    },
    openOrderFromDialog() {
      if (!this.checkedIds.length) {
        this.$message.warning("请选择订单");
        return;
      }
      this.orderFromDialog = true;
    },
    openStaffDialog() {
      if (!this.checkedIds.length) {
        this.$message.warning("请选择订单");
        return;
      }
      this.staffDialog = true;
    },
    handleSeletChange(selection) {
      this.checkedIds = selection.map((item) => item.order_id);
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.studentsOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.studentsOrder();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.studentsOrder();
    },
    // 学生订单
    async studentsOrder() {
      this.checkedIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        org_id: this.$route.query?.institution_id || "",
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await studentsOrder(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
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
.institution-user-manage {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.institution-user-manage[data-v-1b63f2f8] {
  padding: 10px 20px 20px 0;
}
.link {
  cursor: pointer;
  color: #199fff;
}
.table_bottom {
  display: flex;
  justify-content: space-between;
}
</style>
