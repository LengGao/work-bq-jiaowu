<template>
  <section>
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
        <el-table-column
          prop="order_id"
          label="订单编号"
          show-overflow-tooltip
          min-width="190"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)">
              {{ row.order_no }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="160"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button type="text" @click="coursDetail(scope.row.uid)">
              {{ scope.row.surname }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
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
          <template slot-scope="{ row }">
            ￥{{ row.order_money || 0 }}
          </template>
        </el-table-column>

        <el-table-column
          prop="verify_status"
          label="审批状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              :type="verifyStatusMap[row.verify_status || 0].type"
            >
              {{ verifyStatusMap[row.verify_status || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="finish_staff_id"
          label="处理状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.finish_staff_id"
              class="approve-status approve-status--success"
              >已处理</span
            >
            <span v-else class="approve-status">待处理</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <el-button
              v-if="!row.finish_staff_id && row.verify_status === 1"
              type="text"
              @click="approveConfirm(row, 1)"
              >通过</el-button
            >
            <el-button
              v-if="!row.finish_staff_id && row.verify_status === 1"
              type="text"
              @click="approveConfirm(row, 2)"
              >驳回</el-button
            >
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
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
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import { getAdminSelect, getproject } from "@/api/eda";
import { getCateList } from "@/api/sou";
import { getCrmApproveOrder, crmOrderApprove } from "@/api/crm";
import { cloneOptions } from "@/utils/index";
export default {
  name: "orderApprove",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        date: "",
        keyword: "",
        project_id: "",
        category_id: "",
        staff_id: "",
        finish_status: "",
        verify_status: "",
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
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "业绩归属",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "verify_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "待审核",
            },
            {
              value: 2,
              label: "（多人）审核中",
            },
            {
              value: 3,
              label: "审核通过",
            },
            {
              value: 8,
              label: "已撤销审核",
            },
            {
              value: 9,
              label: "驳回不通过",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "审核状态",
          },
        },
        {
          key: "finish_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "已处理",
            },
            {
              value: 2,
              label: "待处理",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "处理状态",
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

      verifyStatusMap: {
        1: {
          text: "待审核",
          type: "info",
        },
        2: {
          text: "（多人）审核中",
          type: "primary",
        },
        3: {
          text: "审核通过",
          type: "success",
        },
        8: {
          text: "已撤销审核",
          type: "info",
        },
        9: {
          text: "驳回不通过",
          type: "danger",
        },
      },
      orderActionDialog: false,
    };
  },
  activated() {
    this.getCrmApproveOrder();
  },
  created() {
    this.getCrmApproveOrder();
    this.getCateList();
    this.getAdminSelect();
    this.getproject();
  },
  methods: {
    approveConfirm(row, action) {
      this.$prompt("请输入备注", action === 2 ? "驳回" : "通过", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.crmOrderApprove(row, action, value);
        })
        .catch(() => {});
    },
    async crmOrderApprove({ order_id }, action, tips) {
      const data = {
        order_id,
        action,
        tips,
      };
      const res = await crmOrderApprove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCrmApproveOrder();
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
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
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
      this.searchData = {
        ...data,
      };
      this.getCrmApproveOrder(data);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getCrmApproveOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCrmApproveOrder();
    },
    async getCrmApproveOrder() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
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
      };
      this.listLoading = true;
      const res = await getCrmApproveOrder(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    coursDetail(uid) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid,
        },
      });
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
}
</style>
