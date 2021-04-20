<template>
  <div class="live-statistics">
    <!--搜索模块-->
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button
        type="primary"
        @click="exportLiveStatisticForAdmin"
        :loading="exportLoading"
        >导 出</el-button
      >
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
          label="头像"
          align="center"
          min-width="70"
          prop="user_img"
        >
          <template slot-scope="{ row }">
            <el-avatar
              :src="row.user_img"
              icon="el-icon-user-solid"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="user_realname"
          label="学生姓名"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="telphone"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.telphone | filterPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="class_name"
          label="所属班级"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="entry_time"
          label="最早加入时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="leave_time"
          label="最后离开时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="play_duration"
          label="观看时长"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="progress"
          label="观看进度"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openDetail(row)">详情</el-button>
            </div>
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
    <LiveStatisticsDialog v-model="dialogVisible" :datas="currentData" />
  </div>
</template>

<script>
import LiveStatisticsDialog from "./LiveStatisticsDialog";
import {
  exportLiveStatisticForAdmin,
  getLiveStatisticForAdmin,
  getClassroomSelectByLiveId,
} from "@/api/eda";
export default {
  name: "LiveStatistics",
  components: {
    LiveStatisticsDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        search_box: "",
        class_id: "",
      },
      searchOptions: [
        {
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "name",
          key: "class_id",
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "班级名称",
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      currentData: [],
      dialogVisible: false,
      exportLoading: false,
    };
  },
  created() {
    this.getLiveStatisticForAdmin();
    this.getClassroomSelectByLiveId();
  },
  methods: {
    // 导出直播统计
    async exportLiveStatisticForAdmin() {
      const data = {
        live_id: this.$route.query?.live_id || "",
      };
      this.exportLoading = true;
      const res = await exportLiveStatisticForAdmin(data).catch(() => {
        this.exportLoading = false;
      });
      this.exportLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 获取班级选项
    async getClassroomSelectByLiveId() {
      const data = {
        live_id: this.$route.query?.live_id || "",
      };
      const res = await getClassroomSelectByLiveId(data);
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    openDetail(row) {
      this.currentData = row.detail;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getLiveStatisticForAdmin();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getLiveStatisticForAdmin();
    },

    async getLiveStatisticForAdmin() {
      const data = {
        live_id: this.$route.query?.live_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getLiveStatisticForAdmin(data).catch(() => {
        this.listLoading = false;
      });
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  text-align: right;
}
</style>