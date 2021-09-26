<template>
  <!--添加编辑班型弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="600px"
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
      <el-form-item label="班型名称" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入班型名称"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="课程类型">
        <el-checkbox-group v-model="formData.items">
          <el-checkbox :label="1">题库</el-checkbox>
          <el-checkbox :label="2">录播</el-checkbox>
          <el-checkbox :label="3">直播</el-checkbox>
          <el-checkbox :label="4">面授</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          type="textarea"
          v-model="formData.remark"
          placeholder="请输入备注信息"
          maxlength="100"
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
import { updateClassType, createClassType } from "@/api/institution";
export default {
  name: "institutionDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
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
      cityOptions: [],
      formData: {
        title: "",
        items: [],
        remark: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
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
      if (this.detailData.id) {
        this.formData.remark = this.detailData.remark;
        this.formData.title = this.detailData.title;
        !!this.detailData.has_question && this.formData.items.push(1);
        !!this.detailData.has_video && this.formData.items.push(2);
        !!this.detailData.has_live && this.formData.items.push(3);
        !!this.detailData.has_teach && this.formData.items.push(4);
      }
    },

    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
        has_question: +this.formData.items.includes(1),
        has_video: +this.formData.items.includes(2),
        has_live: +this.formData.items.includes(3),
        has_teach: +this.formData.items.includes(4),
      };
      if (this.detailData.id) {
        data.id = this.detailData.id;
      }
      const api = this.detailData.id ? updateClassType : createClassType;
      this.addLoading = true;
      const res = await api(data).catch(() => {
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
      this.formData.items = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
</style>