<template>
  <div class="personal-target">
    <div class="mainwrap">
      <div class="tree-list">
        <p class="title">部门列表</p>
        <v-tree ref="tree" :tpl="tpl" :data="treeData" />
      </div>
      <div class="table-list">
        <h2 class="target-value">2021年回款总金额目标：¥27,000,000.00</h2>
        <!--表格-->
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
            prop="staff_id"
          >
          </el-table-column>

          <el-table-column
            prop="staff_name"
            label="员工姓名"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="account"
            label="业绩总额"
            min-width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-for="item in 12"
            :key="item"
            prop="account"
            :label="`${item}月`"
            min-width="140"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-input
                v-if="row.edit"
                placeholder="请输入"
                type="number"
              ></el-input>
              <div v-else class="show-value">
                <span>{{ row.account }}</span>
                <el-button
                  class="icon"
                  icon="el-icon-edit"
                  @click="row.edit = true"
                  type="text"
                ></el-button>
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
    </div>
  </div>
</template>

<script>
import {
  getStaffList,
  updateStaffStatus,
  getDepartmentlists,
  delDepartment,
} from "@/api/set";
export default {
  name: "UserManage",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "员工姓名",
          },
        },
      ],
      treeData: [],
      treeParams: {
        department_id: "",
      },
    };
  },

  created() {
    this.getDepartmentlists();
    this.getStaffList();
  },
  methods: {
    tpl(node) {
      return (
        <span
          class={{
            "tree-node": true,
            "tree-node--active": this.treeParams.department_id === node.id,
          }}
          onClick={() => this.onNodeClick(node)}
        >
          {node.title}
        </span>
      );
    },
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.setChildrenExpanded(res.data);
        this.treeData = [
          {
            id: "",
            title: "全部",
            expanded: true,
            children: res.data,
          },
        ];
      }
    },
    setChildrenExpanded(data) {
      data.forEach((item) => {
        if (item.children && item.children.length) {
          item.expanded = true;
          this.setChildrenExpanded(item.children);
        }
      });
    },
    onNodeClick(data) {
      const { id: department_id } = data;
      this.treeParams = { department_id };
      this.pageNum = 1;
      this.getStaffList();
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getStaffList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStaffList();
    },
    async getStaffList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getStaffList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        edit: false,
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
.personal-target {
  .mainwrap {
    padding: 20px;
    display: flex;
  }
  .tree-list {
    min-width: 220px;
    flex-shrink: 0;
    border: 1px solid #eee;
    margin-right: 20px;
    min-height: 90vh;
    overflow-y: auto;
    .title {
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding: 10px;
      color: #666;
    }
  }
  .table-list {
    flex: 1;
    overflow: hidden;
    .target-value {
      color: #999;
      margin-bottom: 10px;
    }
    .show-value {
      cursor: pointer;
      .icon {
        padding: 0 4px;
        display: none;
      }
      &:hover {
        .icon {
          display: inline-block;
        }
      }
    }
  }
}
</style>
<style >
/* 去掉number样式 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>