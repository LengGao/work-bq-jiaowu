<template>
  <!--上课通知弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="550px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @open="handleOpen"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="通知标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入通知标题"
          maxlength="120"
        />
      </el-form-item>
      <el-form-item label="上课时间" prop="time">
        <el-input
          v-model="formData.time"
          placeholder="请输入上课时间"
          maxlength="120"
        />
      </el-form-item>
      <el-form-item label="上课内容" prop="content">
        <el-input
          v-model="formData.content"
          placeholder="请输入上课内容"
          maxlength="400"
        />
      </el-form-item>
      <el-form-item label="上课地点" prop="address">
        <el-input
          v-model="formData.address"
          placeholder="请输入上课地点"
          maxlength="120"
        />
      </el-form-item>
      <el-form-item label="注意事项" prop="remarks">
        <el-input
          type="textarea"
          v-model="formData.remarks"
          placeholder="请输入注意事项"
          maxlength="400"
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
import { createClassroomMessage, updateClassroomMessage } from "@/api/message";
export default {
  name: "classNoticeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
        time: "",
        content: "",
        address: "",
        remarks: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        time: [{ required: true, message: "请输入", trigger: "blur" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        remarks: [{ required: true, message: "请输入", trigger: "blur" }],
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
      if (this.data.id) {
        for (const k in this.formData) {
          this.formData[k] = this.data[k] || "";
        }
      }
    },
    async submit() {
      let data = {};
      let api = null;
      if (this.data.id) {
        data = {
          ...this.formData,
          id: this.data.id,
        };
        api = updateClassroomMessage;
      } else {
        data = {
          ...this.formData,
          type: 1,
          classroom_id: this.$route.query.id,
        };
        api = createClassroomMessage;
      }
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
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>