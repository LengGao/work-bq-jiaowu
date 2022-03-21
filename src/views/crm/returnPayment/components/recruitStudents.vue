<template>
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
        <span>回款总金额</span>
        <div class="time_num">
          <span>{{ panelData.pay_log_total | moneyFormat }}</span>
        </div>
      </li>
      <li class="panel-item">
        <span>已入账总金额</span>
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
          prop="pay_date"
          label="回款日期"
          min-width="100"
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
          prop="join_plan"
          label="关联计划"
          show-overflow-tooltip
          min-width="220"
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
          label="回款凭证"
          align="center"
          prop="admin_name"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <template v-if="row.receipt_file && row.receipt_file.length">
              <img
                :src="row.receipt_file[0]"
                @click="handlePreview(row.receipt_file)"
                style="height: 30px; cursor: pointer"
                alt=""
              />
            </template>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注信息"
          align="center"
          min-width="100"
          prop="tips"
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
          prop="group_name"
          label="部门名称"
          min-width="120"
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
              >确认入账中
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="!row.verify_status"
              type="text"
              @click="openEntryDialog(row)"
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
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      title="入帐"
      width="400px"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item label="入账时间" prop="pay_date">
          <el-date-picker
            class="input"
            type="date"
            placeholder="选择日期"
            v-model="formData.pay_date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="支付方式" prop="pay_type">
          <el-select
            v-model="formData.pay_type"
            placeholder="请选择支付方式"
            class="input"
            filterable
          >
            <el-option
              v-for="item in payMethodOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEntryCancel">取 消</el-button>
        <el-button type="primary" @click="handleEntryConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <PreviewImg ref="view" />
  </section>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import {
  getReturnPaymentList,
  entryLog,
  getCustomfieldOptions,
} from "@/api/crm";
import { getDepartmentlists, getStaffList } from "@/api/set";
import { cloneOptions, download } from "@/utils";
export default {
  name: "recruitStudents",
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
        verify_time: "",
        pay_date: "",
        keyword: "",
        department_id: "",
        staff_id: "",
        verify_status: "",
        pay_type: "",
      },
      searchOptions: [
        {
          key: "pay_date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "回款日期起",
            "end-placeholder": "回款日期止",
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
          key: "verify_time",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "入账日期起",
            "end-placeholder": "入账日期止",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
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
      dialogFormVisible: false,
      payMethodOptions: [],
      rules: {
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      formData: {
        pay_type: "",
        pay_date: "",
        id: "",
        verify_status: 1,
      },
    };
  },
  created() {
    this.getReturnPaymentList();
    this.getCustomfieldOptions();
    this.getStaffList();
    this.getDepartmentlists();
  },
  methods: {
    handlePreview(imgs) {
      this.$refs.view.show(imgs);
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
        this.payMethodOptions = res.data.field_content;
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
    handleEntryCancel() {
      this.formData = {
        pay_type: "",
        pay_date: "",
        id: "",
        verify_status: 1,
      };
      this.$refs.formData.resetFields();
      this.dialogFormVisible = false;
    },
    handleEntryConfirm() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await entryLog(this.formData);
          if (res.code === 0) {
            this.dialogFormVisible = false;
            this.$message.success(res.message);
            this.getReturnPaymentList();
          }
        }
      });
    },
    openEntryDialog(row) {
      this.formData.id = row.id;
      this.formData.pay_type = row.pay_type;
      this.formData.pay_date = row.pay_date;
      this.dialogFormVisible = true;
    },
    async entryLog(id, verify_status, tips) {
      const data = {
        id,
        verify_status,
        tips,
      };
      const res = await entryLog(data);
      if (res.code === 0) {
        this.dialogFormVisible = false;
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
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getReturnPaymentList();
    },
    async getReturnPaymentList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        verify_time: Array.isArray(this.searchData.verify_time)
          ? this.searchData.verify_time.join(" - ")
          : "",
        pay_date: Array.isArray(this.searchData.pay_date)
          ? this.searchData.pay_date.join(" - ")
          : "",
      };
      this.listLoading = true;
      const res = await getReturnPaymentList(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.panelData = res.data.count;
      this.listTotal = res.data.total;
    },
    async exportList() {
      const data = {
        page: this.pageNum,
        export: 1,
        limit: this.pageSize,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        pay_date: Array.isArray(this.searchData.pay_date)
          ? this.searchData.pay_date.join(" - ")
          : "",
      };
      this.exportLoading = true;
      const res = await getReturnPaymentList(data).catch(() => {});
      this.exportLoading = false;
      download(res.data.url, "回款入帐");
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
    width: calc(100% / 3);
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
