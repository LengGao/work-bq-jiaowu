<template>
  <div class="insitution-project">
    <div class="actions">
      <el-button type="primary" @click="addDialog = true">添加项目</el-button>
    </div>
    <div class="table-list">
      <!--列表-->
      <div class="userTable">
        <el-table
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          :header-cell-style="{
            'text-align': 'center',
            background: '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
          height="690"
        >
          <el-table-column
            prop="project_id"
            label="项目ID"
            min-width="60"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            v-for="(item, index) in classTypes"
            :key="index"
            :label="item.title"
            show-overflow-tooltip
            min-width="100"
          >
            <template slot-scope="{ row }">
              <el-input
                @blur="sendClassType(row)"
                type="number"
                @mousewheel.native.prevent
                size="small"
                v-model="row.org_class_type[index].price"
                placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <AddProject v-model="addDialog" @success="getOrgProjectr" />
  </div>
</template>

<script>
import AddProject from "./addProject";
import { getOrgProjectr } from "@/api/institution";
import { sendClassType } from "@/api/crm";
export default {
  name: "InsitutionProject",
  components: {
    AddProject,
  },
  data() {
    return {
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "题库名称",
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      classTypes: [],
      addDialog: false,
    };
  },
  created() {
    this.getOrgProjectr();
  },
  methods: {
    // 分发
    async sendClassType(row) {
      const arr = [
        {
          [row.project_id]: row.org_class_type,
        },
      ];
      console.log(arr);
      const data = {
        from_organization_id: this.$route.query?.institution_id || "",
        project: JSON.stringify(arr),
      };
      const res = await sendClassType(data).catch(() => {});
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getOrgProjectr();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getOrgProjectr();
    },

    handlePageChange(val) {
      this.pageNum = val;
      this.getOrgProjectr();
    },
    // 获取列表
    async getOrgProjectr() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        from_organization_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await getOrgProjectr(data);
      this.listLoading = false;
      if (res.code === 0) {
        if (res.data.list.length) {
          this.classTypes = res.data.list[0].org_class_type;
        }
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 去掉number样式 */
/deep/.el-input {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
.insitution-project {
  .actions {
    text-align: right;
    margin-bottom: 10px;
  }
  &-container {
    padding: 10px 20px 20px 0;
    display: flex;
    .tree-list {
      width: 200px;
      flex-shrink: 0;
      border-right: 1px solid #eee;
      margin-right: 20px;
      height: 80vh;
      overflow-y: auto;
      overflow-x: hidden;
      .title {
        color: #444;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h5 {
        color: #444;
        margin-bottom: 10px;
      }
    }
    .table-list {
      flex: 1;
      overflow: hidden;
    }
  }
  .copy-number {
    color: #199fff;
    cursor: pointer;
    margin-left: 8px;
  }
  .table_bottom {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    float: right;
  }
}
.insitution-project-search {
  display: flex;
  justify-content: flex-start;
  span {
    font-size: 14px;
    color: #999;
    line-height: 40px;
  }
}
.addcourse {
  margin-left: auto;
  height: 40px;
  line-height: 18px;
}

.circle {
  margin-right: 8px;
  &-value {
    display: inline-block;
    margin-left: 3px;
    text-align: center;
    color: #6dd152;
    &.info {
      color: #bbb;
    }
  }
}
</style>
