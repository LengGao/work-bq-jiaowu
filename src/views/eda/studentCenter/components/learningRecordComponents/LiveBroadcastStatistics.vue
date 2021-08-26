<template>
  <div class="live-statistics">
    <Title text="直播统计" />
    <div class="card-list">
      <div class="card-item">
        <p>直播场数</p>
        <p class="number">{{ statisticsData.total_live_count || 0 }}</p>
      </div>
      <div class="card-item">
        <p>观看场数</p>
        <p class="number">{{ statisticsData.user_live_count || 0 }}</p>
      </div>
      <div class="card-item">
        <p>观看总时长</p>
        <p class="number">{{ statisticsData.total_duration || 0 }}</p>
      </div>
      <div class="card-item">
        <p>到课率</p>
        <p class="number">
          {{ statisticsData.live_progress || 0
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
        <el-table-column
          label="序号"
          show-overflow-tooltip
          width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="live_class_name"
          label="直播名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="live_name"
          label="直播场次"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="entry_time"
          label="最早加入时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="leave_time"
          label="最后离开时间"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="play_duration"
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
import { userCenterLiveList, userCenterLiveData } from "@/api/eda";
export default {
  name: "LiveBroadcastStatistics",
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
    this.userCenterLiveList();
    this.userCenterLiveData();
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.userCenterLiveList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.userCenterLiveList();
    },
    async userCenterLiveData() {
      const data = {
        uid: this.uid,
      };
      const res = await userCenterLiveData(data);
      if (res.code === 0) {
        this.statisticsData = res.data;
      }
    },
    async userCenterLiveList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await userCenterLiveList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.live-statistics {
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