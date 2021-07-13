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
      <el-form-item label="章节名称" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入章节名称"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item label="章节排序" prop="sort">
        <el-input
          type="number"
          v-model="formData.sort"
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
import { updateChapter, createChapter } from "@/api/eda";
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
    detailData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        chapter_name: "",
        sort: "",
      },
      rules: {
        chapter_name: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
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
      if (this.detailData.id) {
        this.formData.chapter_name = this.detailData.name;
        this.formData.sort = this.detailData.sort;
      }
    },

    async submit() {
      const data = {
        classroom_id: this.$route.query?.id || "",
        ...this.formData,
      };
      if (this.detailData.id) {
        data.id = this.detailData.id;
      }
      const api = this.detailData.id ? updateChapter : createChapter;
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

<style lang="scss" scoped>
</style>