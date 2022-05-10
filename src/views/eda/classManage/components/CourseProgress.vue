<template>
  <div class="course-student-list">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <el-button type="primary" :loading="exportLoading" @click="exportData"
          >导出数据</el-button
        >
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
          label="id"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="id"
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
          prop="first_time"
          label="首次学习时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="last_time"
          label="最后学习时间"
          align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="duration"
          label="学习时长"
          align="center"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="finish_lesson_count"
          label="完成课时"
          align="center"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="学习进度"
          align="center"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.progress }}%</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="toChapter(scope.row)"
              >学习详情</el-button
            >
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
  </div>
</template>

<script>
import {
  courseUserVideoStatisticsList,
  exportCourseUserVideoStatisticsList,
} from "@/api/eda";
export default {
  name: "studentList",
  props: {
    classData: {
      type: Object,
      default: () => ({}),
    },
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
    this.courseUserVideoStatisticsList();
  },
  methods: {
    async exportData() {
      this.exportLoading = true;
      const data = {
        class_id: this.$route.query.id,
        course_id: this.classData.course_id,
      };
      const res = await exportCourseUserVideoStatisticsList(data).catch(() => {
        this.exportLoading = false;
      });
      if (res.code === 0) {
        this.exportLoading = false;
        this.$message.success(res.message);
      }
    },
    toChapter(row) {
      this.$router.push({
        name: "studentChapter",
        query: {
          uid: row.uid,
          course_id: this.classData.course_id,
        },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.courseUserVideoStatisticsList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.courseUserVideoStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.courseUserVideoStatisticsList();
    },

    async courseUserVideoStatisticsList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        class_id: this.$route.query.id,
        course_id: this.classData.course_id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await courseUserVideoStatisticsList(data);
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

.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
