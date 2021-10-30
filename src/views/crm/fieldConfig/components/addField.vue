<template>
  <!--添加编辑班型弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="430px"
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
      <el-form-item label="字段名称" prop="title">
        <el-input
          class="input"
          v-model="formData.title"
          placeholder="请输入字段名称"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="字段类型" prop="region">
        <el-select v-model="formData.region" placeholder="请选择字段类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否必填" prop="resource">
        <el-radio-group v-model="formData.resource">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="`选项${index + 1}`"
        v-for="(item, index) in formData.options"
        :key="item.id"
        :rules="[
          { required: true, message: `请输入${index}`, trigger: 'blur' },
        ]"
        :prop="`options[${index}].label`"
      >
        <el-input
          class="input"
          v-model="formData.options[index].label"
          placeholder="请输入选项内容"
          maxlength="30"
        />
        <el-button
          :disabled="formData.options.length <= 1"
          @click="delOption(index)"
          style="margin-left: 10px"
          type="text"
          icon="el-icon-remove-outline"
        ></el-button>
        <el-button
          type="text"
          @click="addOption"
          icon="el-icon-circle-plus-outline"
        ></el-button>
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
      cityOptions: [],
      formData: {
        title: "",
        items: [],
        remark: "",
        options: [
          {
            label: "",
            id: 1,
          },
        ],
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
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
    handleOpen() {},
    addOption() {
      this.formData.options.push({
        label: "",
        id: Date.now(),
      });
    },
    delOption(index) {
      this.formData.options.splice(index, 1);
    },
    async submit() {
      const data = {
        title: this.formData.title,
        remark: this.formData.remark,
        has_question: +this.formData.items.includes(1),
        has_video: +this.formData.items.includes(2),
        has_live: +this.formData.items.includes(3),
        has_teach: +this.formData.items.includes(4),
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateClassType : createClassType;
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
.input {
  width: 217px;
}
</style>