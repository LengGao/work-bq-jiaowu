<template>
  <!--添加编辑章节弹窗-->
  <div class="">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="题目总数" class="w-300" prop="video_chapter_name">
        <el-input
          type="number"
          v-model="formData.video_chapter_name"
          placeholder="请输入题目总数"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="考试总分" class="w-300" prop="video_chapter_sort">
        <el-input
          type="number"
          v-model="formData.video_chapter_sort"
          placeholder="请输入考试总分"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="合格分数" class="w-300" prop="video_chapter_sort">
        <el-input
          type="number"
          v-model="formData.video_chapter_sort"
          placeholder="请输入合格分数"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="考试时长" class="w-300" prop="video_chapter_sort">
        <el-input
          type="number"
          v-model="formData.video_chapter_sort"
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
import {
  editvideochapter,
  addvideochapter,
  getVideochapterDetail,
} from "@/api/sou";
export default {
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