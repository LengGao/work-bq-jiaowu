<template>
  <div class="class-type">
    <div class="head_remind">*管理入驻机构销售课程的班型</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary">添加班型</el-button>
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
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="班型ID"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="班型名称"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="题库"
            min-width="160"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="录播"
            min-width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="直播"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="first_time"
            label="面授"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="last_time"
            label="备注信息"
            align="center"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="duration"
            label="排序"
            align="center"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="是否启用"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.is_publish"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetails(row)">编辑</el-button>
              <el-button type="text" @click="toDetails(row)">删除</el-button>
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
  </div>
</template>

<script>
import { courseUserVideoStatisticsList } from "@/api/sou";
export default {
  name: "studentList",
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
            placeholder: "班型名称",
          },
        },
      ],
      exportLoading: false,
    };
  },

  created() {
    this.courseUserVideoStatisticsList();
  },
  methods: {
    toDetails(row) {
      this.$router.push({
        name: "institutionDetails",
        query: {
          id: row.id,
        },
      });
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
        course_id: 144,
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
.container {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
