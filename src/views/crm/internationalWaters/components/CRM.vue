<template>
  <div class="change-manage">
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
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="uid"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户姓名"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="手机号码"
          prop="mobile"
          align="center"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_time"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="最后跟进时间"
          prop="create_time"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="前所属老师"
          prop="institution_name"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button
              :loading="row.loading"
              type="text"
              @click="toStudentDetail(row.uid)"
              >客户详情</el-button
            >
            <el-button :loading="row.loading" type="text" @click="receive(row)"
              >领取</el-button
            >
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
</template>

<script>
import { getCrmList, receive } from "@/api/crm";
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "Dongpei",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        mobile: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "mobile",
          attrs: {
            placeholder: "手机号码",
          },
        },
      ],
    };
  },

  created() {
    this.getCrmList();
  },
  methods: {
    // 领取
    async receive(row) {
      const data = {
        type: 1,
        id: row.id,
      };
      row.loading = true;
      const res = await receive(data).catch(() => {});
      row.loading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCrmList();
      }
    },
    handleSearch(data) {
      const date = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
      };
      this.getCrmList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCrmList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getCrmList();
    },
    async getCrmList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCrmList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        loading: false,
      }));
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
  .avatar {
    height: 50px;
  }
}
</style>
