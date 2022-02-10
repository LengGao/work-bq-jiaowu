<template>
  <section>
    <div class="head_remind">*管理审批学籍异动管理</div>
    <div class="mainPart">
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
            prop="user_realname"
            label="学生姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.user_realname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.telphone" />
            </template>
          </el-table-column>
          <el-table-column
            prop="jiebie_name"
            label="届别名称"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type_name"
            label="异动类型"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="apply_time"
            label="申请时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="apply_reason"
            label="申请原因"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="办理状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag :type="statusMap[row.status]" size="small">{{
                row.status_name
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="origin_major_name"
            label="原专业"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="new_major_name"
            label="新专业"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="transact_time"
            label="办理日期"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approve_time"
            label="审批日期"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注信息"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                v-if="row.status === 1"
                @click="openHanldeDialog(row.id)"
                >提交办理</el-button
              >
              <el-button
                type="text"
                v-if="row.status === 2"
                @click="openApproveDialog(row.id)"
                >学校审批</el-button
              >
              <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
                >订单详情</el-button
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
    </div>
    <SubmitHandle
      v-model="dialogVisible"
      :id="currentId"
      @success="getTransactionList"
    />
    <SchoolApproval
      v-model="dialogApproveVisible"
      :id="currentId"
      @success="getTransactionList"
    />
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import SubmitHandle from "./components/SubmitHandle";
import SchoolApproval from "./components/SchoolApproval";
import { getTransactionList, getGradeOptions } from "@/api/sou";
export default {
  name: "studentStatusChangeList",
  components: {
    SubmitHandle,
    SchoolApproval,
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        date: "",
        search_box: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "申请开始日期",
            "end-placeholder": "申请结束日期",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "jiebie_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "届别名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "type",
          type: "select",
          width: 110,
          options: [
            {
              value: 1,
              label: "休学",
            },
            {
              value: 2,
              label: "退学",
            },
            {
              value: 3,
              label: "复学",
            },
            {
              value: 4,
              label: "转专业",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "异动类型",
          },
        },
        {
          key: "status",
          type: "select",
          width: 110,
          options: [
            {
              value: 1,
              label: "待办理",
            },
            {
              value: 2,
              label: "办理中",
            },
            {
              value: 3,
              label: "已通过",
            },
            {
              value: 4,
              label: "不通过",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "办理状态",
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      dialogVisible: false,
      currentId: "",
      dialogApproveVisible: false,
      statusMap: {
        1: "info",
        2: "warning",
        3: "success",
        4: "danger",
      },
    };
  },
  created() {
    this.getTransactionList();
    this.getGradeOptions();
  },
  methods: {
    // 学校审批
    openApproveDialog(id) {
      this.currentId = id;
      this.dialogApproveVisible = true;
    },
    // 提交办理
    openHanldeDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
          isFromList: 1,
        },
      });
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      const { date, ...params } = data;
      const [apply_time_start, apply_time_end] = date || ["", ""];
      this.searchData = {
        ...params,
        apply_time_start,
        apply_time_end,
      };
      this.getTransactionList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getTransactionList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getTransactionList();
    },
    async getTransactionList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getTransactionList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
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
}
</style>

