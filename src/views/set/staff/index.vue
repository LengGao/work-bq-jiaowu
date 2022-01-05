<template>
  <div class="staff">
    <div class="head_remind">*可按照角色权限对员工账号进行分类管理</div>
    <div class="mainwrap">
      <div class="tree-list">
        <p class="title">部门名称</p>
        <v-tree ref="tree" :tpl="tpl" :data="treeData" />
      </div>
      <div class="table-list">
        <div class="client_head">
          <!--搜索模块-->
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
          <div>
            <el-button type="primary" @click="handleAdd">添加员工</el-button>
          </div>
        </div>
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
            label="员工ID"
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
            label="手机号码"
            min-width="120"
            align="center"
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.account" />
            </template>
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            min-width="120"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="group_name"
            label="部门名称"
            min-width="120"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="scope"
            label="客户数据查看范围"
            min-width="100"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
           <el-table-column
            prop="applet_openid"
            label="小程序绑定状态"
            min-width="140"
            align="center"
            show-overflow-tooltip
          >
           <template slot-scope="{ row }">
            <span
              v-if="row.applet_openid == ''"
              >未绑定</span
            >
            <span v-else>已绑定</span>
          </template>
          </el-table-column>
          
          <el-table-column
            prop="scope"
            label="客户数量"
            min-width="100"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="超管"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.is_super"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="updateStaffStatus(row, 'is_super')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="部门主管"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.is_director"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="updateStaffStatus(row, 'is_director')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="账号状态"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.account_status"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
                @change="updateStaffStatus(row, 'account_status')"
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
              <el-button type="text" @click="deleteBinding(row.staff_id)"
                >清空绑定</el-button
              >
              <el-button type="text" @click="handleEdit(row.staff_id)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteConfirm(row, 'is_deleted')"
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
          />
        </div>
      </div>

      <AddStaffDialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        :options="departMentData"
        @on-success="getStaffList"
      />
      <AddDepartmentDialog
        v-model="dialogDepartmentVisible"
        :title="dialogDepartmentTitle"
        :id="departmentId"
        :options="departMentData"
        @on-success="getDepartmentlists"
      />
    </div>
  </div>
</template>

<script>
import AddStaffDialog from "./components/AddStaffDialog";
import AddDepartmentDialog from "./components/AddDepartmentDialog";
import {
  getStaffList,
  updateStaffStatus,
  getDepartmentlists,
  delDepartment,
  clearAppletOpenid,
} from "@/api/set";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "UserManage",
  components: {
    PartiallyHidden,
    AddStaffDialog,
    AddDepartmentDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        applet_bound_status:"",
      },
      searchOptions: [
        {
          key: "applet_bound_status",
          type: "select",
          width: 150,
          options: [
            {
              value: 1,
              label: "已绑定",
            },
            {
              value: 2,
              label: "未绑定",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "小程序绑定状态",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "员工姓名",
          },
        },
      ],
      dialogVisible: false,
      dialogTitle: "",
      currentId: "",
      treeData: [],
      treeParams: {
        department_id: "",
      },
      departMentData: [],
      dialogDepartmentVisible: false,
      dialogDepartmentTitle: "",
      departmentId: "",
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
          <span>{node.title}</span>
          <div class="tree-node-actions">
            {node.title === "全部" ? (
              <i
                class="el-icon-folder-add"
                onClick={(e) => this.openDepartmentDialog(e, node.id)}
              ></i>
            ) : (
              <span>
                <i
                  class="el-icon-folder-add"
                  onClick={(e) => this.openDepartmentDialog(e, node.id)}
                ></i>
                <i
                  class="el-icon-edit-outline"
                  onClick={(e) => this.openDepartmentDialog(e, node.id, true)}
                ></i>
                <i
                  class="el-icon-delete"
                  onClick={(e) => this.delDepartmentConfirm(e, node.id)}
                ></i>
              </span>
            )}
          </div>
        </span>
      );
    },
    openDepartmentDialog(e, id, isEdit) {
      e.stopPropagation();
      this.departmentId = id;
      this.dialogDepartmentTitle = isEdit ? "编辑部门" : "添加部门";
      this.dialogDepartmentVisible = true;
    },
    linkTo() {
      this.$router.push({ name: "department" });
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
        this.departMentData = res.data;
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
    // 删除部门
    delDepartmentConfirm(e, id) {
      e.stopPropagation();
      this.$confirm("确定要删除此部门吗?", { type: "warning" })
        .then(() => {
          this.delDepartment(id);
        })
        .catch(() => {});
    },
    async delDepartment(id) {
      const data = { id };
      const res = await delDepartment(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getDepartmentlists();
      }
    },
    onNodeClick(data) {
      const { id: department_id } = data;
      this.treeParams = { department_id };
      this.pageNum = 1;
      this.getStaffList();
    },
    // 清空小程序绑定
    deleteBinding(staff_id) {
      this.$confirm("确定要清空小程序绑定吗?", { type: "warning" })
        .then(() => {
          this.clearAppletOpenid(staff_id);
        })
        .catch(() => {});
    },
    async clearAppletOpenid(id) {
      const data = { id };
      const res = await clearAppletOpenid(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getStaffList();
      }
    },


    // 删除员工
    deleteConfirm(...params) {
      this.$confirm("确定要删除此员工吗?", { type: "warning" })
        .then(() => {
          this.updateStaffStatus(...params);
        })
        .catch(() => {});
    },
    async updateStaffStatus(row, type) {
      const data = {
        key: type,
        value: row[type] || +(type === "is_deleted"),
        staff_id: row.staff_id,
      };
      const res = await updateStaffStatus(data).catch(() => {
        row[type] = row[type] === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
        type === "is_deleted" && this.getStaffList();
      }
    },
    handleEdit(id) {
      this.currentId = id;
      this.dialogTitle = "编辑员工";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加员工";
      this.dialogVisible = true;
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
.staff {
  .mainwrap {
    padding: 20px;
    display: flex;
  }
  .tree-list {
    min-width: 320px;
    flex-shrink: 0;
    border-right: 1px solid #eee;
    margin-right: 20px;
    min-height: 90vh;
    overflow-y: auto;
    .title {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .table-list {
    flex: 1;
    overflow: hidden;
  }
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
/deep/.tree-node-el {
  display: flex;
  align-items: center;
  &:hover {
    .tree-node-actions {
      display: inline-block;
    }
    .tree-node {
      color: #1999ff;
    }
  }
}
/deep/.leaf {
  &:hover {
    .tree-node-actions {
      display: inline-block;
    }
    .tree-node {
      color: #1999ff;
    }
  }
}
.tree-node {
  display: flex;
  align-items: center;
  margin-left: 2px;
  font-size: 16px;
  &-actions {
    margin-left: 16px;
    display: none;
    i {
      margin-left: 8px;
    }
  }
  &--active {
    .tree-node-actions {
      display: inline-block;
    }
  }
}
</style>
