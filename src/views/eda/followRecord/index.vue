<template>
  <div>
    <div class="head_remind">
      *本模块主要是用来记录学生数据的跟进管理。
    </div>
    <section class="main">
    <!--搜索模块-->
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
          row-key="treeId"
          lazy
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            prop="id"
            label="序号"
            width="100"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="user_name"
            label="学生姓名"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >  
          <template slot-scope="{ row }">
            <div class="realname" @click="toStudentDetail(row.uid)">
              {{ row.user_name }}
            </div>
          </template>
        </el-table-column>
          <el-table-column
          prop="update_time"
          label="跟进时间"
          min-width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
        prop="describe"
        label="跟进内容"
        min-width="360"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="follow_user_name"
        label="跟进人"
        min-width="160"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="position"
        label="角色"
        min-width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
        <el-table-column
        prop="next_follow_time"
        label="下次跟进时间"
        min-width="250"
        align="center"
        show-overflow-tooltip
        ></el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" 
          :curpage="pageNum" 
          @pageChange="handlePageChange" 
          @pageSizeChange="handleSizeChange"
          style="margin-left: auto;" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { getShortcuts } from "@/utils/date";
import { getFollowPage } from "@/api/message"
export default {
  name: "followRecord",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      // pageSize: 20,
      listTotal: 0,
      searchData: { 
        value: "",
      },
      searchOptions: [
        {
          key: "value",
          attrs: {
            placeholder: "学生姓名/跟进人/跟进内容",
          },
        },
    ],
      currentId: "",
    //   dialogTitle: "添加班级",
    //   dialogVisible: false,  
    };
  },

  created() {
    this.getFollowPage();
  },

  methods: {
    handleSearch(data) {
        const times = data.date || ["", ""];
        console.log(times);
        delete data.date;
        this.pageNum = 1;
        this.searchData = {
          ...data,
          start_time: times[0],
          end_time: times[1],
        };
        console.log(this.searchData);
        this.getFollowPage();
      },
    handlePageChange(val) {
        this.pageNum = val;
        this.getFollowPage();
      },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getFollowPage();
    },
    // 跟进记录列表
    async getFollowPage() {
        const data = {
          page: this.pageNum,
          limit: this.pageSize,
          ...this.searchData,
        };
        this.listLoading = true;
        const res = await getFollowPage(data);
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
/deep/.search-lise .search-item[data-v-a11328ce]{
  width: 300px;
}
.input-width {
  width: 240px;
}
.main {
  padding: 20px;
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
.realname {
  color: #199fff;
  cursor: pointer;
}
</style>
