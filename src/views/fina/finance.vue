<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <div class="mainPart">
      <ul class="customer_navigation">
        <li
          v-for="(item, index) in tabFun"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="statusSwitch(index, item.status)"
        >
          {{ item.name }}
        </li>
      </ul>
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openImport" style="height: 40px">
            导入订单</el-button
          >
          <!-- <el-button type="primary" style="height: 40px"> 导出</el-button> -->
        </div>
      </header>
      <ul class="panel-list">
        <li class="panel-item">
          <span>订单总价</span>
          <div class="time_num">
            <span>￥{{ panelData.order_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>应收金额</span>
          <div class="time_num">
            <span
              >￥{{
                (panelData.order_money - panelData.reduction).toFixed(2)
              }}</span
            >
          </div>
        </li>
        <li class="panel-item">
          <span>实收金额</span>
          <div class="time_num">
            <span>￥{{ panelData.pay_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>欠费金额</span>
          <div class="time_num">
            <span>￥{{ panelData.overdue_money || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>退费金额</span>
          <div class="time_num">
            <span>￥{{ panelData.refund_money || 0 }}</span>
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
          <!-- <el-table-column type="selection" width="45"> </el-table-column> -->
          <el-table-column
            prop="order_id"
            label="订单编号"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">
              <div class="link" @click="orderDetail(scope.row)">
                {{ scope.row.order_no }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学员姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="link" @click="coursDetail(scope.row.uid)">
                {{ scope.row.surname }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="order_money"
            label="订单总价"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="reduction"
            label="优惠金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="order_money"
            label="应收金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ (row.order_money - row.reduction).toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_money"
            label="实收金额"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="overdue_money"
            label="欠交金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span style="color: #f76c6c">{{ row.overdue_money }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_status"
            label="订单状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ statusMap[row.pay_status] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  v-if="excludes(row, 0)"
                  @click="openOrderActions(row, 1)"
                  >收款</el-button
                >
                <el-button
                  type="text"
                  v-if="excludes(row, 5)"
                  @click="openOrderActions(row, 2)"
                  >退款</el-button
                >
                <el-button
                  type="text"
                  v-if="excludes(row, 4)"
                  @click="openOrderActions(row, 3)"
                  >作废</el-button
                >
              </div>
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
    </div>
    <ImportOrder v-model="importDialog" @on-success="getOrderList" />
    <CollectionOrder
      v-model="orderActionDialog"
      :type="dialogType"
      :orderInfo="dialogInfo"
      @on-success="getOrderList"
    />
  </section>
</template>

<script>
import { getOrderList } from "@/api/fina";
import ImportOrder from "./components/ImportOrder";
import CollectionOrder from "./components/CollectionOrder";
export default {
  name: "finance",
  components: {
    ImportOrder,
    CollectionOrder,
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
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      activeIndex: 0,
      activeStatus: "",
      panelData: {
        total: "",
        order_money: 0,
        pay_money: "",
        overdue_money: "",
        money: "",
        reduction: 0,
      },
      statusMap: {
        0: "待付款",
        1: "已付款",
        2: "部分入账",
        3: "已入账",
        4: "已作废",
        5: "已退款",
      },
      tabFun: [
        {
          name: "全部订单",
          status: "",
        },
        {
          name: "已付款",
          status: 1,
        },
        {
          name: "已入账",
          status: 3,
        },
        {
          name: "部分入账",
          status: 2,
        },
        {
          name: "已作废",
          status: 4,
        },
        {
          name: "已退款",
          status: 5,
        },
      ],
      orderActionDialog: false,
      importDialog: false,
      dialogInfo: {},
      dialogType: 1,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 按钮操作
    excludes(row, type) {
      const auth = {
        0: row.overdue_money > 0, // 收款
        4: ![4, 5].includes(row.pay_status) && row.pay_money > 0, // 退款
        5: ![4, 5].includes(row.pay_status), // 作废
      };
      return auth[type];
    },
    openOrderActions(row, type) {
      this.dialogType = type;
      this.dialogInfo = row;
      this.orderActionDialog = true;
    },
    openImport() {
      this.importDialog = true;
    },
    statusSwitch(index, status) {
      this.activeIndex = index;
      this.activeStatus = status;
      this.getOrderList();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        date: data.date ? data.date.join(" - ") : "",
      };
      this.getOrderList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrderList();
    },
    async getOrderList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        pay_status: this.activeStatus,
      };
      this.listLoading = true;
      const res = await getOrderList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.count[0] || {};
    },
    coursDetail(uid) {
      this.$router.push({
        path: "/fina/cusdetail",
        query: {
          uid,
        },
      });
    },
    orderDetail(ab) {
      this.$router.push({
        path: "/fina/orderDetail",
        query: {
          order_id: ab.order_id,
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
    width: calc(100% / 5);
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
</style>
