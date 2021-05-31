<template>
  <!-- 合同审核弹窗 -->
  <section>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      width="550px"
      :close-on-click-modal="false"
      @closed="resetForm('ruleForm')"
    >
      <div class="content">
        <el-form
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :show-message="true"
          class="formmargin"
        >
          <el-form-item label="审核类型" prop="audit_type">
            <el-radio-group
              v-model="ruleForm.audit_type"
              @change="ruleForm.audit_content = ''"
            >
              <el-radio :label="1">同意</el-radio>
              <el-radio :label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="拒绝原因"
            prop="audit_content"
            v-if="ruleForm.audit_type == 2"
          >
            <el-input
              type="textarea"
              v-model="ruleForm.audit_content"
              style="width: 340px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { contractaudit } from "@/api/fina";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogTitle: "合同审核",
      visible: this.value,
      ruleForm: {
        audit_type: 0,
        audit_content: "",
      },
      rules: {
        audit_type: [{ required: true, message: "请选择", trigger: "blur" }],
        audit_content: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    resetForm(formName) {
      for (var k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
    //审核合同接口
    async contractaudit() {
      const data = {
        id: this.id,
        audit_type: this.ruleForm.audit_type,
        audit_content: this.ruleForm.audit_content,
      };
      const res = await contractaudit(data);
      this.listData = res.data.data;
      if (res.code == 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeCancel();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.contractaudit();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table_bottom {
  text-align: right;
}
.content {
  padding: 0 30px 30px 30px;
}
.content .title {
  display: block;
  height: 16px;
  line-height: 16px;
  border-left: 3px solid rgb(1, 153, 255);
  padding-left: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 10px;
}

[data-v-7af6cb0d] .el-form-item {
  margin-bottom: 25px;
}
.btnspan {
  color: rgb(172, 172, 172);
  margin-left: 10px;
}
.formmargin {
  padding-bottom: 20px;
}
/deep/.el-dialog__footer {
  padding: 0 40px 40px 0;
}
.el-radio-group label {
  width: 70px;
  margin-top: 15px;
  // display: flex;
}
/deep/.el-radio-group {
  display: flex;
}
</style>