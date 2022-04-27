<template>
  <div class="face-to-face-appointment">
    <Title text="面授约课" />
    <div class="card-list">
      <div class="card-item">
        <p>面授课次数</p>
        <p class="number">{{ statisticsData.total_num || 0 }}</p>
      </div>
      <div class="card-item">
        <p>完成次数</p>
        <p class="number">{{ statisticsData.completions_num || 0 }}</p>
      </div>
      <div class="card-item">
        <p>失约次数</p>
        <p class="number">{{ statisticsData.missed_num || 0 }}</p>
      </div>
      <div class="card-item">
        <p>到课率</p>
        <p class="number">
          {{ statisticsData.attendance_rate || 0
          }}<span style="font-size: 18px">%</span>
        </p>
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
        <!-- <el-table-column label="ID" show-overflow-tooltip width="90" prop="id">
        </el-table-column> -->
        <el-table-column
          prop="subscribe_classroom_name"
          label="面授课名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="chapter_name"
          label="课程内容"
          min-width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="任课老师"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specific_time_range"
          label="上课时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="上课地点"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status_name"
          label="完成状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" :type="statusMap[row.status_name]">{{
              row.status_name
            }}</el-tag>
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
import { FaceToFaceLesson } from "@/api/eda";
export default {
  name: "FaceToFaceAppointment",
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
      statusMap: {
        已签到: "success",
        已取消: "info",
        已失约: "danger",
      },
    };
  },
  created() {
    this.FaceToFaceLesson();
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.FaceToFaceLesson();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.FaceToFaceLesson();
    },
    async FaceToFaceLesson() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await FaceToFaceLesson(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.statisticsData = res.data.data;
    },
  },
};
</script>

<style lang='scss' scoped>
.face-to-face-appointment {
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