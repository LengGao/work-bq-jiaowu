<template>
  <div class="attendance-statistics">
    <Title text="考勤统计" />
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <div class="card-list">
      <div class="card-item">
        <p>排课次数</p>
        <p class="number">100</p>
      </div>
      <div class="card-item">
        <p>出勤次数</p>
        <p class="number">100</p>
      </div>
      <div class="card-item">
        <p>缺勤次数</p>
        <p class="number">100</p>
      </div>
      <div class="card-item">
        <p>未点名次数</p>
        <p class="number">100</p>
      </div>
      <div class="card-item">
        <p>出勤率</p>
        <p class="number">100</p>
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
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="90"
          prop="classroom_id"
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="上课日期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="上课时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="授课方式"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="上课教室"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="考勤情况"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="getAttendanceList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAttendanceList } from "@/api/eda";
export default {
  name: "AttendanceStatistics",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        project_id: "",
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
          key: "project_id",
          type: "select",
          options: [],
          attrs: {
            placeholder: "授课方式",
            clearable: true,
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          attrs: {
            placeholder: "考勤情况",
            clearable: true,
          },
        },
      ],
    };
  },
  created() {
    this.getAttendanceList();
  },
  methods: {
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.getAttendanceList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getAttendanceList();
    },
    async getAttendanceList() {
      const data = {
        page: this.pageNum,
        uid: this.uid,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getAttendanceList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.attendance-statistics {
  .card-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 16px;
    .card-item {
      font-size: 14px;
      margin-left: 16px;
      padding: 10px;
      width: calc(100% / 5);
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      text-align: center;
      color: #606266;
      .number {
        font-weight: 550;
        font-size: 22px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>