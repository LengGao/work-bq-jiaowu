<template>
  <div>
    <div class="head_remind">
      *本模块主要是用来记录学生数据的跟进管理。
    </div>
    <section class="main">
    <!--搜索模块-->
    <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
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
            prop="name"
            label="学生姓名"
            min-width="220"
            align="center"
            show-overflow-tooltip
          >  
          <template slot-scope="{ row }">
            <div class="realname" @click="toStudentDetail(row.uid)">
              {{ row.realname }}
            </div>
          </template>
        </el-table-column>
          <el-table-column
          prop="name"
          label="跟进时间"
          min-width="200"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
        prop="name"
        label="跟进内容"
        min-width="250"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        label="跟进人"
        min-width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        label="角色"
        min-width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
      prop="name"
      label="下次跟进时间"
      min-width="220"
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
import { getShortcuts } from "@/utils/date";
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
        date: [],
        keyword: "",
      },
      searchOptions: [
      {
            key: "date",
            type: "datePicker",
            attrs: {
              type: "daterange",
              "range-separator": "至",
              "start-placeholder": "开始日期",
              "end-placeholder": "结束日期",
              "value-format": "yyyy-MM-dd",
              pickerOptions: {
                shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
              },
            }
          },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名",
          },
        },
    ],
      currentId: "",
    //   dialogTitle: "添加班级",
    //   dialogVisible: false,
    };
  },

  created() {
    // this.getClassList();
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
        // this.getMessageList();
      },
    handlePageChange(val) {
        this.pageNum = val;
        // this.getNoticeList();
      },
    handleSizeChange(size) {
      this.pageSize = size;
      // this.getNoticeList();
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
