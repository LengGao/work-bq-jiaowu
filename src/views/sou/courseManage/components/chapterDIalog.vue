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
    >
      <el-form-item label="章节名称" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入章节名称"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item label="章节简介" prop="chapter_intro">
        <el-input
          type="textarea"
          v-model="formData.chapter_intro"
          placeholder="请输入章节简介"
          maxlength="1000"
        />
      </el-form-item>
      <el-form-item label="章节排序" prop="sort">
        <el-input
          type="number"
          @mousewheel.native.prevent
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
import { updateChapter, createChapter } from "@/api/sou";
export default {
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
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        chapter_name: "",
        chapter_intro: "",
        sort: "",
      },
      rules: {
        chapter_name: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
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
      if (this.id) {
        this.formData.chapter_name = this.data.name;
        this.formData.sort = this.data.sort;
        this.formData.chapter_intro = this.data.chapter_intro;
      }
    },

    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.id = this.id;
      } else {
        data.course_id = this.$route.query?.course_id || "";
      }
      const api = this.id ? updateChapter : createChapter;
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
</style>