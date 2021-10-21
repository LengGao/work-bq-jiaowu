<template>
  <div class="class-type">
    <div class="head_remind">*机构端小程序的代码草稿箱</div>
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
          label="草稿ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="draft_id"
        >
        </el-table-column>
        <el-table-column
          prop="user_version"
          label="版本号"
          min-width="120"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="user_desc"
          label="描述"
          min-width="220"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              :loading="row.loading"
              @click="addToTemplate(row)"
              >添加到标准库</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { templateDraftList, addToTemplate } from "@/api/institution";
export default {
  name: "appletDrafts",
  data() {
    return {
      listData: [],
      listLoading: false,
    };
  },

  created() {
    this.templateDraftList();
  },
  methods: {
    async addToTemplate(row) {
      const data = {
        draft_id: row.draft_id,
      };
      row.loading = true;
      const res = await addToTemplate(data).catch(() => {});
      row.loading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.templateDraftList();
      }
    },
    async templateDraftList() {
      this.listLoading = true;
      const res = await templateDraftList();
      this.listLoading = false;
      this.listData = res.data.map((item) => ({
        ...item,
        loading: false,
      }));
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
