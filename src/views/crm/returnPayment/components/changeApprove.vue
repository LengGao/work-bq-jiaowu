<template>
  <div class="institutional-collection">
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
          prop="log_id"
          label="ID"
          min-width="70"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="org_name"
          label="机构名称"
          min-width="130"
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
          label="回款类型"
          show-overflow-tooltip
          min-width="100"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>
              {{ planTypeMap[row.type] || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="year"
          label="所属年份"
          min-width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.year || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_money"
          label="订单总金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.order_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="receivable_money"
          label="回款金额"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.receivable_money | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付方式"
          show-overflow-tooltip
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="order_num"
          label="关联订单数"
          show-overflow-tooltip
          min-width="100"
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
          prop="create_time"
          label="创建时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="check_state"
          label="入账状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.check_state == 0"
              class="approve-status approve-status--none"
              >待确认</span
            >
            <span
              v-if="row.check_state == 1"
              class="approve-status approve-status--wait"
              >已确认</span
            >
            <span
              v-if="row.check_state == 2"
              class="approve-status approve-status--success"
              >已入账
            </span>
            <span v-if="row.check_state == -1" class="approve-status"
              >已驳回
              <i class="el-icon-question" :title="row.rejected_note"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              v-if="!row.check_state"
              @click="approveConfirm(row.log_id, 2)"
              >入账</el-button
            >
            <el-button
              type="text"
              v-if="!row.check_state"
              @click="rejectConfirm(row.log_id, -1)"
              >驳回</el-button
            >
            <el-button type="text" @click="optenDialog(row.log_id)"
              >回款详情</el-button
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
    <el-dialog title="回款详情" :visible.sync="dialogVisible" width="80%">
      <Detail :logId="logId" :key="logId" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Detail from "@/views/institution/paymentRebate/components/institutionalCollection/detail.vue";
import { getShortcuts, getPlanYearOptions } from "@/utils/date";
import {
  getOrgReceivableList,
  getOrgName,
  getReceivableStatus,
  getBelongPeople,
  getPlanTypeList,
  reviewReceivableOrder,
} from "@/api/crm";
export default {
  name: "changeApprove",
  components: {
    Detail,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
        check_state: "-2",
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
          key: "from_organization_id",
          type: "select",
          optionValue: "from_organization_id",
          optionLabel: "institution_name",
          options: [],
          attrs: {
            placeholder: "机构名称",
            clearable: true,
            filterable: true,
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
          key: "check_state",
          type: "select",
          width: 120,
          options: [],
          optionValue: "check_state",
          optionLabel: "title",
          attrs: {
            clearable: true,
            placeholder: "入账状态",
          },
        },
        {
          key: "type",
          type: "select",
          width: 120,
          options: [],
          optionValue: "value",
          optionLabel: "label",
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "回款类型",
          },
        },
        {
          key: "year",
          type: "select",
          width: 120,
          options: (getPlanYearOptions() || []).map((item) => ({
            value: item,
            lable: item,
          })),
          optionValue: "value",
          optionLabel: "label",
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "所属年份",
          },
        },
        {
          key: "money",
          type: "numberRange",
          width: 280,
          attrs: {
            startPlaceholde: "回款金额起",
            endPlaceholde: "回款金额止",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "姓名/手机号码",
          },
        },
      ],
      dialogVisible: false,
      logId: "",
      planTypeMap: {},
    };
  },
  activated() {
    this.getOrgReceivableList();
  },
  created() {
    this.getOrgReceivableList();
    this.getOrgName();
    this.getPlanTypeList();
    this.getBelongPeople();
    this.getReceivableStatus();
  },
  methods: {
    // 回款类型
    async getPlanTypeList() {
      const res = await getPlanTypeList();
      if (res.code === 0) {
        this.planTypeMap = res.data;
        this.searchOptions[4].options = Object.entries(res.data).map(
          (item) => ({
            label: item[1],
            value: item[0],
          })
        );
      }
    },
    optenDialog(logId) {
      this.logId = logId;
      this.dialogVisible = true;
    },
    // 驳回
    rejectConfirm(log_id, check_state) {
      this.$prompt("请输入驳回原因", "入账驳回", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.reviewReceivableOrder(log_id, check_state, value);
        })
        .catch(() => {});
    },
    // 入账
    approveConfirm(log_id, check_state) {
      this.$confirm(`是否确定该笔回款入账？`, "提示", {
        type: "warning",
      })
        .then(() => {
          this.reviewReceivableOrder(log_id, check_state);
        })
        .catch(() => {});
    },
    async reviewReceivableOrder(log_id, check_state, rejected_note) {
      const data = {
        log_id,
        rejected_note,
        check_state,
      };
      const res = await reviewReceivableOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getOrgReceivableList();
      }
    },
    // 获取入账状态
    async getReceivableStatus() {
      const res = await getReceivableStatus();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取机构
    async getOrgName() {
      const data = {
        state: 1,
      };
      const res = await getOrgName(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },

    // 业绩归属
    async getBelongPeople() {
      const data = { list: true };
      const res = await getBelongPeople(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      const money = data.money || ["", ""];
      const date = data.date || ["", ""];
      delete data.money;
      delete data.date;
      this.searchData = {
        ...data,
        min_money: money[0],
        max_money: money[1],
        start_date: date[0],
        end_date: date[1],
      };
      this.getOrgReceivableList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrgReceivableList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getOrgReceivableList();
    },
    async getOrgReceivableList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        state: 1,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getOrgReceivableList(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    toDetail(id) {
      this.$router.push({
        name: "institutionalCollectionDetail",
        query: {
          id,
          isFromApproval: 1,
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
