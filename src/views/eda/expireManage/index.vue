<template>
  <section>
    <div class="head_remind">
      *设置到期后，将于次日凌晨2点统一定时关闭对应的课程，用户将不能通过东培学堂访问该课程。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <el-tabs v-model="listType" @tab-click="getProjectUserList">
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
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="user_realname"
            label="学生姓名"
            min-width="90"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.aid"
                type="text"
                @click="toStudentDetail(row.uid)"
              >
                {{ row.user_realname }}
              </el-button>
              <span v-else> {{ row.user_realname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="130"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.telphone" />
            </template>
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="报读时间"
            align="center"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="expire_time"
            label="到期日期"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="到期状态"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" :type="statusMap[row.status]">{{
                row.status_name
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="openSetDialog(false, row.id)"
                >设置日期</el-button
              >
              <el-button
                v-if="row.aid"
                type="text"
                @click="toOrderDetail(row.order_id)"
                >订单详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div>
            <el-button @click="openSetDialog(true)">设置到期</el-button>
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
      @success="getProjectUserList"
    />
  </section>
</template>

<script>
import SetExpireDialog from "./components/SetExpireDialog";
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils";
import { getProjectUserList } from "@/api/eda";
import { getAdminSelect, getproject } from "@/api/eda";
import { getCateList } from "@/api/sou";
export default {
  name: "expireManage",
  components: {
    SetExpireDialog,
  },
  data() {
    return {
      statusMap: {
        1: "info",
        2: "success",
        3: "danger",
      },
      listType: "1",
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        search_box: "",
        admin_id: "",
        category_id: "",
        project_id: "",
        status: "",
        date: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "报读开始日期",
            "end-placeholder": "报读结束日期",
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
          key: "category_id",
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
          key: "status",
          type: "select",
          width: 110,
          options: [
            {
              value: 1,
              label: "未设置",
            },
            {
              value: 2,
              label: "未到期",
            },
            {
              value: 3,
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
      selection: [],
    };
  },
  activated() {
    this.getProjectUserList();
  },
  created() {
    this.getProjectUserList();
    this.getAdminSelect();
    this.getCateList();
    this.getproject();
  },
  methods: {
    // 打开设置弹窗
    openSetDialog(isBatch, id) {
      if (isBatch && !this.selection.length) {
        this.$message.warning("请先选择订单！");
        return;
      }
      this.checkedIds = isBatch ? this.selection.map((item) => item.id) : [id];
      this.dialogVisible = true;
    },
    handleSeletChange(selection) {
      this.selection = selection || [];
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
      const [start_time, end_time] = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time,
        end_time,
        category_id: data.category_id ? [...data.category_id].pop() : "",
      };
      this.getProjectUserList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getProjectUserList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectUserList();
    },
    async getProjectUserList() {
      this.selection = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        type: this.listType,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getProjectUserList(data);
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

