<template>
  <el-dialog
    title="学籍异动"
    :visible="value"
    width="480px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="异动类型" prop="type">
        <el-radio-group
          v-model="formData.type"
          @change="formData.new_major_id = ''"
        >
          <el-radio label="1">休学</el-radio>
          <el-radio label="2">退学</el-radio>
          <el-radio label="3">复学</el-radio>
          <el-radio label="4">转专业</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="formData.type === '4'">
        <el-form-item label="当前专业">
          <el-input class="input" :value="data.major_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="新专业名称" prop="new_major_id">
          <el-select
            class="input"
            v-model="formData.new_major_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="申请原因" prop="apply_reason">
        <el-input
          class="input"
          type="textarea"
          placeholder="请输入申请原因"
          v-model="formData.apply_reason"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
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
import { getUniversityMajorDetailList, applyTransaction } from "@/api/sou";
export default {
  name: "UpdateOrderGrade",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      addLoading: false,
      majorOptions: [],
      formData: {
        type: "",
        new_major_id: "",
        apply_reason: "",
      },
      rules: {
        apply_reason: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        new_major_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    handleOpen() {
      this.majorOptions = [];
      this.getUniversityMajorDetailList();
    },
    // 获取届别选项
    async getUniversityMajorDetailList() {
      const data = {
        limit: 1000,
        page: 1,
        type_id: this.data.type_id,
        school_id: this.data.school_id,
        level_id: this.data.level_id,
      };
      const res = await getUniversityMajorDetailList(data);
      if (res.code === 0) {
        this.majorOptions = res.data.list.filter(
          (item) => item.major_id !== this.data.major_id
        );
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        project_edu_detail_id: this.data.id,
      };
      this.addLoading = true;
      const res = await applyTransaction(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeClose();
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
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
.input {
  width: 237px;
}
</style>
