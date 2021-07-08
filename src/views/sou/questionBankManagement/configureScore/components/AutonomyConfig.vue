
<template>
  <div class="autonomy-config">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="单选题" prop="score1">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score1"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="多选题" prop="score2">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score2"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="判断题" prop="score3">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score3"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="不定项题" prop="score4">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score4"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="填空题" prop="score5">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score5"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="简答题" prop="score6">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score6"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="案例题" prop="score7">
        <span>每题</span>
        <el-input
          class="input-score"
          type="number"
          v-model="formData.score7"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="多选题场景" prop="option_score_status">
        <el-radio-group v-model="formData.option_score_status">
          <el-radio :label="0">少选不得分</el-radio>
          <el-radio :label="1"
            >少选每个选项<el-input
              class="input-score"
              type="number"
              v-model="formData.option_score"
              placeholder="请输入"
              maxlength="10"
            />
            <span>分</span></el-radio
          >
        </el-radio-group>
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
import { setDetailConfig, getDetailConfig } from "@/api/sou";
export default {
  name: "AutonomyConfig",
  props: {
    configId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0,
        score6: 0,
        score7: 0,
        option_score_status: 0,
        option_score: 0,
      },
      rules: {
        score1: [{ required: true, message: "请输入", trigger: "blur" }],
        score2: [{ required: true, message: "请输入", trigger: "blur" }],
        score3: [{ required: true, message: "请输入", trigger: "blur" }],
        score4: [{ required: true, message: "请输入", trigger: "blur" }],
        score5: [{ required: true, message: "请输入", trigger: "blur" }],
        score6: [{ required: true, message: "请输入", trigger: "blur" }],
        score7: [{ required: true, message: "请输入", trigger: "blur" }],
        option_score_status: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      detailData: {},
    };
  },
  created() {
    this.getDetailConfig();
  },
  methods: {
    async getDetailConfig() {
      const data = {
        test_config_id: this.configId,
        type: 3,
      };
      this.detaiLoading = true;
      const res = await getDetailConfig(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
        const detail = res.data.detail;
        detail.config.forEach((item, index) => {
          this.formData[`score${index + 1}`] = item.score;
        });
        this.formData.option_score_status =
          detail.multiple_special.option_score_status;
        this.formData.option_score = detail.multiple_special.option_score;
      }
    },
    async submit() {
      this.detailData.detail.config.forEach((item, index) => {
        item.score = this.formData[`score${index + 1}`];
      });
      this.detailData.detail.multiple_special.option_score_status =
        this.formData.option_score_status;
      this.detailData.detail.multiple_special.option_score =
        this.formData.option_score;
      this.addLoading = true;
      const res = await setDetailConfig(this.detailData).catch(() => {
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
.autonomy-config {
  .el-form-item {
    width: 500px;
    color: #606266;
    /deep/.el-form-item__label {
      padding-right: 20px;
    }
    .input-score {
      margin: 0 10px;
      width: 90px;
    }
  }
}
</style>