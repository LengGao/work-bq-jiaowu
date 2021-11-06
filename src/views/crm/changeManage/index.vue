<template>
  <div class="change-manage">
    <div class="head_remind">*管理查看客户退课退款或者更换项目的审批进度</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="handleAdd">添加异动</el-button>
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
            label="异动编号"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="title"
          >
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="关联订单"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="异动类型"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="异动金额"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="备注信息"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="审批状态"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toChangeDetail(row)"
                >异动详情</el-button
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
    <AddChange v-model="dialogVisible" @on-success="getClassTypeList" />
  </div>
</template>

<script>
import { getClassTypeList } from "@/api/institution";
import { getShortcuts } from "@/utils/date";
import AddChange from "./components/AddChange.vue";
export default {
  name: "performanceTargets",
  components: {
    AddChange,
  },
  data() {
    return {
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
          key: "pay_type",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "仅退款",
            },
            {
              value: 2,
              label: "退课退款",
            },
            {
              value: 3,
              label: "更换项目",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "审批状态",
          },
        },
        {
          key: "pay_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "已通过",
            },
            {
              value: 2,
              label: "待审批",
            },
            {
              value: 3,
              label: "已驳回",
            },
            {
              value: 4,
              label: "已撤销",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "审批状态",
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "异动编号、订单名称",
          },
        },
      ],
      dialogVisible: false,
    };
  },

  created() {
    this.getClassTypeList();
  },
  methods: {
    toChangeDetail() {
      this.$router.push({ name: "changeDetail" });
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassTypeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassTypeList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getClassTypeList();
    },
    async getClassTypeList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
      };
      this.listLoading = true;
      const res = await getClassTypeList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
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
.container {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
