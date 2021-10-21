<template>
  <div class="institution-user-manage">
    <!--搜索模块-->
    <div class="college-student-search">
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
      >
        <el-table-column
          label="ID"
          show-overflow-tooltip
          min-width="80"
          align="center"
          prop="uid"
        >
        </el-table-column>

        <!-- <el-table-column
          prop="user_realname"
          label="头像"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column> -->

        <el-table-column
        prop="nickname"
        label="微信昵称"
        min-width="160"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="加入时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="from_name"
          label="数据来源"
          min-width="180"
          align="center"
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
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import {highSeasStudent} from "@/api/institution";
export default {
  name: "InsitutionSeas",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        date: "",
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
    this.highSeasStudent();
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
        this.highSeasStudent();
      },
    handlePageChange(val) {
      this.pageNum = val;
      this.highSeasStudent();
    },
    // 公海学员
    async highSeasStudent() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        org_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await highSeasStudent(data);
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
.institution-user-manage {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.institution-user-manage[data-v-667f4a99]{
  padding: 10px 20px 20px 0;
}
</style>
