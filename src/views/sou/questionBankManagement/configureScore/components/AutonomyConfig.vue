
<template>
  <div class="cutonomy-config">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="单选题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="多选题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="判断题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="填空题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="简答题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="案例题" prop="video_chapter_name">
        <span>每题</span>
        <el-input
          class="input-scores"
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入"
          maxlength="10"
        />
        <span>分</span>
      </el-form-item>
      <el-form-item label="多选题场景" prop="video_chapter_name">
        {{ formData.resource }}
        <el-radio-group v-model="formData.resource">
          <el-radio label="1">少选不得分</el-radio>
          <el-radio label="2"
            >少选每个选项<el-input
              class="input-scores"
              type="number"
              v-model="formData.video_chapter_name"
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
import {
  editvideochapter,
  addvideochapter,
  getVideochapterDetail,
} from "@/api/sou";
export default {
  name: "OverTheYearConfig",
  props: {
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        video_chapter_name: "",
        video_chapter_profile: "",
        video_chapter_sort: "",
      },
      rules: {
        video_chapter_name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        video_chapter_sort: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },

  methods: {
    async getVideochapterDetail() {
      const data = {
        video_chapter_id: this.id,
      };
      this.detaiLoading = true;
      const res = await getVideochapterDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.video_chapter_id = this.id;
      } else {
        data.video_collection_id = this.$route.query?.video_collection_id || "";
      }
      const api = this.id ? editvideochapter : addvideochapter;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
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
.cutonomy-config {
  .el-form-item {
    width: 500px;
    color: #606266;
    /deep/.el-form-item__label {
      padding-right: 20px;
    }
    .input-scores {
      margin: 0 10px;
      width: 90px;
    }
  }
}
</style>