<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
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
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="编号" width="50" type="index">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="follow_user_name"
            label="待办类型"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="state_rate"
            label="待办事项"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="账号身份"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="跟进人员"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="跟进状态"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="跟进时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">查看详情</el-button>
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
  </div>
</template>

<script>
import { getReturnVisit } from "@/api/eda";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        staff_name: "",
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
          },
        },
        {
          key: "staff_name",
          type: "select",
          options: [
            {
              label: "待跟进",
              value: 1,
            },
            {
              label: "待收款",
              value: 2,
            },
            {
              label: "待跟班",
              value: 3,
            },
            {
              label: "待回访",
              value: 4,
            },
            {
              label: "待入账",
              value: 5,
            },
            {
              label: "待退款",
              value: 6,
            },
            {
              label: "待作废",
              value: 7,
            },
          ],
          attrs: {
            placeholder: "待办类型",
          },
        },
        {
          key: "staff_name",
          type: "select",
          options: [
            {
              label: "招生",
              value: 1,
            },
            {
              label: "教务",
              value: 2,
            },
            {
              label: "财务",
              value: 3,
            },
          ],
          attrs: {
            placeholder: "账号身份",
          },
        },
        {
          key: "staff_name",
          type: "select",
          options: [
            {
              label: "未开始",
              value: 1,
            },
            {
              label: "进行中",
              value: 2,
            },
            {
              label: "已完成",
              value: 3,
            },
          ],
          attrs: {
            placeholder: "跟进状态",
          },
        },
        {
          key: "staff_name",
          attrs: {
            placeholder: "跟进员工，待办内容",
          },
        },
      ],
    };
  },

  created() {
    this.getReturnVisit();
  },

  methods: {
    handleSearch(data) {
      const times = data.date || ["", ""];
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.getReturnVisit();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReturnVisit();
    },
    async getReturnVisit() {
      const data = {
        class_id: 67,
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getReturnVisit(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
