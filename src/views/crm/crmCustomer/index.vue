<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常客户数据的跟进管理。
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
          <el-button type="primary" @click="dialogVisible = true"
            >添加客户</el-button
          >
        </div>
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
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            v-if="checkHeader.includes('ID')"
            prop="order_id"
            label="ID"
            show-overflow-tooltip
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="客户姓名"
            min-width="90"
            show-overflow-tooltip
            v-if="checkHeader.includes('客户姓名')"
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
            v-if="checkHeader.includes('手机号码')"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.mobile" />
            </template>
          </el-table-column>
          <el-table-column
            prop="from_institution_name"
            label="客户来源"
            v-if="checkHeader.includes('客户来源')"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="100"
            v-if="checkHeader.includes('所属老师')"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="客户属性"
            min-width="180"
            v-if="checkHeader.includes('客户属性')"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="pay_money"
            label="成交状态"
            min-width="90"
            v-if="checkHeader.includes('成交状态')"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>￥{{ row.pay_money }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="overdue_money"
            label="客户标签"
            v-if="checkHeader.includes('客户标签')"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span style="color: #f76c6c">￥{{ row.overdue_money }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_type"
            v-if="checkHeader.includes('最后跟进时间')"
            label="最后跟进时间"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="pay_type"
            label="创建时间"
            v-if="checkHeader.includes('创建时间')"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column fixed="right" min-width="160">
            <template slot="header" slot-scope="scope">
              <div class="action-header">
                <span>操作</span>
                <el-popover
                  popper-class="setting"
                  placement="bottom"
                  width="160"
                  trigger="click"
                >
                  <el-checkbox-group v-model="checkHeader">
                    <el-checkbox
                      :label="item"
                      v-for="(item, index) in tableHeader"
                      :key="index"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <el-button
                    slot="reference"
                    class="icon-setting"
                    icon="el-icon-setting"
                    type="text"
                    title="设置表头"
                  ></el-button>
                </el-popover>
              </div>
            </template>
            <template slot-scope="{ row }">
              <el-button type="text" @click="signUpVisible = true"
                >报名</el-button
              >
              <el-button type="text">客户详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div>
            <el-button>变更所属老师</el-button>
            <el-button>迁移到公海</el-button>
          </div>
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </div>
    <AddCustomeDialog
      v-model="dialogVisible"
      @on-success="onAddCustomeSuccess"
    />
    <CustomeSignUp
      v-model="signUpVisible"
      :user-info="checkedUser"
      @on-success="getOrderList"
    />
  </section>
</template>

<script>
import AddCustomeDialog from "./components/AddCustomeDialog";
import CustomeSignUp from "./components/CustomeSignUp";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import { getAdminSelect } from "@/api/eda";
import { getOrderList } from "@/api/fina";
export default {
  name: "eduOrder",
  components: {
    PartiallyHidden,
    AddCustomeDialog,
    CustomeSignUp,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      tableHeader: [
        "ID",
        "客户姓名",
        "手机号码",
        "客户来源",
        "所属老师",
        "客户属性",
        "成交状态",
        "客户标签",
        "最后跟进时间",
        "创建时间",
      ],
      checkHeader: [
        "ID",
        "客户姓名",
        "手机号码",
        "客户来源",
        "所属老师",
        "客户属性",
        "成交状态",
        "客户标签",
        "最后跟进时间",
        "创建时间",
      ],
      searchData: {
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
          key: "staff_id",
          type: "select",
          width: 140,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "客户来源",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 140,
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
          key: "pay_status",
          type: "select",
          width: 140,
          options: [
            {
              value: 0,
              label: "我的客户",
            },
            {
              value: 1,
              label: "共享客户",
            },
          ],
          attrs: {
            filterable: true,
            clearable: true,
            placeholder: "客户属性",
          },
        },
        {
          key: "pay_status",
          type: "select",
          width: 140,
          options: [
            {
              value: 0,
              label: "未成交",
            },
            {
              value: 1,
              label: "已成交",
            },
          ],
          attrs: {
            filterable: true,
            clearable: true,
            placeholder: "成交状态",
          },
        },
        {
          key: "pay_status1",
          type: "select",
          options: [
            {
              value: 0,
              label: "标签1",
            },
            {
              value: 1,
              label: "标签2",
            },
          ],
          attrs: {
            filterable: true,
            clearable: true,
            placeholder: "客户标签",
            multiple: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      dialogVisible: false,
      signUpVisible: false,
      checkedUser: {},
    };
  },
  created() {
    this.getOrderList();
    this.getAdminSelect();
  },
  methods: {
    onAddCustomeSuccess(isSignUp, userInfo) {
      if (isSignUp) {
        this.checkedUser = userInfo;
        this.signUpVisible = true;
      }
      this.getOrderList();
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
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
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
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
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
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
.action-header {
  .icon-setting {
    margin-left: auto;
    font-size: 20px;
  }
  & > span {
    margin-left: auto;
  }
  display: flex;
  align-items: center;
  justify-content: center;
}
.table_bottom {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="less">
.setting {
  padding: 10px 0;
  .el-checkbox-group {
    .el-checkbox {
      width: 100%;
      margin-right: 0;
      padding: 5px 10px;
      &:hover {
        background-color: #ecf5ff;
      }
    }
  }
}
</style>
