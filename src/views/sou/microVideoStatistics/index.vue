<template>
  <div class="micro-video-statistics">
    <div class="head_remind">*微视频统计</div>
    <div class="container">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        ref="search"
        @on-search="handleSearch"
      />
      <!--表格-->
      <div class="userTable">
        <el-table
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{
            'text-align': 'center',
            background: '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" min-width="70" type="index">
          </el-table-column>
          <el-table-column
            prop="title"
            label="视频名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="duration"
            label="视频时长"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.duration | filterDuration }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="客户姓名"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.telphone" />
            </template>
          </el-table-column>

          <el-table-column
            prop="create_time"
            label="首次观看时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="最近观看时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_second"
            label="累计观看时长"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.total_second | filterDuration }}</span>
            </template>
          </el-table-column>
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
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingleVideoStatisticsList } from "@/api/sou";
export default {
  name: "microVideoStatistics",
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
            placeholder: "视频/客户名称",
          },
        },
      ],
    };
  },

  created() {
    this.getSingleVideoStatisticsList();
  },

  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getSingleVideoStatisticsList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getSingleVideoStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getSingleVideoStatisticsList();
    },
    async getSingleVideoStatisticsList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getSingleVideoStatisticsList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.micro-video-statistics {
  .container {
    padding: 16px;
  }
}
</style>
