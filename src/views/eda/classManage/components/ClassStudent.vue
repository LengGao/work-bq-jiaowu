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
          label="序号"
          show-overflow-tooltip
          min-width="90"
          prop="classroom_id"
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="上课日期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="星期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="上课时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="授课方式"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="排课属性"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="出勤人数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="缺勤人数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="出勤率"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="getClassstudentList"
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
        keyboard: "",
      },
      searchOptions: [
        {
          key: "keyboard",
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