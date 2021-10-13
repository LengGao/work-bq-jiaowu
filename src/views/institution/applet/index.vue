<template>
  <div class="class-type">
    <div class="head_remind">*用于管理和发布机构端的小程序</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="handleAdd"
            >批量发布新版本</el-button
          >
          <el-button type="primary" @click="batchAuditCode">批量审核</el-button>
          <el-button type="primary" @click="batchUndoCodeAudit"
            >批量撤回</el-button
          >
          <el-button type="primary" @click="batchPublishCode"
            >批量发布</el-button
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
          @selection-change="handleTableSelection"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="小程序图标"
            show-overflow-tooltip
            min-width="100"
            align="center"
            prop="title"
          >
            <template slot-scope="{ row }">
              <img style="width: 60px" :src="row.head_image_url" alt="" />
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="小程序名称"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="机构名称"
            min-width="180"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="version"
            label="线上版本"
            min-width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="has_live"
            label="状态"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag
                :type="statusMap[row.status]"
                size="small"
                :title="row.status === 2 ? row.reason : ''"
              >
                {{ row.status_name }}
                <i class="el-icon-question" v-if="row.status === 2"></i>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间"
            min-width="140"
            align="center"
            show-overflow-tooltip
          >
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
    <AddVersionDialog v-model="dialogVisible" @on-success="appletManagement" />
  </div>
</template>

<script>
import {
  appletManagement,
  templateSelect,
  batchAuditCode,
  batchUndoCodeAudit,
  batchPublishCode,
} from "@/api/institution";
import AddVersionDialog from "./components/AddVersionDialog";
export default {
  name: "applet",
  components: {
    AddVersionDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      statusMap: {
        0: "info",
        1: "warning",
        2: "danger",
        3: "success",
        4: "",
      },
      searchData: {
        search_box: "",
        template_id: "",
        status: "",
      },
      searchOptions: [
        {
          key: "template_id",
          type: "select",
          options: [],
          optionValue: "template_id",
          optionLabel: "template_id",
          attrs: {
            placeholder: "模板ID",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "status",
          type: "select",
          options: [
            {
              label: "已上传",
              value: 0,
            },
            {
              label: "审核中",
              value: 1,
            },
            {
              label: "审核失败",
              value: 2,
            },
            {
              label: "审核成功",
              value: 3,
            },
            {
              label: "已上线",
              value: 4,
            },
          ],
          attrs: {
            placeholder: "状态",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "机构名称/小程序名称",
          },
        },
      ],
      dialogVisible: false,
      selectedIds: [],
    };
  },

  created() {
    this.appletManagement();
    this.templateSelect();
  },
  methods: {
    async batchPublishCode() {
      if (!this.selectedIds.length) {
        this.$message.warning("请先选择机构小程序");
        return;
      }
      const data = {
        org_id_arr: this.selectedIds,
      };
      const res = await batchPublishCode(data);
      if (res.code === 0) {
        this.$alert(`<p>${res.message}</p>`, {
          dangerouslyUseHTMLString: true,
        });
        this.appletManagement();
      }
    },
    async batchUndoCodeAudit() {
      if (!this.selectedIds.length) {
        this.$message.warning("请先选择机构小程序");
        return;
      }
      const data = {
        org_id_arr: this.selectedIds,
      };
      const res = await batchUndoCodeAudit(data);
      if (res.code === 0) {
        this.$alert(`<p>${res.message}</p>`, {
          dangerouslyUseHTMLString: true,
        });
        this.appletManagement();
      }
    },
    async batchAuditCode() {
      if (!this.selectedIds.length) {
        this.$message.warning("请先选择机构小程序");
        return;
      }
      const data = {
        org_id_arr: this.selectedIds,
      };
      const res = await batchAuditCode(data);
      if (res.code === 0) {
        this.$alert(`<p>${res.message}</p>`, {
          dangerouslyUseHTMLString: true,
        });
        this.appletManagement();
      }
    },
    handleTableSelection(selection) {
      this.selectedIds =
        selection.map((item) => item.from_organization_id) || [];
    },
    // 模板id选项
    async templateSelect() {
      const res = await templateSelect();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    handleAdd() {
      if (!this.selectedIds.length) {
        this.$message.warning("请先选择机构小程序");
        return;
      }
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.appletManagement();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.appletManagement();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.appletManagement();
    },
    async appletManagement() {
      this.selectedIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await appletManagement(data);
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
