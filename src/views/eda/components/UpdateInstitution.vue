<template>
  <el-dialog
    title="更换所属机构"
    :visible.sync="visible"
    width="450px"
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
      <el-form-item label="机构名称" prop="institution_id">
        <el-cascader
          placeholder="请选择"
          v-model="formData.institution_id"
          :options="institutionData"
          clearable
          filterable
        ></el-cascader>
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
import { updateUserFromOrgId } from "@/api/eda";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
      default: () => [],
    },
    institutionData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        institution_id: "",
      },
      rules: {
        institution_id: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
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
      const institution_id = this.formData.institution_id;
      const data = {
        institution_id: Array.isArray(institution_id)
          ? institution_id.pop()
          : institution_id,
        uid_arr: this.ids,
      };
      this.addLoading = true;
      const res = await updateUserFromOrgId(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>