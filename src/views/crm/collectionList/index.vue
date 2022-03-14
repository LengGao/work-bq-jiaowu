<template>
  <div>
    <div class="head_remind">
      *本页的订单统计数据是根据回款创建时间进行统计的，所以列出的订单金额不局限于您选择的日期所限定的订单金额。
    </div>
    <section>
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div class="actions">
          <el-button type="primary" :loading="exportLoading" @click="exportList"
            >导 出</el-button
          >
        </div>
      </header>
      <ul class="panel-list">
        <li class="panel-item">
          <span>招生订单总金额</span>
          <div class="time_num">
            <span>{{ panelData.order_total_money | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>招生回款总金额</span>
          <div class="time_num">
            <span>{{ panelData.pay_log_total | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>入账总金额</span>
          <div class="time_num">
            <span>{{ panelData.verify_money | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>未入账金额</span>
          <div class="time_num">
            <span>{{ panelData.not_verify_money | moneyFormat }}</span>
          </div>
        </li>
      </ul>
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
            prop="id"
            label="序号"
            show-overflow-tooltip
            min-width="70"
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
            prop="pay_date"
            label="回款日期"
            min-width="100"
            show-overflow-tooltip
          >
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
                {{ row.title }}
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
            </template>
          </el-table-column>
          <el-table-column
            prop="order_create_time"
            label="订单创建日期"
            min-width="100"
            show-overflow-tooltip
          >
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
                >多级审批中
              </span>
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
  </div>
</template>

<script>
import { getShortcuts, today } from "@/utils/date";
import { getReturnPaymentList, getCustomfieldOptions } from "@/api/crm";
import { getDepartmentlists, getStaffList } from "@/api/set";
import { cloneOptions, download } from "@/utils";
export default {
  name: "collectionList",
  data() {
    return {
      panelData: {},
      listData: [],
      listLoading: false,
      exportLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        date: (this.$route.query.date || `${today},${today}`).split(","),
        keyword: "",
        department_id: "",
        staff_id: this.$route.query.staff_id
          ? this.$route.query.staff_id.split(",").map((item) => +item)
          : [],
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
          key: "sources",
          type: "select",
          width: 200,
          options: [],
          optionValue: "title",
          optionLabel: "title",
          attrs: {
            placeholder: "客户来源",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
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
    this.getCustomFromOptions();
    this.getStaffList();
    this.getDepartmentlists();
  },
  methods: {
    async exportList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        export: 1,

        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        staff_id: Array.isArray(this.searchData.staff_id)
          ? this.searchData.staff_id.join(",")
          : "",
        sources: Array.isArray(this.searchData.sources)
          ? this.searchData.sources.join(",")
          : "",
      };
      this.exportLoading = true;
      const res = await getReturnPaymentList(data).catch(() => {});
      this.exportLoading = false;
      download(res.data.url, "回款入帐");
    },
    // 获取客户来源
    async getCustomFromOptions() {
      const data = {
        field_name: "customer_source",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.searchOptions[4].options = res.data.field_content.map((item) => ({
          title: item,
        }));
      }
    },
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
    handleSearch(data) {
      data.department_id = data.department_id || [];
      this.pageNum = 1;
      this.searchData = {
        ...data,
        department_id: data.department_id.map((item) => item.pop()).join(","),
      };
      this.getReturnPaymentList(data);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getReturnPaymentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReturnPaymentList();
    },
    async getReturnPaymentList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        staff_id: Array.isArray(this.searchData.staff_id)
          ? this.searchData.staff_id.join(",")
          : "",
        sources: Array.isArray(this.searchData.sources)
          ? this.searchData.sources.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getReturnPaymentList(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.panelData = res.data.count;
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

<style lang="less" scoped>
section {
  padding: 16px;
  header {
    display: flex;
    justify-content: space-between;
  }
  .panel-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #606266;
    .panel-item {
      width: calc(100% / 4);
      margin-left: 16px;
      border: 1px solid #e4e7ed;
      text-align: center;
      padding: 16px;
      margin-bottom: 16px;
      .time_num {
        margin-top: 6px;
        font-size: 22px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}

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
