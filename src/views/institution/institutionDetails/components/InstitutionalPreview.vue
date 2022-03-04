<template>
  <div class="institutional-collection">
    <section>
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <ul class="panel-list">
        <li class="panel-item">
          <span>机构人数</span>
          <div class="time_num">
            <span>{{ panelData.memNum || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>订单数</span>
          <div class="time_num">
            <span>{{ panelData.orderNum || 0 }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>订单总金额</span>
          <div class="time_num">
            <span>{{ panelData.orderMoney | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>已回款金额</span>
          <div class="time_num">
            <span>{{ panelData.paidMoney | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>未回款金额</span>
          <div class="time_num">
            <span>{{ panelData.unpaidMoney | moneyFormat }}</span>
          </div>
        </li>
        <li class="panel-item">
          <span>豁免金额</span>
          <div class="time_num">
            <span>{{ panelData.reductionMoney | moneyFormat }}</span>
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
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
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
            prop="sources"
            label="客户来源"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jiebie_name"
            label="届别名称"
            min-width="100"
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
              {{ row.order_money | moneyFormat }}
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_money"
            label="已回款金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.pay_money | moneyFormat }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="pay_progress"
            label="回款进度"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-progress
                :percentage="+(row.pay_progress || '').split('%')[0] || 0"
              ></el-progress>
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

          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toOrderDetail(row.order_id)"
                >订单详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="frame_bottom">
          <div class="frame_bottom_btn"></div>
          <div class="table_bottom">
            <page
              :data="listTotal"
              :curpage="pageNum"
              @pageChange="handlePageChange"
              @pageSizeChange="handleSizeChange"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import { getInstitutionOverviewList } from "@/api/institution";
import { getCateList, getGradeOptions } from "@/api/sou";
import { getproject } from "@/api/eda";
import { getStaffList } from "@/api/set";
import { getCustomfieldOptions } from "@/api/crm";
import { cloneOptions } from "@/utils/index";
export default {
  name: "InstitutionalPreview",
  data() {
    return {
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      listData: [],
      panelData: {
        memNum: "",
        orderNum: 0,
        orderMoney: "",
        paidMoney: "",
        reductionMoney: "",
        unpaidMoney: 0,
      },
      searchData: {
        date: "",
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
          key: "sources",
          type: "select",
          width: 140,
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
          key: "jiebie_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "category_name,title",
          attrs: {
            placeholder: "届别名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "staff_id",
          type: "select",
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          width: 220,
          attrs: {
            placeholder: "业绩归属",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
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
            placeholder: "支付状态",
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
            placeholder: "学生姓名/手机号码",
            clearable: true,
          },
        },
      ],
    };
  },
  created() {
    this.getInstitutionOverviewList();
    this.getproject();
    this.getCateList();
    this.getCustomfieldOptions();
    this.getGradeOptions();
    this.getStaffList();
  },
  methods: {
    // 业绩归属
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.searchOptions[5].options = res.data.list;
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.searchOptions[4].options = res.data;
      }
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取客户来源
    async getCustomfieldOptions() {
      const data = {
        field_name: "customer_source",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.coustomFrom = res.data.field_content;
        this.searchOptions[1].options = res.data.field_content.map((item) => ({
          title: item,
        }));
      }
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[2].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      const [start_date, end_date] = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_date,
        end_date,
      };
      this.getInstitutionOverviewList(data);
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getInstitutionOverviewList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getInstitutionOverviewList();
    },

    async getInstitutionOverviewList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        org_id: this.$route.query.institution_id,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
        sources: Array.isArray(this.searchData.sources)
          ? this.searchData.sources.join(",")
          : "",
        staff_id: Array.isArray(this.searchData.staff_id)
          ? this.searchData.staff_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getInstitutionOverviewList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.statistics || {};
    },
  },
};
</script>

<style lang="scss" scoped>
.institutional-collection {
  section {
    padding: 10px 16px 0 0;
    header {
      display: flex;
      justify-content: space-between;
      .actions {
        display: flex;
        button {
          align-self: flex-start;
          margin-left: 10px;
        }
      }
    }
  }
}

.panel-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
  .panel-item {
    width: calc(100% / 6);
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
.frame_bottom {
  display: flex;
  justify-content: space-between;
  .frame_bottom_btn {
    margin-top: 20px;
  }
}
</style>
