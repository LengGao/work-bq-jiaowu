<template>
  <!-- 合同审核弹窗 -->
  <section>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      width="550px"
      @open="handleOpen"
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
          <el-form-item label="项目名称" prop="project_str">
            <el-input
              placeholder="项目名称"
              v-model="ruleForm.project_str"
              style="width: 340px"
            ></el-input>
          </el-form-item>

          <el-form-item label="审核类型" prop="audit_type">
            <el-radio-group v-model="ruleForm.audit_type">
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
import { templateadd, templateedit, uploadUrl } from "@/api/system";
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
    contractInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    project_str: {
      type: [String, Number],
      default: "",
    },
  },

  mounted() {
    // this.order_no = this.id
  },
  data() {
    return {
      dialogTitle: "合同审核",
      visible: this.value,
      ruleForm: {
        id: "",
        audit_type: 0,
        audit_content: "",
        project_str: "",
      },
      rules: {
        project_str: [
          { required: true, message: "请输入合同id", trigger: "blur" },
        ],
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
        console.log(this.ruleForm[k]);
        this.ruleForm[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
      this.$emit("on-success");
    },
    handleOpen() {
      if (this.contractInfo.id) {
        for (var i in this.contractInfo) {
          this.ruleForm[i] = this.contractInfo[i];
        }
      }
    },

    hanldeCancel() {
      this.$emit("input", false);
    },
    //审核合同接口
    async contractaudit() {
      const data = {
        id: this.ruleForm.id,
        audit_type: this.ruleForm.audit_type,
        audit_content: this.ruleForm.audit_content,
      };
      data.audit_type === 1 && delete data.audit_content;
      const res = await contractaudit(data);
      this.listData = res.data.data;
      if (res.code == 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.$refs[formName].resetFields();
      }
    },

    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (this.ruleForm.id) {
            //修改
            this.contractaudit();
            this.hanldeCancel();
            this.$refs[formName].resetFields();
          } else {
            //添加
            this.contractaudit();
            this.$refs[formName].resetFields();
            this.hanldeCancel();
            this.$emit("on-success");
          }
        } else {
          console.log("审核已拒绝");
          this.hanldeCancel();
          return false;
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
  .title {
    display: block;
    height: 16px;
    line-height: 16px;
    border-left: 3px solid rgb(1, 153, 255);
    padding-left: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
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