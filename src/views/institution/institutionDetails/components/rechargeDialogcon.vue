<template>
  <!--机构充值弹窗-->
  <el-dialog
    title="机构充值"
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
      <el-form-item label="机构名称">
        <el-input :value="this.$route.query.institution_name" disabled />
      </el-form-item>
      <el-form-item label="充值金额" prop="money">
        <el-input
          type="number"
          v-model="formData.money"
          placeholder="请输入金额"
          class="w-90"
        />
        元
      </el-form-item>
      <el-form-item label="备注信息" prop="dec">
        <el-input
          v-model="formData.dec"
          placeholder="请输入备注信息"
          maxlength="40"
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
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
    detailData: {
      type: Object,
      default: () => ({}),
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
  created(){
    // console.log(this.$route.query.institution_name)
  },
  methods: {
    async submit() {
      const data = {
        institution_id: this.$route.query.institution_id || "",
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