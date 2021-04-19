<template>
  <div class="playback-statistics">
    <!--搜索模块-->
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
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="头像" min-width="70" prop="classroom_id">
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="学生姓名"
          min-width="220"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="手机号码"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="所属班级"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="最早加入时间"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="最后离开时间"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="观看时长"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="观看进度"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
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
import { getClassList } from "@/api/eda";
export default {
  name: "PlaybackStatistics",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        project_id: "",
        keyword: "",
      },
      searchOptions: [
        {
          type: "select",
          options: [],
          attrs: {
            placeholder: "班级名称",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },

    async getClassList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
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