<template>
  <div class="playback-statistics">
    <div class="course-info">
      <div class="course-info-item">
        <span class="name">课程名称</span>
        <span class="value">{{ $route.query.course_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">课时名称</span>
        <span class="value">{{ $route.query.title }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">课时时长</span>
        <span class="value">{{ $route.query.duration }}</span>
      </div>
    </div>
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
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="uid"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="uid"
        >
        </el-table-column>
        <el-table-column
          prop="user_realname"
          label="学生姓名"
          min-width="160"
          align="center"
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
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.telphone" />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="最早加入时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="最后离开时间"
          align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="period"
          label="观看周期"
          align="center"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_second"
          label="观看时长"
          align="center"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="观看进度"
          align="center"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.progress }}%</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div>
          <el-button :loading="exportLoading" @click="exportData"
            >导出数据</el-button
          >
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  courseVideoStatisticsList,
  exportCourseVideoStatistics,
} from "@/api/sou";
export default {
  name: "videoPlayStatistics",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        search_box: "",
        progress_status: "",
      },
      searchOptions: [
        {
          key: "progress_status",
          type: "select",
          options: [
            { label: "已完成", value: 1 },
            { label: "未完成", value: 2 },
          ],
          attrs: {
            placeholder: "观看状态",
            clearable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      exportLoading: false,
    };
  },

  created() {
    this.courseVideoStatisticsList();
  },
  methods: {
    async exportData() {
      this.exportLoading = true;
      const data = {
        id: this.$route.query.id,
      };
      const res = await exportCourseVideoStatistics(data).catch(() => {
        this.exportLoading = false;
      });
      if (res.code === 0) {
        this.exportLoading = false;
        this.$message.success(res.message);
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.courseVideoStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.courseVideoStatisticsList();
    },

    async courseVideoStatisticsList() {
      const data = {
        page: this.pageNum,
        id: this.$route.query.id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await courseVideoStatisticsList(data);
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
.playback-statistics {
  padding: 20px;
}
.table_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.course-info {
  display: flex;
  align-items: center;
  &-item {
    margin-right: 30px;
    padding: 16px 0;
    .name {
      color: #909399;
      margin-right: 8px;
    }
    .value {
      color: #333;
    }
  }
}
</style>
