<template>
  <div class="performance-targets">
    <div class="head_remind">*本模块按照最小粒度“人/月”设置销售业绩目标</div>
    <div class="container">
      <!-- <el-tabs v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="客户字段" name="1"></el-tab-pane>
        <el-tab-pane label="报名字段" name="2"></el-tab-pane>
      </el-tabs> -->
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <!-- <div>
          <el-button type="primary" @click="handleAdd">添加字段</el-button>
        </div> -->
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
            label="序号"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="field_id"
          >
          </el-table-column>
          <el-table-column
            label="字段名称"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="field_text"
          >
          </el-table-column>
          <el-table-column
            prop="field_name"
            label="字段key"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="field_type"
            label="字段类型"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ fieldTypeMap[row.field_type] }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="has_question"
            label="必填"
            min-width="70"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-checkbox
                @change="modifyCustomfieldInfo('required', row)"
                v-model="row.required"
                :true-label="1"
                :false-label="0"
              ></el-checkbox>
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
                :disabled="!row.state"
                v-model="row.status"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="modifyCustomfieldInfo('status', row)"
              >
              </el-switch>
            </template>
          </el-table-column> -->
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="120"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="handleEdit(row.field_id)"
                >编辑</el-button
              >
              <!-- <el-button type="text" @click="deleteConfirm(row.field_id)"
                >删除</el-button
              > -->
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
    <AddField
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getCustomfieldPage"
      :output-type="activeName"
    />
  </div>
</template>

<script>
import {
  getCustomfieldPage,
  deletedCustomfield,
  modifyCustomfieldInfo,
} from "@/api/crm";
import AddField from "./components/addField.vue";
export default {
  name: "fieldConfig",
  components: {
    AddField,
  },
  data() {
    return {
      activeName: "1", //1：客户字段 2：订单字段
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
            placeholder: "字段名称/字段内容",
          },
        },
      ],
      dialogVisible: false,
      dialogTitle: "",
      currentId: "",
      fieldTypeMap: {
        text: "文本",
        select: "单选",
        multi_select: "多选",
        date: "日期",
      },
    };
  },

  created() {
    this.getCustomfieldPage();
  },
  methods: {
    async modifyCustomfieldInfo(keyword, row) {
      const data = {
        keyword,
        status: row[keyword],
        field_id: row.field_id,
      };
      const res = await modifyCustomfieldInfo(data).catch(() => {
        row[keyword] = row[keyword] === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 删除机构
    deleteConfirm(field_id) {
      this.$confirm("确定要删除此字段吗?", { type: "warning" })
        .then(() => {
          this.deletedCustomfield(field_id);
        })
        .catch(() => {});
    },
    async deletedCustomfield(field_id) {
      const data = { field_id };
      const res = await deletedCustomfield(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCustomfieldPage();
      }
    },
    handleEdit(row) {
      this.currentId = row;
      this.dialogTitle = "编辑字段";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加字段";
      this.dialogVisible = true;
    },
    handleTabChange() {
      this.pageNum = 1;
      this.getCustomfieldPage();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getCustomfieldPage();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCustomfieldPage();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getCustomfieldPage();
    },
    async getCustomfieldPage() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        output_type: this.activeName,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCustomfieldPage(data);
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
