<template>
  <el-dialog
    title="补齐费用"
    :visible.sync="visible"
    width="400px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="20px"
      :model="formData"
      ref="formData"
      v-loading="detaiLoading"
    >
    <el-form-item>
    <el-checkbox-group v-model="formData.items">
          <el-checkbox :label="1">教材费</el-checkbox>
          <el-checkbox :label="2">论文指导费</el-checkbox>
          <el-checkbox :label="3">平台费</el-checkbox>
          <el-checkbox :label="4">论文答辩费</el-checkbox>
          <el-checkbox :label="5">教务服务费</el-checkbox>
          <el-checkbox :label="6">论文处理费</el-checkbox>
        </el-checkbox-group>
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
      visible: this.value,
      formData: {
        items:[],
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
    handleOpen() {
     this.formData.items = []
    },
    async batchUpdateFee() {
      const data = { 
        id_arr:this.ids,
        book_fee_status:+this.formData.items.includes(1),
        paper_teach_fee_status:+this.formData.items.includes(2),
        platform_fee_status:+this.formData.items.includes(3),
        paper_reply_fee_status:+this.formData.items.includes(4),
        service_fee_status:+this.formData.items.includes(5),
        paper_handle_fee_status:+this.formData.items.includes(6),
        };
      console.log(data);
      const res = await batchUpdateFee(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.visible = false;

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
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox{
  width: 130px;
  height: 40px;
}
</style>