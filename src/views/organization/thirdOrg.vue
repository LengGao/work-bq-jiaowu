<template>
  <section class="main">
    <div class="recommend_head">
      <div class="head_search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2">
        </el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <el-button type="primary" @click="toEditOrgan">添加机构</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table ref="multipleTable" :data="schoolData.list" style="width: 100%" class="min_table" row-key="institution_id" :tree-props="{ children: 'Blocks' }" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="institution_name" label="机构名称" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="host_man" label="负责人" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="telephone" label="联系方式" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recommend_num" label="推荐学员" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transactions_num" label="成交学员" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="refund_quantity" label="退费学员" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center;">
              <el-button type="text" @click="handleEdit(scope.row)" style="padding-right:20px">学员管理</el-button>
              <!-- <el-button type="text" v-if="scope.row.parent_id == '0'" @click="addCampus(scope.row)" style="padding-right:20px">添加校区</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.total" :curpage="page" @pageChange="doPageChange" />
        </div>
      </div>
      <el-dialog :title="dialogTitle == true ? '编辑校区' : '添加校区'" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属机构" prop="organizationName">
            <el-input v-model="ruleForm.organizationName" disabled></el-input>
          </el-form-item>
          <el-form-item label="校区名称" prop="institution_name">
            <el-input v-model="ruleForm.institution_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="conserve('ruleForm')">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
export default {
  name: 'recommender',
  data() {
    return {
      input2: '',
      value: '',
      page: 1,
      ruleForm: {},
      dialogVisible: false,
      schoolData: [],
      dialogTitle: false,
      ruleForm: {
        parent_id: '',
        institution_name: '',
        organizationName: '',
      },
      rules: {
        institution_name: [
          { required: true, message: '请输入校区名称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.$api.getRecommender(this, 'schoolData')
  },
  methods: {
    conserve(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == true) {
            this.$api.modifyBlock(this, this.ruleForm)
          } else {
            this.$api.addBlock(this, this.ruleForm)
          }
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
      // this.dialogVisible = true
    },
    addCampus(zx) {
      console.log(zx)
      this.dialogTitle = false
      this.ruleForm.parent_id = zx.institution_id
      this.ruleForm.organizationName = zx.institution_name
      this.dialogVisible = true
    },
    toEditOrgan() {
      this.$router.push({
        path: '/eda/editOrgan',
      })
    },
    handleEdit(ac) {
      console.log(ac)
      if (ac.parent_id == 0) {
        this.$router.push({
          path: '/org/manger',
          query: { institution_id: ac.institution_id },
        })
      } else {
        console.log(ac)
        this.dialogTitle = true
        this.ruleForm.parent_id = ac.institution_id
        this.ruleForm.institution_name = ac.institution_name
        this.ruleForm.organizationName = ac.parent_name
        this.dialogVisible = true
      }
    },
    handleDelete(ab) {
      console.log(ab.institution_id)
      this.$api.deleteInstitution(this, ab.institution_id)
    },
    doPageChange(page) {
      console.log(page)
      this.page = page
      this.$api.getRecommender(this, 'schoolData')
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content .el-input__inner {
  max-width: 240px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  background: #fff;
  padding: 20px;
  margin: 20px;
}
.userTable {
  margin-top: 20px;
}
.recommend_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head_search {
    .el-input {
      width: 267px;
      margin-right: 20px;
    }
  }
}
</style>
