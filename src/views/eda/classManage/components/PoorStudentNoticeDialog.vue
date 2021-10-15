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
      <el-form-item label="学员姓名" prop="money">
        <el-select
          v-model="formData.value1"
          multiple
          placeholder="请选择学员"
          style="width: 100%"
        >
          <el-option
            v-for="item in studentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知标题" prop="money">
        <el-input
          v-model="formData.money"
          placeholder="请输入通知标题"
          maxlength="40"
        />
      </el-form-item>
      <el-form-item label="通知详情" prop="money">
        <el-input
          type="textarea"
          v-model="formData.money"
          placeholder="请输入通知详情"
          maxlength="200"
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
      studentOptions: [],
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