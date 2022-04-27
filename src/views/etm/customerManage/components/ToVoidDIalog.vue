<template>
  <!--学生中心列表-作废弹框-->
  <el-dialog
    title="作废/退款"
    :visible.sync="visible"
    width="400px"
    class="to-void-dialog"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formData">
      <el-form-item label="退款金额">
        <el-input
          v-model="formData.money"
          placeholder="请输入退款金额"
          type="number"
          @mousewheel.native.prevent
        />
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          v-model="formData.tips"
          placeholder="请输入备注信息"
          type="textarea"
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
import { cancelIntent } from "@/api/etm";
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
    intentId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        money: "",
        tips: "",
      },
      rules: {},
      addLoading: false,
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
        uid: this.id,
        intent_id: this.intentId,
        money: this.formData.tips || 0,
        tips: this.formData.tips,
      };

      this.addLoading = true;
      const res = await cancelIntent(data).catch(() => {
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