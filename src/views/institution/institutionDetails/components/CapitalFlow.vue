<template>
  <div class="institution-user-manage">
    <!--搜索模块-->
    <div class="college-student-search">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <span style="color: #999; font-size: 15px; padding-right: 15px"
          >当前账户余额：<span style="color: #ee4e00"
            >¥ {{ this.$route.query.balance }}
          </span></span
        >
        <el-button type="primary" style="height: 40px" @click="openRecharge">
          充值</el-button
        >
      </div>
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
      >
        <el-table-column
          label="订单单号"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="order_sn"
        >
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="订单时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="order_type"
          label="订单类型"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ statusMap[row.order_type || 0].text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="变更金额"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span style="color: orangered">￥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="before_blance"
          label="变更前余额"
          min-width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.before_blance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="balance"
          label="变更后余额"
          min-width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="操作用户"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="dec"
          label="备注信息"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
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

    <RechargeDialogcon
      v-model="rechargeDialogVisible"
      @on-success="moneyFlowing"
    />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { moneyFlowing } from "@/api/institution";
import RechargeDialogcon from "./rechargeDialogcon";

export default {
  name: "CapitalFlow",
  components: {
    PartiallyHidden,
    RechargeDialogcon,
  },
  data() {
    return {
      rechargeDialogVisible: false,
      currentData: {},
      statusMap: {
        1: {
          text: "后台充值",
        },
        2: {
          text: "机构充值",
        },
        3: {
          text: "订单支付",
        },
        4: {
          text: "订单作废退款",
        },
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
        order_type: "",
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
          key: "order_type",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "总台充值",
            },
            {
              value: 2,
              label: "机构充值",
            },
            {
              value: 3,
              label: "订单支付",
            },
            {
              value: 4,
              label: "订单作废退款",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "订单类型",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "订单单号",
          },
        },
      ],
    };
  },

  created() {
    this.moneyFlowing();
  },
  methods: {
    handleSearch(data) {
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      console.log(this.searchData);
      this.moneyFlowing();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.moneyFlowing();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.moneyFlowing();
    },
    // 资金流水
    async moneyFlowing() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        org_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await moneyFlowing(data);
      this.listLoading = false;
      this.listData = res.message.list;
      this.listTotal = res.message.total;
    },

    openRecharge() {
      // this.currentData = row;
      this.rechargeDialogVisible = true;
      console.log(this.currentData);
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
.college-student-search {
  display: flex;
  justify-content: space-between;
}
.institution-user-manage[data-v-491856be] {
  padding: 10px 20px 20px 0;
}
</style>
