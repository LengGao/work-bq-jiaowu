<template>
  <!--添加小程序版本-->
  <el-dialog
    title="发布新版本"
    :visible.sync="visible"
    width="500px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="模板ID" prop="template_id">
        <el-select
          style="width: 100%"
          v-model="formData.template_id"
          placeholder="请选择模板ID"
          filterable
        >
          <el-option
            v-for="item in versionOptions"
            :label="item.template_id"
            :value="item.template_id"
            :key="item.template_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input disabled :value="getCheckedData.user_version" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input disabled :value="getCheckedData.user_desc" />
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
import { templateSelect, batchCreateCode } from "@/api/institution";
export default {
  name: "AddVersionDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
      versionOptions: [],
      formData: {
        template_id: "",
      },
      rules: {
        template_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    getCheckedData() {
      return (
        this.versionOptions.find(
          (item) => item.template_id === this.formData.template_id
        ) || {}
      );
    },
  },
  methods: {
    handleOpen() {
      this.templateSelect();
    },
    async templateSelect() {
      const res = await templateSelect();
      if (res.code === 0) {
        this.versionOptions = res.data;
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        user_version: this.getCheckedData.user_version,
        user_desc: this.getCheckedData.user_desc,
        org_id_arr: this.$parent.selectedIds,
      };
      this.addLoading = true;
      const res = await batchCreateCode(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$alert(`<p>${res.message}</p>`, {
          dangerouslyUseHTMLString: true,
        });
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
</style>