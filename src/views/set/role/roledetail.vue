<template>
  <div>
    <section class="mainwrap">
      <div>
        <el-form
          :model="formInline"
          label-width="80px"
          class="demo-form-inline"
          label-position="left"
        >
          <el-form-item label="角色名称">
            <el-input
              v-model="formInline.user"
              placeholder="校长"
              maxlength="30"
              style="width: 420px"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="formInline.remark"
              placeholder="请输入"
              maxlength="100"
              style="width: 420px"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="authority">功能权限</span>
        <div class="tree-container" v-loading="treeLoading">
          <!-- check-strictly -->

          <el-tree
            ref="trees"
            v-for="(item, index) in roleData"
            :key="index"
            :data="[item]"
            show-checkbox
            :props="{
              label: 'title',
            }"
            check-on-click-node
            default-expand-all
            node-key="node_id"
            class="configure"
          >
          </el-tree>
        </div>
        <div class="tree-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="handleSubmit"
            >提 交</el-button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getRoleInfo, addRole, modifyRole } from "@/api/set";
export default {
  name: "roledetail",

  data() {
    return {
      formInline: {
        user: "",
        remark: "",
      },
      roleData: [],
      btnLoading: false,
      treeLoading: false,
    };
  },

  created() {
    this.getRoleInfo();
  },
  methods: {
    handleCancel() {
      this.$router.back();
    },
    handleSubmit() {
      const trees = this.$refs.trees;
      const ids = [];
      trees.forEach((tree) => {
        const currentHalfIds = tree.getHalfCheckedKeys(); // 获取半选状态的节点
        const currentIds = tree.getCheckedKeys(); //获取选中状态点节点
        ids.push(...currentIds, ...currentHalfIds);
      });
      if (!this.formInline.user) {
        this.$message.warning("请输入角色名称");
        return;
      }
      if (!ids.length) {
        this.$message.warning("请选择菜单权限");
        return;
      }
      if (this.$route.query.id) {
        this.modifyRole(ids);
      } else {
        this.addRole(ids);
      }
    },
    // 修改角色
    async modifyRole(node_ids) {
      const data = {
        role_name: this.formInline.user,
        remarks: this.formInline.remark,
        node_ids,
        id: this.$route.query.id,
      };
      this.treeLoading = true;
      this.btnLoading = true;
      const res = await modifyRole(data);
      this.treeLoading = false;
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.handleCancel();
      }
    },
    // 添加
    async addRole(node_ids) {
      const data = {
        role_name: this.formInline.user,
        remarks: this.formInline.remark,
        node_ids,
      };
      this.treeLoading = true;
      this.btnLoading = true;
      const res = await addRole(data);
      this.treeLoading = false;
      this.btnLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.handleCancel();
      }
    },
    // 角色详情
    async getRoleInfo() {
      const data = {
        role_id: this.$route.query?.id || "",
      };
      this.treeLoading = true;
      const res = await getRoleInfo(data);
      this.treeLoading = false;
      if (res.code === 0) {
        this.roleData = res.data.nodeTree;
        const checkedKeys = res.data?.all_checks || [];
        if (checkedKeys.length && this.$route.query?.id) {
          this.formInline.user = res.data.info.role_name;
          this.$nextTick(() => {
            const trees = this.$refs.trees;
            trees.forEach((tree) => {
              checkedKeys.forEach((id) => {
                const node = tree.getNode(id);
                if (node && node.isLeaf) {
                  // 回显时只设置叶子节点，父节点根据子节点选中情况自动选中
                  tree.setChecked(node, true);
                }
              });
            });
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  //   background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
.tree-container {
  display: flex;
  border: 1px solid #ccc;
  min-height: 600px;
}
.add-role {
  float: right;
  margin-bottom: 20px;
}
.el-tree {
  width: 17%;
  border-right: 1px solid #ccc;
  // height: 480px;
  padding: 20px;
}
.authority {
  font-size: 14px;
  color: #606266;
  padding: 10px 0;
  display: block;
}
.configure {
  text-align: center;
}
.tree-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
