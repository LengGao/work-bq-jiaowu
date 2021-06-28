<template>
  <!--添加编辑章节弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="450px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="学历形式" prop="video_chapter_name">
        <el-input
          v-model="formData.video_chapter_name"
          placeholder="请输入学历形式"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item label="位置排序" prop="video_chapter_sort">
        <el-input
          type="number"
          v-model="formData.video_chapter_sort"
          placeholder="请输入"
          maxlength="10"
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
import {
  editvideochapter,
  addvideochapter,
  getVideochapterDetail,
} from "@/api/sou";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
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
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      if (this.id) {
        this.getVideochapterDetail();
      }
    },

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
      this.selection = [];
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>