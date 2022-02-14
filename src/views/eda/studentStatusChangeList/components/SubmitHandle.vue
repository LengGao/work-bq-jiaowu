<template>
  <el-dialog
    title="提交办理"
    :visible="value"
    width="400px"
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
      <el-form-item label="办理日期" prop="transact_time">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formData.transact_time"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
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
import { transactTransaction } from "@/api/sou";
export default {
  name: "SubmitHandle",
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
        transact_time: "",
      },
      rules: {
        transact_time: [
          { required: true, message: "请选择", trigger: "change" },
        ],
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
      const res = await transactTransaction(data).catch(() => {
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
