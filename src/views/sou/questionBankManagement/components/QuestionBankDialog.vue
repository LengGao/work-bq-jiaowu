<template>
  <!--题库弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="830px"
    class="question-bank-dialog"
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
      class="question-bank-form"
    >
      <el-form-item label="所属分类" prop="category_id">
        <el-cascader
          class="w-100"
          filterable
          clearable
          :props="{ checkStrictly: true }"
          v-model="formData.category_id"
          placeholder="请选择所属分类"
          :options="typeOptions"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="题库名称" prop="title">
        <el-input
          class="w-100"
          v-model="formData.title"
          placeholder="请输入题库名称"
          type="text"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="题库价格">
        <el-input
          class="w-100"
          v-model="formData.price"
          placeholder="请输入题库价格"
          type="number"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="题库排序">
        <el-input
          class="w-100"
          v-model="formData.sort"
          placeholder="排序数字越大题库越靠前"
          type="number"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="题库封面">
        <UploadImg width="280" height="130" v-model="formData.cover" />
      </el-form-item>
      <el-form-item label="题库介绍" class="edit">
        <quill-editor
          v-model="formData.remark"
          :options="editorOption"
          ref="myQuillEditor"
          style="height: 200px"
        >
        </quill-editor>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import {
  updateQuestionBank,
  addQuestionBank,
  questionBankDetail,
} from "@/api/sou";
import UploadImg from "@/components/ImgUpload/index.vue";
export default {
  name: "QuestionBankDialog",
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
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    UploadImg,
    quillEditor,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
        category_id: [],
        remark: "",
        price: "",
        sort: "",
        cover: "",
      },
      rules: {
        title: [{ required: true, message: "请输入题库名称", trigger: "blur" }],
        category_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              //[{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.questionBankDetail();
      }
    },
    // 题库详情
    async questionBankDetail() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await questionBankDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
          if (k === "price") {
            this.formData[k] = +res.data[k];
          }
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
        data.id = this.id;
      }
      const api = this.id ? updateQuestionBank : addQuestionBank;
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
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-bank-dialog {
  .w-100 {
    width: 100%;
  }
  .question-bank-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: calc(100% / 2);
      &.edit {
        height: 260px;
        width: 100%;
      }
    }
  }
}
/deep/.el-dialog__body {
  padding: 30px 50px 30px 20px;
}
.dialog-footer {
  padding: 30px;
}
</style>
