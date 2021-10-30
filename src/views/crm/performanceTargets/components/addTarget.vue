<template>
  <!--添加年度目标-->
  <el-dialog
    title="添加年度目标"
    :visible.sync="visible"
    width="400px"
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
      <el-form-item label="目标年度" prop="title">
        <el-select v-model="formData.title" placeholder="请选择">
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import { updateClassType, createClassType } from "@/api/institution";
export default {
  name: "institutionDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      yearOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {},

    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
        has_question: +this.formData.items.includes(1),
        has_video: +this.formData.items.includes(2),
        has_live: +this.formData.items.includes(3),
        has_teach: +this.formData.items.includes(4),
      };
      this.addLoading = true;
      const res = await createClassType(data).catch(() => {
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
      this.formData.items = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
</style>