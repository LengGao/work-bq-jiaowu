<template>
  <el-dialog
    title="补齐费用"
    :visible="value"
    width="400px"
    :close-on-click-modal="false"
    @close="hanldeClose"
    @closed="resetForm('formData')"
  >
    <el-form label-width="100px" :model="formData" ref="formData">
      <el-form-item label="教材费">
        <el-radio-group v-model="formData.book_fee_status">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="平台费">
        <el-radio-group v-model="formData.platform_fee_status">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教务服务费">
        <el-radio-group v-model="formData.service_fee_status">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="论文指导费">
        <el-radio-group v-model="formData.paper_teach_fee_status">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="论文答辩费">
        <el-radio-group v-model="formData.paper_reply_fee_status">
          <el-radio :label="1">已缴</el-radio>
          <el-radio :label="0">未缴</el-radio>
          <el-radio :label="-1">不处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="论文处理费">
        <el-radio-group v-model="formData.paper_handle_fee_status">
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
import { batchUpdateFee } from "@/api/eda";
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
      formData: {
        book_fee_status: -1,
        paper_teach_fee_status: -1,
        platform_fee_status: -1,
        paper_reply_fee_status: -1,
        service_fee_status: -1,
        paper_handle_fee_status: -1,
      },
      submitLoading: false,
    };
  },
  methods: {
    async batchUpdateFee() {
      const data = {
        id_arr: this.ids,
        ...this.formData,
      };
      this.submitLoading = true;
      const res = await batchUpdateFee(data).catch(() => {});
      this.submitLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeClose();
      }
    },
    submitForm(formName) {
      console.log(this.formData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.batchUpdateFee();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = -1;
      }
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
// 2.20:10000，3.20:10000,4.20:10000,5.20:10000,6.20:10000,7.20:10000
//
// 18号1点30的车，那么12点半到达隆回，11点要去花桥坐到车，11点之前赶往花桥。
</script>

<style lang="scss" scoped>
.el-checkbox {
  width: 130px;
  height: 40px;
}
</style>