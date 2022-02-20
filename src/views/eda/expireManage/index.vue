<template>
  <section>
    <div class="head_remind">*统一管理报名项目的到期时间</div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <el-tabs v-model="listType" @tab-click="getGradeList">
        <el-tab-pane label="全部" name="1"></el-tab-pane>
        <el-tab-pane label="未设置到期" name="2"></el-tab-pane>
        <el-tab-pane label="未来7天到期" name="3"></el-tab-pane>
        <el-tab-pane label="未来15天到期" name="4"></el-tab-pane>
        <el-tab-pane label="永久有效期" name="5"></el-tab-pane>
      </el-tabs>
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
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.surname }}
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
            prop="title"
            label="所属老师"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="项目名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="报读时间"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="到期日期"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_count"
            label="到期状态"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button type="text" @click="openSetDialog([row.id])"
                >设置到期</el-button
              >
              <el-button type="text">设置延期</el-button>
              <el-button type="text" @click="toOrderDetail(row.order_id)"
                >订单详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div>
            <el-button @click="openSetDialog(checkedIds)">设置到期</el-button>
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
    <SetExpireDialog
      v-model="dialogVisible"
      :ids="checkedIds"
      @success="getGradeList"
    />
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import SetExpireDialog from "./components/SetExpireDialog";
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils";
import { getGradeList } from "@/api/sou";
import { getAdminSelect, getproject } from "@/api/eda";
import { getCateList } from "@/api/sou";
export default {
  name: "expireManage",
  components: {
    SetExpireDialog,
    PartiallyHidden,
  },
  data() {
    return {
      listType: "1",
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        search_box: "",
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
          key: "admin_id",
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
          key: "course_category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "book_fee_status",
          type: "select",
          width: 110,
          options: [
            {
              value: 0,
              label: "未设置",
            },
            {
              value: 1,
              label: "未到期",
            },
            {
              value: 2,
              label: "已到期",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "到期状态",
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
      checkedIds: [],
    };
  },
  activated() {
    this.getGradeList();
  },
  created() {
    this.getGradeList();
    this.getAdminSelect();
    this.getCateList();
    this.getproject();
  },
  methods: {
    // 打开设置弹窗
    openSetDialog(ids) {
      if (!ids || !ids.length) {
        this.$message.warning("请先选择订单！");
        return;
      }
      console.log(ids);
      this.checkedIds = ids;
      this.dialogVisible = true;
    },
    handleSeletChange(selection) {
      this.checkedIds = selection.map((item) => item.order_id);
    },
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      this.getproject(id);
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取分类
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
    // 获取所属老师
    async getAdminSelect() {
      const res = await getAdminSelect();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getGradeList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getGradeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getGradeList();
    },
    async getGradeList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getGradeList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
.mainPart {
  padding: 20px;
}
.table_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

