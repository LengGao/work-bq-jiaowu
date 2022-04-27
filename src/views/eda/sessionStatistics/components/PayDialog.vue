<template>
  <el-dialog
    title="补齐费用"
    :visible="value"
    width="400px"
    :close-on-click-modal="false"
    @close="hanldeClose"
    @closed="resetForm"
  >
    <el-form label-width="100px" :model="formData" ref="formData">
      <el-form-item
        :label="item"
        v-for="(item, type) in expenseTypeForm"
        :key="type"
      >
        <el-radio-group v-model="formData[`type${type}`]">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { batchSaveFee } from "@/api/eda";
import { mapGetters } from "vuex";
export default {
  name: "PayDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {},
      submitLoading: false,
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    expenseTypeForm() {
      for (const k in this.expenseType) {
        this.$set(this.formData, `type${k}`, -1);
      }
      return this.expenseType;
    },
  },
  methods: {
    async batchSaveFee() {
      const data = {
        id_arr: this.ids,
        ...this.formData,
      };
      this.submitLoading = true;
      const res = await batchSaveFee(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeClose();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.batchSaveFee();
        }
      });
    },
    resetForm() {
      for (const k in this.formData) {
        this.formData[k] = -1;
      }
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  width: 130px;
  height: 40px;
}
</style>