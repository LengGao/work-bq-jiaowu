<template>
  <div class="send-sms">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-input v-model="formData.time" placeholder="请输入时间" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="地点" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地点" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="formData.remarks" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="onSubmit">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendMessage } from "@/api/exa";
export default {
  name: "SendSMS",
  data() {
    return {
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
    };
  },
  methods: {
    async sendMessage() {
      const data = {
        id: this.$route.query.id,
        ...this.formData,
      };
      const res = await sendMessage(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm();
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.sendMessage();
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.send-sms {
  width: 400px;
}
</style>