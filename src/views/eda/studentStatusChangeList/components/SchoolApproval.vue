<template>
  <el-dialog
    title="学校审批"
    :visible="value"
    width="450px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="审批日期" prop="approve_time">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formData.approve_time"
          type="date"
          class="input"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审批意见" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="3">通过</el-radio>
          <el-radio label="4">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          class="input"
          v-model="formData.remark"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { approveTransaction } from "@/api/sou";
export default {
  name: "SchoolApproval",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      addLoading: false,
      formData: {
        approve_time: "",
        status: "",
        remark: "",
      },
      rules: {
        approve_time: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  methods: {
    async submit() {
      const data = {
        id: this.id,
        ...this.formData,
      };
      this.addLoading = true;
      const res = await approveTransaction(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("success");
        this.hanldeClose();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="less" scoped>
.input {
  width: 237px;
}
</style>
