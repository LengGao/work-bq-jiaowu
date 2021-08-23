<template>
  <div class="review-statistics">
    <Title text="回顾统计" />
    <div class="card-list">
      <div class="card-item">
        <p>视频总数</p>
        <p class="number">{{ statisticsData.total_video_count || 0 }}</p>
      </div>
      <div class="card-item">
        <p>观看个数</p>
        <p class="number">{{ statisticsData.user_video_count || 0 }}</p>
      </div>
      <div class="card-item">
        <p>观看总时长</p>
        <p class="number">{{ statisticsData.total_duration || 0 }}</p>
      </div>
      <div class="card-item">
        <p>观看总进度</p>
        <p class="number">{{ statisticsData.progress || 0 }}</p>
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
        height="450"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="chapter_name"
          label="回顾章节名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="视频名称"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="开始加入时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="最后离开时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_second"
          label="观看时长"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="观看进度"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.progress || 0 }}%</span>
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
import {
  userCenterClassroomVideoList,
  userCenterClassroomVideoData,
} from "@/api/eda";
export default {
  name: "ReviewStatistics",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      statisticsData: {},
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
    };
  },
  created() {
    this.userCenterClassroomVideoList();
    this.userCenterClassroomVideoData();
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.userCenterClassroomVideoList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.userCenterClassroomVideoList();
    },
    async userCenterClassroomVideoData() {
      const data = {
        uid: this.uid,
      };
      const res = await userCenterClassroomVideoData(data);
      if (res.code === 0) {
        this.statisticsData = res.data;
      }
    },
    async userCenterClassroomVideoList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await userCenterClassroomVideoList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.review-statistics {
  .card-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 16px;
    .card-item {
      font-size: 14px;
      margin-left: 16px;
      padding: 16px;
      width: calc(100% / 4);
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      color: #606266;
      .number {
        margin-top: 20px;
        font-weight: 550;
        font-size: 34px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>