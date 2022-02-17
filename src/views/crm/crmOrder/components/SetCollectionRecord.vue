<template>
  <el-dialog
    :title="title"
    :visible="value"
    width="750px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @close="handleClose"
    @closed="resetForm('formData')"
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
      <el-button @click="handleClose">取 消</el-button>
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
import { getCustomfieldOptions } from "@/api/crm";
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "SetCollectionRecord",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    staffOptions: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      formData: {
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
      payMethodOptions: [],
    };
  },
  methods: {
    handleOpen() {
      this.getCustomfieldOptions();
      if ("pay_date" in this.data) {
        this.formData = { ...this.data };
        if (this.data.receipt_file) {
          this.formData.receipt_file = this.data.receipt_file.map((item) => ({
            url: item,
          }));
        }
      }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("on-success", {
            ...this.formData,
            verify_status: 0,
            receipt_file: this.formData.receipt_file.map((item) => {
              if (item.url && !item.url.includes("blob:")) {
                return item.url;
              }
              return item.response.data.data.url;
            }),
          });
          this.handleClose();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData = {
        tips: "",
        pay_date: "",
        pay_money: "",
        pay_type: "",
        receipt_file: [],
      };
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>