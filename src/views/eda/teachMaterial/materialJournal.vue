<template>
  <section class="mainwrap">
    <div class="header">
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
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="序号"
          type="index"
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="110"
          sortable
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="books_name"
          label="教材名称"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="storehouse_name"
          label="仓库名称"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="num"
          label="发放数量"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="type"
          label="发放形式"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ types[row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="操作人"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="100"
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
  </section>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import { dispenseLog } from "@/api/eda";
export default {
  name: "materialJournal",
  components: {
    SearchList,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      types: {
        1: "现场发放",
        2: "快递发放",
      },
      searchData: {
        date: "",
        staff_name: "",
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
          },
        },
        {
          key: "staff_name",
          attrs: {
            placeholder: "操作人",
          },
        },
      ],
    };
  },
  created() {
    this.dispenseLog();
  },
  methods: {
    handleSearch(data) {
      const times = data.date || ["", ""];
      this.pageNum = 1;
      delete data.date;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.dispenseLog();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.dispenseLog();
    },
    //教材发放日志
    async dispenseLog() {
      const data = {
        id: this.$route.query?.id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await dispenseLog(data);
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
.userTable {
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
