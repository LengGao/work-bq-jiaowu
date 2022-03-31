<template>
  <div>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="题目总数" class="w-300" prop="topic_num">
        <el-input
          type="number"
          @mousewheel.native.prevent
          v-model="formData.topic_num"
          placeholder="请输入题目总数"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="考试总分" class="w-300" prop="score">
        <el-input
          type="number"
          @mousewheel.native.prevent
          v-model="formData.score"
          placeholder="请输入考试总分"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="合格分数" class="w-300" prop="pass_score">
        <el-input
          type="number"
          @mousewheel.native.prevent
          v-model="formData.pass_score"
          placeholder="请输入合格分数"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="考试时长" class="w-300" prop="test_time">
        <el-input
          type="number"
          @mousewheel.native.prevent
          v-model="formData.test_time"
          placeholder="请输入考试时长"
          maxlength="10"
          class="input-time"
        />
        <span>分钟</span>
      </el-form-item>
      <el-form-item class="form-item-submit">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button
          type="primary"
          :loading="addLoading"
          @click="submitForm('formData')"
          >确 定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setConfig, getConfig } from "@/api/sou";
export default {
  name: "BasicConfig",
  data() {
    return {
      formData: {
        id: "",
        topic_num: "",
        pass_score: "",
        score: "",
        test_time: "",
      },
      rules: {
        topic_num: [{ required: true, message: "请输入", trigger: "blur" }],
        pass_score: [{ required: true, message: "请输入", trigger: "blur" }],
        score: [{ required: true, message: "请输入", trigger: "blur" }],
        test_time: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    async getConfig() {
      const data = {
        question_bank_id: this.$route.query.id,
      };
      this.detaiLoading = true;
      const res = await getConfig(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = +res.data[k];
        }
        this.$emit("on-conifg-id", res.data.id);
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };

      this.addLoading = true;
      const res = await setConfig(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    hanldeCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.w-300 {
  width: 400px;
}
.input-time {
  width: 250px;
  margin-right: 10px;
}
.form-item-submit {
  button {
    margin-left: 26px;
  }
}
</style>