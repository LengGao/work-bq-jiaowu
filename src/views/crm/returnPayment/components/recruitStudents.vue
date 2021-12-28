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
      >
        <el-table-column
          prop="id"
          label="序号"
          show-overflow-tooltip
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="surname"
          label="客户姓名"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="订单金额"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.order_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_money"
          label="回款金额"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.pay_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_date"
          label="回款日期"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付方式"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="group_name"
          label="部门名称"
          min-width="160"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="业绩归属"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="order_id"
          label="关联订单"
          show-overflow-tooltip
          min-width="220"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toCrmOrderDetail(row.order_id)">
              {{ row.project_name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="plan_pay_day"
          label="计划回款日期"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="plan_pay_money"
          label="计划回款金额"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.plan_pay_money">
              {{ row.plan_pay_money | moneyFormat }}
            </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_verify_status"
          label="订单状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              :type="verifyStatusMap[row.order_verify_status || 0].type"
            >
              {{ verifyStatusMap[row.order_verify_status || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_status"
          label="支付状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" :type="row.pay_status | orderTagType">{{
              row.pay_status | orderStatus
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="verify_status"
          label="入账状态"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.verify_status == 0"
              class="approve-status approve-status--none"
              >未入账</span
            >
            <span
              v-if="row.verify_status == 1"
              class="approve-status approve-status--success"
              >已入账</span
            >
            <span v-if="row.verify_status == 2" class="approve-status"
              >已驳回 <i class="el-icon-question" :title="row.tips"></i>
            </span>
            <span v-if="row.verify_status == 3" class="approve-status--wait"
              >确认入账中
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="!row.verify_status"
              type="text"
              @click="approveConfirm(row.id, 1)"
              >入账</el-button
            >
            <el-button
              v-if="!row.verify_status"
              type="text"
              @click="rejectConfirm(row.id, 2)"
              >驳回</el-button
            >
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
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import {
  getReturnPaymentList,
  entryLog,
  getCustomfieldOptions,
} from "@/api/crm";
import { getDepartmentlists, getStaffList } from "@/api/set";
import { cloneOptions } from "@/utils/index";
export default {
  name: "recruitStudents",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        keyword: "",
        department_id: "",
        staff_id: "",
        verify_status: "",
        pay_type: "",
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
          key: "pay_type",
          type: "select",
          width: 240,
          options: [],
          optionValue: "title",
          optionLabel: "title",
          attrs: {
            placeholder: "支付方式",
            clearable: true,
            filterable: true,
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
              value: 0,
              label: "未入账",
            },
            {
              value: 1,
              label: "已入账",
            },
            {
              value: 2,
              label: "已驳回",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "入账状态",
          },
        },
        {
          key: "pay_money",
          type: "numberRange",
          width: 280,
          attrs: {
            startPlaceholde: "回款金额起",
            endPlaceholde: "回款金额止",
            valueFormat: " - ",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "订单名称",
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
  created() {
    this.getReturnPaymentList();
    this.getCustomfieldOptions();
    this.getStaffList();
    this.getDepartmentlists();
  },
  methods: {
    // 获取部门
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.searchOptions[2].attrs.options = cloneOptions(
          res.data,
          "title",
          "id",
          "children"
        );
      }
    },
    // 获取支付方式
    async getCustomfieldOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data.field_content.map((item) => ({
          title: item,
        }));
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
    // 驳回
    rejectConfirm(id, verify_status) {
      this.$prompt("请输入驳回原因", "入账驳回", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.entryLog(id, verify_status, value);
        })
        .catch(() => {});
    },
    // 入账
    approveConfirm(id, verify_status) {
      this.$confirm(`是否确定该笔回款入账？`, "提示", {
        type: "warning",
      })
        .then(() => {
          this.entryLog(id, verify_status);
        })
        .catch(() => {});
    },
    async entryLog(id, verify_status, tips) {
      const data = {
        id,
        verify_status,
        tips,
      };
      const res = await entryLog(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getReturnPaymentList();
      }
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        department_id: Array.isArray(data.department_id)
          ? data.department_id.join(",")
          : "",
      };
      this.getReturnPaymentList(data);
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReturnPaymentList();
    },
    async getReturnPaymentList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
      };
      this.listLoading = true;
      const res = await getReturnPaymentList(data).catch(() => {});
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
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
</style>
