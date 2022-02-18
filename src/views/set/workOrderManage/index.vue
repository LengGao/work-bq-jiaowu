<template>
  <section>
    <div class="head_remind">*查看处理日常工作指派的任务和需求</div>
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
            >提交工单</el-button
          >
        </div>
      </header>
      <!--列表-->
      <div class="userTable">
        <el-tabs v-model="listType" @tab-click="getWorkorderList">
          <el-tab-pane label="全部工单" name="1"></el-tab-pane>
          <el-tab-pane label="我提交的" name="2"></el-tab-pane>
          <el-tab-pane label="我处理的" name="3"></el-tab-pane>
        </el-tabs>
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
            prop="id"
            label="ID"
            show-overflow-tooltip
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="工单标题"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="submitter_name"
            label="提交人"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="submit_time"
            label="提交时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="last_handler_name"
            label="处理人"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="last_handle_time"
            label="最后处理时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="total_consuming_time"
            label="工单耗时"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="工单状态"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" :type="statusMap[row.status]">{{
                row.status_name
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="120">
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetail(row.id)">详情</el-button>
              <el-button
                type="text"
                v-if="row.status === 1"
                @click="delConfirm(row.id)"
                >删除</el-button
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
    <AddWorkOrder v-model="dialogVisible" @success="getWorkorderList" />
  </section>
</template>

<script>
import AddWorkOrder from "./components/AddWorkOrder";
import { getWorkorderList, deleteWorkorder } from "@/api/set";
import { getShortcuts } from "@/utils/date";
export default {
  name: "workOrderManage",
  components: {
    AddWorkOrder,
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
          key: "status",
          type: "select",
          options: [
            {
              value: 1,
              label: "待处理",
            },
            {
              value: 2,
              label: "处理中",
            },
            {
              value: 3,
              label: "待客户反馈",
            },
            {
              value: 4,
              label: "待关闭",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "工单状态",
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "工单标题",
          },
        },
      ],
      dialogVisible: false,
      statusMap: {
        1: "info",
        2: "warning",
        3: "danger",
        4: "success",
      },
    };
  },
  activated() {
    this.getWorkorderList();
  },
  created() {
    this.getWorkorderList();
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: "workOrderDetail",
        query: { id },
      });
    },
    // 删除
    delConfirm(id) {
      this.$confirm("确定要删除该工单吗？", "提醒", {
        type: "warning",
      })
        .then(() => {
          this.deleteWorkorder(id);
        })
        .catch(() => {});
    },
    async deleteWorkorder(id) {
      const data = { id };
      const res = await deleteWorkorder(data);
      if (res.code === 0) {
        this.getWorkorderList();
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
      };
      this.getWorkorderList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getWorkorderList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getWorkorderList();
    },
    async getWorkorderList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        type: this.listType,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getWorkorderList(data);
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
</style>

