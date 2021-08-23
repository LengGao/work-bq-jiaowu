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
        height="550"
      >
        <el-table-column label="序号" width="60" type="index">
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
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.period.substr(11) }}</span>
          </template>
        </el-table-column>
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
        >
          <template slot-scope="{ row }">
            <span>{{ typeMap[row.teaching_type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="class_hour_total"
          label="课节数"
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
              <el-button
                type="text"
                @click="hanldeOpenDialog(row.id)"
                v-if="row.class_hour_total > 1"
                >排课详情</el-button
              >
              <el-button type="text" @click="toStatistics(row)" v-else
                >考勤统计</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <CourseListDialog v-model="dialogVisible" :id="dialogId" />
  </div>
</template>

<script>
import { classAttendanceStatistics, getTeacherList } from "@/api/eda";
import CourseListDialog from "./CourseListDialog";
export default {
  name: "classAttendanceStatistics",
  components: {
    CourseListDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      typeMap: {
        1: "面授",
        2: "直播",
      },
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
          optionValue: "teacher_id",
          optionLabel: "teacher_name",
          options: [],
          attrs: {
            placeholder: "上课老师",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "teaching_type",
          type: "select",
          options: [
            {
              label: "面授",
              value: 1,
            },
            {
              label: "直播",
              value: 2,
            },
          ],
          attrs: {
            placeholder: "授课方式",
            clearable: true,
          },
        },
        // {
        //   key: "432432",
        //   type: "select",
        //   options: [],
        //   attrs: {
        //     placeholder: "状态",
        //     clearable: true,
        //   },
        // },
      ],
      dialogVisible: false,
      dialogId: "",
    };
  },
  created() {
    this.classAttendanceStatistics();
    this.getTeacherList();
  },
  methods: {
    toStatistics(row) {
      this.$router.push({
        path: "/eda/attendanceStatistics",
        query: {
          class_hour_id: row.class_hour[0],
          arrange_id: row.id,
        },
      });
    },
    hanldeOpenDialog(id) {
      this.dialogId = id;
      this.dialogVisible = true;
    },
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
    handleSizeChange(size) {
      this.pageSize = size;
      this.classAttendanceStatistics();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.classAttendanceStatistics();
    },
    // 上课老师下拉
    async getTeacherList() {
      const data = {};
      const res = await getTeacherList(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    // 班级考勤列表
    async classAttendanceStatistics() {
      const data = {
        classroom_id: this.$route.query?.id,
        limit: this.pageSize,
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