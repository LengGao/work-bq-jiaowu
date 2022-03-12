<template>
  <!--添加编辑章节弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="540px"
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
      <el-form-item
        label="届别分类"
        prop="name"
      >
        <el-input
          v-model="formData.title"
          placeholder="请输入届别名称"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item
        label="`届别排序`"
        prop="sort"
      >
        <el-input
          type="number"
          v-model="formData.count"
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
import { postXiuGaiJieBie } from "@/api/crm";
export default {
  name: "editGradeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    currentNode: {
      type: [String, Number, Object],
      default: "",
    },
    success: {
      type: Function,
      defaultL: () => {}
    }
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
        count: "",
      },
      rules: {
        title: [{ required: true, message: "请输入分类名", trigger: "blur" }],
        count: [{ required: true, message: "请输入排序", trigger: "blur" }],
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
      let target = Object.assign(this.formData, this.currentNode)
      this.formData = target
    },
    async submit() {
      const data = this.formData,
            api = postXiuGaiJieBie
      const res = await api(data).catch(() => {})
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("success", {})
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
      this.formData.time = [];
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