<template>
  <div class="course-student-list">
    <div class="course-info">
      <div class="course-info-item">
        <span class="name">课程名称</span>
        <span class="value">{{ courseData.course_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">所属分类</span>
        <span class="value">{{ courseData.cate_name }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">总时长</span>
        <span class="value">{{ courseData.total_duration }}</span>
      </div>
      <div class="course-info-item">
        <span class="name">购买人数</span>
        <span class="value">{{ courseData.user_count }}</span>
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
          prop="progress"
          label="完成状态"
          align="center"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" v-if="row.progress === 100" type="success"
              >已完成</el-tag
            >
            <el-tag size="small" v-else type="danger">未完成</el-tag>
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
              >章节详情</el-button
            >
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
  </div>
</template>

<script>
import {
  courseUserVideoStatisticsList,
  courseUserVideoStatisticsData,
} from "@/api/sou";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "courseStudent",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
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
      courseData: {},
    };
  },

  created() {
    this.courseUserVideoStatisticsList();
    this.courseUserVideoStatisticsData();
  },
  methods: {
    toChapter(row) {
      this.$router.push({
        name: "studentChapter",
        query: {
          uid: row.uid,
          course_id: this.$route.query.course_id,
        },
      });
    },
    async courseUserVideoStatisticsData() {
      const data = {
        course_id: this.$route.query.course_id,
      };
      const res = await courseUserVideoStatisticsData(data);
      if (res.code === 0) {
        this.courseData = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.courseUserVideoStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.courseUserVideoStatisticsList();
    },

    async courseUserVideoStatisticsList() {
      const data = {
        page: this.pageNum,
        course_id: this.$route.query.course_id,
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
.course-student-list {
  padding: 20px;
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
      color: #666;
    }
  }
}
</style>
