<template>
  <div class="class-attendance-statistics">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
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
          prop="date"
          label="上课日期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week"
          label="星期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="period"
          label="上课时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teacher_name"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teaching_type"
          label="授课方式"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="排课属性"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="attendance_num"
          label="出勤人数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="absenteeism_num"
          label="缺勤人数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="rate"
          label="出勤率"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="{ row }">
            <div class="operation_btn">
              <el-button type="text">排课情况</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="classAttendanceStatistics"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { classAttendanceStatistics } from "@/api/eda";
export default {
  name: "classAttendanceStatistics",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        teacher_id: "",
        teaching_type: "",
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
          key: "teacher_id",
          type: "select",
          options: [],
          attrs: {
            placeholder: "上课老师",
            clearable: true,
          },
        },
        {
          key: "teaching_type",
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
    this.classAttendanceStatistics();
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
      this.classAttendanceStatistics();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.classAttendanceStatistics();
    },
    // 班级考勤列表
    async classAttendanceStatistics() {
      const data = {
        classroom_id: this.$route.query?.id,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await classAttendanceStatistics(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.class-attendance-statistics {
}
</style>