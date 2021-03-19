<template>
  <!--添加仓库弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    class="add-warehouse"
    @open="handleOpen"
    @closed="resetForm('ruleForm')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :lg="20" :sm="20" :xs="20" :md="20">
          <el-form-item label="仓库名称" prop="book_name">
            <el-input
              maxlength="30"
              placeholder="请输入仓库名称"
              v-model.trim="formData.book_name"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="20" :sm="20" :xs="20" :md="20">
          <el-form-item label="关联机构" prop="category_id">
            <el-select
              clearable
              style="width: 100%"
              placeholder="请选择关联机构"
              v-model="formData.category_id"
              :options="selectData"
            ></el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
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
      visible: this.value,
      formData: {
        book_name: "",
        category_id: "",
      },
      rules: {
        book_name: [
          { required: true, message: "请输入教材名称", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
      },
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
      const res = await getBookById(data);
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
        data.book_id = this.id;
      }
      const api = this.id ? editBook : addBook;
      const res = await api(data);
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
  },
};
</script>

<style lang="scss" scoped>
</style>