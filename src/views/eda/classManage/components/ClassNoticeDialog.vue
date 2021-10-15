<template>
  <!--上课通知弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="550px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="通知标题" prop="money">
        <el-input
          v-model="formData.money"
          placeholder="请输入通知标题"
          maxlength="40"
        />
      </el-form-item>
      <el-form-item label="上课时间" prop="money">
        <el-input
          v-model="formData.money"
          placeholder="请输入上课时间"
          maxlength="40"
        />
      </el-form-item>
      <el-form-item label="上课内容" prop="money">
        <el-input
          v-model="formData.money"
          placeholder="请输入上课内容"
          maxlength="40"
        />
      </el-form-item>
      <el-form-item label="上课地点" prop="money">
        <el-input
          v-model="formData.money"
          placeholder="请输入上课地点"
          maxlength="40"
        />
      </el-form-item>
      <el-form-item label="注意事项" prop="money">
        <el-input
          type="textarea"
          v-model="formData.money"
          placeholder="请输入注意事项"
          maxlength="120"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { institutionRecharge } from "@/api/institution";
export default {
  name: "classNoticeDialog",
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
      visible: this.value,
      formData: {
        money: "",
        dec: "",
      },
      rules: {
        money: [{ required: true, message: "请输入", trigger: "blur" }],
        dec: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    async submit() {
      const data = {
        ...this.formData,
      };
      this.addLoading = true;
      const res = await institutionRecharge(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success");
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
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.w-90 {
  width: 90%;
}
</style>