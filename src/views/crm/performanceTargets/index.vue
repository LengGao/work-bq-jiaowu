<template>
  <div class="performance-targets">
    <div class="head_remind">*本模块按照最小粒度“人/月”设置销售业绩目标</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openYearTargetDialog('')"
            >添加年度目标</el-button
          >
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
            label="ID"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="年度"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="title"
          >
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="回款目标"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span> {{ row.target | moneyFormat(true) }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否启用"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="modifyYearStatus(row)"
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
              <el-button type="text" @click="toSetTarget(row)">设置</el-button>
              <el-button type="text" @click="openYearTargetDialog(row.id)"
                >复制</el-button
              >
              <el-button type="text" @click="deleteConfirm(row.id)"
                >删除</el-button
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
    <AddTarget
      v-model="dialogVisible"
      :id="currentId"
      @on-success="getPerformanceTargetList"
    />
  </div>
</template>

<script>
import {
  getPerformanceTargetList,
  deletedYearRecord,
  modifyYearStatus,
} from "@/api/crm";
import AddTarget from "./components/addTarget.vue";
export default {
  name: "performanceTargets",
  components: {
    AddTarget,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "年度",
          },
        },
      ],
      dialogVisible: false,
      currentId: "",
    };
  },

  created() {
    this.getPerformanceTargetList();
  },
  methods: {
    async modifyYearStatus(row) {
      const data = {
        status: row.status,
        id: row.id,
      };
      const res = await modifyYearStatus(data).catch(() => {
        row.status = row.status === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 删除年度目标
    deleteConfirm(id) {
      this.$confirm("确定要删除此年度吗?", { type: "warning" })
        .then(() => {
          this.deletedYearRecord(id);
        })
        .catch(() => {});
    },
    async deletedYearRecord(id) {
      const data = { id };
      const res = await deletedYearRecord(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getPerformanceTargetList();
      }
    },
    toSetTarget(row) {
      this.$router.push({ name: "personalTarget", query: { ...row } });
    },
    openYearTargetDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getPerformanceTargetList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getPerformanceTargetList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getPerformanceTargetList();
    },
    async getPerformanceTargetList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getPerformanceTargetList(data);
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
