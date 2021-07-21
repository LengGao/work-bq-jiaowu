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
          prop="intent_id"
        >
        </el-table-column>
        <el-table-column
          prop="intent_list"
          label="异常数量"
          min-width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.intent_list.length }}
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
              v-if="row.intent_list.length"
              @click="openDialog(row.intent_list)"
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
    <AbnormalIntentionDialog
      v-model="dialog"
      @on-success="getFailDataIntent"
      :list="currentList"
    />
  </div>
</template>

<script>
import AbnormalIntentionDialog from "./AbnormalIntentionDialog";
import { getFailDataIntent } from "@/api/eda";
export default {
  name: "classLive",
  components: {
    AbnormalIntentionDialog,
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
    this.getFailDataIntent();
  },
  methods: {
    openDialog(list) {
      this.currentList = list;
      this.dialog = true;
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getFailDataIntent();
    },
    async getFailDataIntent() {
      const data = {
        page: this.pageNum,
      };
      this.listLoading = true;
      const res = await getFailDataIntent(data);
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
