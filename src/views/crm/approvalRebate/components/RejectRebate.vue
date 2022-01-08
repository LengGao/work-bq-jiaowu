<template>
  <el-dialog
    title="返点驳回"
    :visible.sync="visible"
    width="600px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    class="add-collection"
  >
    <el-form
      label-width="110px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="驳回原因" prop="reason" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.reason"
          placeholder="请输入驳回原因"
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
import { approveRebate } from "@/api/rebate";
export default {
  name: "RejectRebate",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    contractInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      visible: this.value,
      addLoading: false,
      formData: {
        id:"",
        // institution_name:"",
        // pay_type:"",
        // order_count:"",
        // apply_rebate_price:"",
        // rebate_time:"",
        reason:"",
      },
      rules: {
        reason: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      listData: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {

  },
  methods: {
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    handleOpen() {
      if (this.contractInfo.id) {
        for (var i in this.formData) {
          console.log(i)
          this.formData[i] = this.contractInfo[i] || '';
        }
     }
     console.log(this.formData.id)
    },

   //审核返点
    async approveRebate() {
      const data = {
        id: this.formData.id,
        // institution_name: this.formData.institution_name,
        // real_rebate_price: this.formData.real_rebate_price,
        // rebate_time: this.formData.rebate_time,
        reason: this.formData.reason,
        status:2,
      };
      const res = await approveRebate(data);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.visible = false;
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.approveRebate();
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
       this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 244px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.el-textarea{
  width: 92%;
}
/deep/.el-textarea__inner{
  height: 140px;
}
</style>
