<template>
  <!--添加教材弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="800px"
    class="add-teaching-material"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('ruleForm')"
  >
    <el-form
      v-loading="detailLoading"
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="教材名称" prop="book_name">
            <el-input
              maxlength="30"
              placeholder="请输入教材名称"
              v-model.trim="formData.book_name"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="所属分类" prop="category_id">
            <el-cascader
              ref="cascader"
              style="width: 100%"
              placeholder="请选择分类"
              v-model="formData.category_id"
              :options="selectData"
              filterable
              clearable
              :props="{ checkStrictly: true }"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="主编姓名">
            <el-input
              maxlength="30"
              placeholder="请输入分类名称"
              v-model="formData.chief_editor"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="价格">
            <el-input
              maxlength="30"
              type="number"
              placeholder="请输入价格"
              v-model="formData.book_price"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="教材条码">
            <el-input
              maxlength="50"
              placeholder="请输入教材条码"
              v-model="formData.book_isbn"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="出版社">
            <el-input
              maxlength="30"
              placeholder="请输入出版社名称"
              v-model="formData.press"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :lg="12" :sm="12" :xs="12" :md="12">
          <el-form-item label="教材封面" class="upload-cover">
            <el-upload
              name="image"
              :headers="headers"
              :action="uploadImageUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeAvatarUpload"
            >
              <div v-if="formData.book_cover" class="imgs">
                <img :src="formData.book_cover" />
                <i class="del el-icon-close" @click.stop="hanldeDelete"></i>
              </div>
              <i
                v-if="!uploadLoading && !formData.book_cover"
                class="el-icon-plus upload-cover-icon"
              ></i>
              <i
                class="el-icon-loading upload-cover-icon"
                v-if="uploadLoading"
              ></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { uploadImageUrl } from "@/api/educational";
import { addBook, getBookById, editBook } from "@/api/sou";
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
    selectData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
      formData: {
        book_name: "",
        category_id: "",
        book_cover: "",
        chief_editor: "",
        book_price: "",
        book_isbn: "",
        press: "",
      },
      rules: {
        book_name: [
          { required: true, message: "请输入教材名称", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
      },
      addLoading: false,
      uploadLoading: false,
      detailLoading: false,
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
        this.getBookById();
      }
    },
    async getBookById() {
      const data = {
        book_id: this.id,
      };
      this.detailLoading = true;
      const res = await getBookById(data).catch(() => {
        this.detailLoading = false;
      });
      this.detailLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        category_id: Array.isArray(this.formData.category_id)
          ? [...this.formData.category_id].pop()
          : this.formData.category_id,
      };
      if (this.id) {
        data.book_id = this.id;
      }
      this.addLoading = true;
      const api = this.id ? editBook : addBook;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(`教材${this.id ? "编辑" : "新增"}成功`);
        this.hanldeCancel();
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
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
    hanldeDelete() {
      this.formData.book_cover = "";
    },
    handleUploadError() {
      this.$message.error("上传失败");
      this.uploadLoading = false;
    },
    handleAvatarSuccess(res) {
      this.uploadLoading = false;
      this.formData.book_cover = res.data?.data?.url || "";
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf("image") !== -1;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isImg) {
        this.$message.error("请上传图片");
        return;
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return;
      }

      this.uploadLoading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
