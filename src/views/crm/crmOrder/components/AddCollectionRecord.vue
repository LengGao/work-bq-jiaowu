<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="750px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    class="add-collection-dialog"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      inline
    >
      <el-form-item label="回款日期" prop="pay_date">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_date"
          value-format="yyyy-MM-dd"
          :picker-options="{
            disabledDate: disabledDate,
          }"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回款期次" prop="region">
        <el-select
          class="input"
          v-model="formData.plan_id"
          placeholder="请选择回款期次"
          clearable
        >
          <el-option
            v-for="(item, index) in planOptions"
            :key="item.id"
            :label="`第${index + 1}期 ${item.day} ￥${(
              +item.money || 0
            ).toFixed(2)}`"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回款金额" prop="pay_money">
        <el-input
          class="input"
          v-model="formData.pay_money"
          type="number"
          placeholder="请输入回款金额"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择支付方式"
          class="input"
          filterable
        >
          <el-option
            v-for="item in payMethodOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回款凭证">
        <el-upload
          :headers="headers"
          :action="uploadImageUrl"
          :on-remove="handleRemoveImg"
          :before-remove="beforeRemoveImg"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          multiple
          list-type="picture-card"
          name="image"
          accept="image/*"
          :file-list="formData.receipt_file"
        >
          <i class="el-icon-plus" style="font-size: 14px"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="tips">
        <el-input
          style="width: 550px"
          v-model="formData.tips"
          type="textarea"
          placeholder="请输入备注"
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
import { payLogCreate, getCustomfieldOptions } from "@/api/crm";
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "AddCollectionRecord",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    orderId: {
      type: [String, Number],
      default: "",
    },
    planOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
      payMethodOptions: [],
      formData: {
        plan_id: "",
        tips: "",
        pay_date: "",
        pay_money: "",
        pay_type: "",
        receipt_file: [],
      },
      rules: {
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getCustomfieldOptions();
    },
    handleUploadError(response, file, fileList) {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(fileList);
      this.formData.receipt_file = fileList;
    },
    handleRemoveImg(file, fileList) {
      this.formData.receipt_file = fileList;
    },
    beforeRemoveImg(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 获取支付方式
    async getCustomfieldOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.payMethodOptions = res.data.field_content;
      }
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    async submit() {
      const data = {
        ...this.formData,
        receipt_file: this.formData.receipt_file.map((item) => {
          if (item.url && !item.url.includes("blob:")) {
            return item.url;
          }
          return item.response.data.data.url;
        }),
        order_id: this.orderId,
      };
      this.addLoading = true;
      const res = await payLogCreate(data).catch(() => {
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
      this.formData.receipt_file = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-collection-dialog {
  .input {
    width: 217px;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
  }
  /deep/.el-upload--picture-card {
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
}
</style>