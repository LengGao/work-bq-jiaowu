<template>
  <div class="class-student">
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
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
      >
        <el-table-column
          label="学员姓名"
          show-overflow-tooltip
          min-width="90"
          prop="user_realname"
        >
        </el-table-column>
        <el-table-column
          label="手机号码"
          show-overflow-tooltip
          min-width="90"
          prop="telphone"
        >
        </el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="schoole_name"
          label="所属校区"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="加入时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_username"
          label="出勤次数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="缺勤次数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="出勤率"
          min-width="110"
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
import { getClassstudentList } from "@/api/eda";
export default {
  name: "ClassStudent",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "姓名/手机号码",
          },
        },
      ],
    };
  },
  created() {
    this.getClassstudentList();
  },
  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getClassstudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassstudentList();
    },
    //班级学生列表
    async getClassstudentList() {
      const data = {
        class_id: this.$route.query?.id,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassstudentList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style>
</style>