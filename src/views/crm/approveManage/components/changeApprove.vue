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
        <el-table-column
          prop="contract_status"
          label="合同状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              v-if="row.order_id"
              size="small"
              :type="statusMap[row.contract_status || 0].type"
            >
              {{ statusMap[row.contract_status || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                @click="seebtn(row)"
                v-if="!row.contract_status && row.project_ids && !row.sign_url"
                >生成合同</el-button
              >
              <el-button
                type="text"
                @click="seeview(row)"
                v-if="row.sign_url && row.contract_status"
                >查看合同</el-button
              >
              <el-button
                type="text"
                @click="handleCopy(row.sign_url)"
                v-if="
                  row.sign_url &&
                  (row.contract_status === 2 || row.contract_status === 4)
                "
                >复制签名链接</el-button
              >
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
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts, today } from "@/utils/date";
import { getAdminSelect, getproject } from "@/api/eda";
import { getCateList } from "@/api/sou";
import { getOrderList } from "@/api/fina";
import { cloneOptions } from "@/utils/index";
import { templatelist } from "@/api/system";
import { generate } from "@/api/fina";
export default {
  name: "eduOrder",
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
        date: [today, today],
        keyword: "",
        project_id: "",
        category_id: "",
        staff_id: "",
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

      orderActionDialog: false,
      importDialog: false,
      dialogInfo: {},
      dialogType: 1,
      dictOptions: [],
      dialogVisible: false,
      viewcondialog: false,
      sign_url: "",
      templateId: "",
      orderId: "",
      contractLoading: false,
      statusMap: {
        0: {
          text: "未生成",
          type: "danger",
        },
        1: {
          text: "未审核",
          type: "primary",
        },
        2: {
          text: "已审核",
          type: "success",
        },
        3: {
          text: "已驳回",
          type: "warning",
        },
        4: {
          text: "签署完成",
          type: "success",
        },
      },
    };
  },
  created() {
    this.getOrderList();
    this.getCateList();
    this.getAdminSelect();
    this.getproject();
  },
  methods: {
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
    seeview(row) {
      this.viewcondialog = true;
      this.sign_url = row.sign_url;
    },
    seebtn(row) {
      this.templatelist();
      this.templateId = "";
      this.orderId = row.order_id;
      this.dialogVisible = true;
    },

    // 合同模板列表接口
    async templatelist() {
      const res = await templatelist();
      if (res.code == 0) {
        this.dictOptions = res.data.data;
        console.log(this.dictOptions);
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
        project_id: Array.isArray(data.project_id)
          ? data.project_id.join(",")
          : "",
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
      };
      this.listLoading = true;
      const res = await getOrderList(data).catch(() => {});
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
