<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="role_name" label="角色名称">
        <el-input v-model="ruleForm.role_name"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="personCharge" label="角色类型">
        <el-radio-group v-model="radio">
          <el-radio :label="3">普通角色</el-radio>
          <el-radio :label="6">授课老师</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item prop="remarks" label="备注信息">
        <el-input
          v-model="ruleForm.remarks"
          style="width:496px"
          placeholder="请输入备注信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限设置">
        <el-tree
          ref="tree"
          :data="register"
          show-checkbox
          node-key="node_id"
          :default-checked-keys="all_checks"
          :default-expanded-keys="[]"
          :props="defaultProps"
          :check-strictly="ischeck"
          @check-change="handleCheckChange"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button @click="preserve('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'addCourse',
  data() {
    return {
      ischeck: false,
      all_checks: [],
      role_id: '',
      ruleForm: {
        role_name: '',
        remarks: '',
        node_ids: [],
      },
      register: [],
      defaultProps: {
        label: 'title',
        children: 'children',
      },
      rules: {
        role_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.role_id = this.$route.query.role_id
    this.$api.getRegister(this, 'register')
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    preserve(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.role_id !== undefined) {
            this.$api.modifyRegister(this, this.ruleForm)
          } else {
            this.$api.addRegister(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate)
      var checkKey = this.$refs.tree.getHalfCheckedKeys() //获取父级id

      var checkKeys = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
      console.log(checkKeys)
      this.ruleForm.node_ids = checkKeys
      // let data1 = this.$refs.tree.getCheckedNodes()
      // console.log(data1)
      // this.ruleForm.node_ids = data1.map((i) => {
      //   return i.node_id
      // })
      // console.log(this.ruleForm.node_ids)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
/deep/.el-form-item {
  margin-bottom: 30px;
}
// /deep/.el-tree-node.is-expanded > .el-tree-node__children {
//   display: flex;
// }
.el-input {
  width: 280px;
}
</style>
