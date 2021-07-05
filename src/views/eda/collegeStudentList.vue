<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近学历报名的学生。</div>
    <div class="college-student-container">
      <!--搜索模块-->
      <div class="college-student-search">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>

      <!--列表-->
      <div class="userTable">
        <el-table
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="order_id"
            label="订单编号"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toOrderDetail(row.order_id)">
                {{ row.order_id }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.surname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.sex === 1">男</span>
              <span v-else-if="row.sex === 2">女</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.mobile | filterPhone }}</span>
              <i
                class="el-icon-document-copy copy-number"
                @click="handleCopy(row.mobile)"
                title="复制"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="type_title"
            label="学历形式"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="university_title"
            label="院校名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="level_title"
            label="层次名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="major_title"
            label="专业名称"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>

          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
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
import { getEduList } from "@/api/eda";
export default {
  name: "collegeStudentList",
  data() {
    return {
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名",
          },
        },
      ],
      searchData: {
        keyword: "",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
    };
  },
  created() {
    this.getEduList();
  },
  methods: {
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },

    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = { ...data };
      this.getEduList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getEduList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getEduList();
    },
    // 获取列表
    async getEduList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getEduList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.college-student {
  &-container {
    padding: 20px;
  }
  .copy-number {
    color: #199fff;
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>