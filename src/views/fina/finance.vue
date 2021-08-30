<template>
  <section>
    <div class="head_remind">
      *学生报名缴费后会自动产生缴费记录、欠费记录（如有欠费）等。
    </div>
    <div class="mainPart">
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
                (
                  panelData.order_money -
                    panelData.reduction -
                    panelData.overdue_money -
                    panelData.refund_money || 0
                ).toFixed(2)
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
            min-width="190"
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
            prop="from_institution_name"
            label="推荐机构"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_money"
            label="应收金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              ￥{{ (row.order_money - row.reduction).toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_money"
            label="实收金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>￥{{ row.pay_money }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="overdue_money"
            label="欠交金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span style="color: #f76c6c">￥{{ row.overdue_money }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_type"
            label="支付方式"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="pay_status"
            label="订单状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" :type="row.pay_status | orderTagType">{{
                row.pay_status | orderStatus
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="140">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  v-if="excludes(row, 0)"
                  @click="openOrderActions(row, 1)"
                  >收款</el-button
                >
                <!-- <el-button
                  type="text"
                  v-if="excludes(row, 4)"
                  @click="openOrderActions(row, 2)"
                  >退款</el-button
                > -->
                <el-button
                  type="text"
                  v-if="excludes(row, 5)"
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
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts, toDay } from "@/utils/date";
import { getAdminSelect, getproject } from "@/api/eda";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { getOrderList } from "@/api/fina";
import { cloneOptions } from "@/utils/index";
import ImportOrder from "./components/ImportOrder";
import CollectionOrder from "./components/CollectionOrder";
export default {
  name: "finance",
  components: {
    ImportOrder,
    CollectionOrder,
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: [toDay(), toDay()],
        keyword: "",
        from_org: "",
        project_id: "",
        category_id: "",
        staff_id: "",
        pay_type: "",
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
          key: "from_org",
          type: "cascader",
          width: 120,
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
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
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
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
          key: "pay_type",
          type: "select",
          width: 120,
          options: [
            {
              value: "现金",
              label: "现金",
            },
            {
              value: "微信",
              label: "微信",
            },
            {
              value: "支付宝",
              label: "支付宝",
            },
            {
              value: "聚合收单",
              label: "聚合收单",
            },
            {
              value: "银行转账",
              label: "银行转账",
            },
            {
              value: "收钱吧",
              label: "收钱吧",
            },
            {
              value: "机构签约订单",
              label: "机构签约订单",
            },
            {
              value: "pos机",
              label: "pos机",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "支付方式",
          },
        },
        {
          key: "pay_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "未付款",
            },
            {
              value: 1,
              label: "新订单",
            },
            {
              value: 2,
              label: "部分付款",
            },
            {
              value: 3,
              label: "已付款",
            },
            {
              value: 4,
              label: "已作废",
            },
            {
              value: 5,
              label: "已退款",
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
      activeIndex: 0,
      panelData: {
        total: "",
        order_money: 0,
        pay_money: "",
        overdue_money: "",
        money: "",
        reduction: 0,
      },
      tabFun: [
        {
          name: "全部订单",
          status: "",
        },
        {
          name: "未付款",
          status: 0,
        },
        {
          name: "新订单",
          status: 1,
        },
        {
          name: "已付款",
          status: 3,
        },
        {
          name: "部分付款",
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
    this.getCateList();
    this.getInstitutionSelectData();
    this.getAdminSelect();
    this.getproject();
  },
  methods: {
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[3].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },

    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
      }
    },
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

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: Array.isArray(data.category_id)
          ? data.category_id.join(",")
          : "",
        from_org: Array.isArray(data.from_org) ? data.from_org.pop() : "",
      };
      this.getOrderList(data);
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrderList();
    },
    async getOrderList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getOrderList(data);
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
    orderDetail(ab) {
      this.$router.push({
        name: "orderdetail",
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
.table_bottom {
  text-align: right;
}
</style>
