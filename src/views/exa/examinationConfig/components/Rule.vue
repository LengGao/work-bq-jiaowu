<template>
  <!-- 报考规则 -->
  <div class="rule">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="openAdd">添加规则</el-button>
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
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="ID"
          show-overflow-tooltip
          min-width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="rule_name"
          label="报考规则"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="exam_type"
          label="报考省市"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.province + " " + row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="binding_count"
          label="关联计划数"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                v-if="row.binding_count"
                type="text"
                @click="linkTo(row.id)"
                >{{ row.binding_count }}</el-button
              >
              <span v-else>{{ row.binding_count }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="student_number"
          label="是否启用"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              @change="updateRuleStatus(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="deleteConfirm(row.id)"
                >删除</el-button
              >
            </div>
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
    <RuleDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :typeOptions="typeOptions"
      :id="currentId"
      @on-success="getRuleList"
    />
  </div>
</template>

<script>
import { getRuleList, deleteRule, updateRuleStatus } from "@/api/exa";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import RuleDialog from "./RuleDialog";
export default {
  name: "Subject",
  components: {
    RuleDialog,
  },
  props: {
    subjectId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
        search_box: "",
      },
      searchOptions: [
        {
          key: "cate_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "报考规则",
          },
        },
      ],

      currentId: "",
      dialogTitle: "添加规则",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getRuleList();
    this.getCateList();
  },

  methods: {
    linkTo(id) {
      this.$router.push({ name: "apply", query: { id } });
    },
    //修规则目状态
    async updateRuleStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateRuleStatus(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 删除规则
    deleteConfirm(id) {
      this.$confirm("确定要删除此规则吗?", { type: "warning" })
        .then(() => {
          this.deleteRule(id);
        })
        .catch(() => {});
    },
    async deleteRule(id) {
      const data = {
        id,
      };
      const res = await deleteRule(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getRuleList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑规则";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加规则";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.cate_id.pop(),
      };
      this.getRuleList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getRuleList();
    },
    // 规则列表
    async getRuleList() {
      const data = {
        subject_id: this.subjectId,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getRuleList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rule {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .client_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userTable {
    margin-top: 20px;
  }
}
</style>
