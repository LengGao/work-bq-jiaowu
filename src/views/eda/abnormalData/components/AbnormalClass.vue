<template>
  <div>
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
          prop="classroom_id"
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="user_list"
          label="异常数量"
          min-width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.user_list.length }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="240"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              v-if="row.user_list.length"
              @click="openDialog(row.user_list)"
              >查看</el-button
            >
            <span v-else>--</span>
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
    <AbnormalClassDialog
      v-model="dialog"
      @on-success="getFailDataClass"
      :list="currentList"
    />
  </div>
</template>

<script>
import AbnormalClassDialog from "./AbnormalClassDialog";
import { getFailDataClass } from "@/api/eda";
export default {
  name: "classLive",
  components: {
    AbnormalClassDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      dialog: false,
      currentList: [],
    };
  },

  created() {
    this.getFailDataClass();
  },
  methods: {
    openDialog(list) {
      this.currentList = list;
      this.dialog = true;
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getFailDataClass();
    },
    async getFailDataClass() {
      const data = {
        page: this.pageNum,
      };
      this.listLoading = true;
      const res = await getFailDataClass(data);
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
</style>
