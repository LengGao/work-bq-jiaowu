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
        <p class="number">{{ statisticsData.total }}</p>
      </div>
      <div class="card-item">
        <p>出勤次数</p>
        <p class="number">{{ statisticsData.attendance_num }}</p>
      </div>
      <div class="card-item">
        <p>缺勤次数</p>
        <p class="number">{{ statisticsData.absenteeism_num }}</p>
      </div>
      <div class="card-item">
        <p>未点名次数</p>
        <p class="number">{{ statisticsData.not_named_num }}</p>
      </div>
      <div class="card-item">
        <p>出勤率</p>
        <p class="number">{{ statisticsData.rate }}</p>
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
        height="400"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="90"
          prop="id"
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
          prop="start_time"
          label="上课时间"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.start_time + " ~ " + row.end_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="授课方式"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ typeMap[row.teaching_type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="schoolroom_name"
          label="上课教室"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="考勤情况"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span :style="{ color: signTypeMap[row.sign_type].color }">{{
              signTypeMap[row.sign_type].text
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          @pageSizeChange="handleSizeChange"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAttendanceList, personalAttendanceSummary } from "@/api/eda";
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
      typeMap: {
        1: "面授",
        2: "直播",
      },
      signTypeMap: {
        0: {
          text: "未点名",
          color: "#FEA86F",
        },
        1: {
          text: "缺勤",
          color: "#FD6500",
        },
        2: {
          text: "出勤",
          color: "#5FD826",
        },
      },
      statisticsData: {},
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        date: "",
        teaching_type: "",
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
        //   key: "project_id",
        //   type: "select",
        //   options: [],
        //   attrs: {
        //     placeholder: "考勤情况",
        //     clearable: true,
        //   },
        // },
      ],
    };
  },
  created() {
    this.getAttendanceList();
    this.personalAttendanceSummary();
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
      this.personalAttendanceSummary();
      this.getAttendanceList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getAttendanceList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getAttendanceList();
    },
    async personalAttendanceSummary() {
      const data = {
        uid: this.uid,
        ...this.searchData,
        teaching_type: this.searchData.teaching_type || 0,
      };
      const res = await personalAttendanceSummary(data);
      if (res.code === 0) {
        this.statisticsData = res.data;
      }
    },
    async getAttendanceList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        uid: this.uid,
        ...this.searchData,
        teaching_type: this.searchData.teaching_type || 0,
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