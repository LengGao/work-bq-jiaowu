<template>
  <!--添加编辑字段弹窗-->
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
      <el-form-item label="字段名称">
        <el-input
          :disabled="!!id"
          class="input"
          v-model="formData.field_text"
          placeholder="请输入字段名称"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="字段类型">
        <el-select
          :disabled="!!id"
          v-model="formData.field_type"
          placeholder="请选择字段类型"
          clearable
          filterable
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in fieldTypeOptions"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否必填" prop="required">
        <el-radio-group v-model="formData.required">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <template v-if="['select', 'multi_select'].includes(formData.field_type)">
        <el-form-item
          :label="`选项${index + 1}`"
          v-for="(item, index) in formData.options"
          :key="item.id"
          :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
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
      </template>
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
  modifyCustomfield,
  createCustomfield,
  getCustomfieldInfo,
} from "@/api/crm";
export default {
  name: "addField",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    outputType: {
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
        field_text: "",
        field_type: "",
        required: 0,
        options: [
          {
            label: "",
            id: 1,
          },
        ],
      },
      rules: {
        field_text: [{ required: true, message: "请输入", trigger: "blur" }],
        field_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      fieldTypeOptions: [
        {
          label: "文本",
          value: "text",
        },
        {
          label: "单选",
          value: "select",
        },
        {
          label: "多选",
          value: "multi_select",
        },
        {
          label: "日期",
          value: "date",
        },
      ],
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
      this.id && this.getCustomfieldInfo();
    },
    async getCustomfieldInfo() {
      const data = {
        field_id: this.id,
      };
      const res = await getCustomfieldInfo(data);
      if (res.code === 0) {
        for (const k in this.formData) {
          if (res.data[k]) {
            this.formData[k] = res.data[k];
          }
        }
        this.formData.options = res.data.field_content.map((item, index) => ({
          label: item,
          id: index,
        }));
      }
    },
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
      const { options, ...rest } = this.formData;
      const data = {
        output_type: this.outputType,
        ...rest,
        field_content: ["select", "multi_select"].includes(rest.field_type)
          ? options.map(({ label }) => label)
          : "",
      };
      if (this.id) {
        data.field_id = this.id;
      }
      const api = this.id ? modifyCustomfield : createCustomfield;
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
      this.formData.required = 0;
      this.formData.options = [
        {
          label: "",
          id: 1,
        },
      ];
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